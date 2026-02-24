#!/bin/bash
# Keyboard Affiliate Site - Cron Worker Script
# Complements GitHub Actions (scrapes every 2h) - this focuses on content & improvements

WORK_DIR="/home/klondike/Desktop/keyboard-tracker"
LOG_FILE="/home/klondike/.openclaw/workspace/logs/affiliate-cron.log"
STATE_FILE="/home/klondike/.openclaw/workspace/logs/affiliate-state.json"

mkdir -p "$(dirname $LOG_FILE)"
mkdir -p "$(dirname $STATE_FILE)"

cd "$WORK_DIR" || exit 1

# Read or init state
if [ -f "$STATE_FILE" ]; then
    CYCLE=$(jq -r '.cycle // 0' "$STATE_FILE")
    TOTAL_COMMITS=$(jq -r '.totalCommits // 0' "$STATE_FILE")
    CURRENT_CHUNK=$(jq -r '.currentChunk // 1' "$STATE_FILE")
    CHUNK_PROGRESS=$(jq -r '.chunkProgress // 0' "$STATE_FILE")
else
    CYCLE=0
    TOTAL_COMMITS=0
    CURRENT_CHUNK=1
    CHUNK_PROGRESS=0
fi

# Increment cycle
CYCLE=$((CYCLE + 1))
HOUR=$((CYCLE / 4))

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log "=== Cron Cycle $CYCLE (Hour $HOUR) | Chunk $CURRENT_CHUNK ==="

# Pull latest changes from GitHub Actions scraper
log "Pulling latest data from GitHub..."
cd "$WORK_DIR" && git pull --rebase >> "$LOG_FILE" 2>&1

# PHASE 1: Development Work (every 15 min)
case $((CYCLE % 4)) in
    1)
        TASK="SEO & Meta Tags"
        log "Task: $TASK"
        
        # Check pages missing SEO
        MISSING_SEO=$(find "$WORK_DIR/src/pages" -name "*.tsx" -exec grep -L "Helmet\|meta.*description" {} \; 2>/dev/null | wc -l)
        log "Found $MISSING_SEO pages without SEO meta tags"
        
        # Check for missing alt texts on images
        MISSING_ALT=$(grep -r "<img" "$WORK_DIR/src" --include="*.tsx" | grep -v "alt=" | wc -l)
        log "Found $MISSING_ALT images without alt text"
        
        # Check OpenGraph tags
        MISSING_OG=$(find "$WORK_DIR/src/pages" -name "*.tsx" -exec grep -L "og:title\|og:description" {} \; 2>/dev/null | wc -l)
        log "Found $MISSING_OG pages without OpenGraph tags"
        
        log "✓ SEO audit complete"
        ;;
    
    2)
        TASK="Content Quality"
        log "Task: $TASK"
        
        # Check guide completeness
        GUIDE_COUNT=$(find "$WORK_DIR/src/pages/learn" -name "*.tsx" | wc -l)
        log "Have $GUIDE_COUNT guide pages"
        
        # Check for placeholder text
        PLACEHOLDERS=$(grep -r "TODO\|FIXME\|placeholder\|coming soon" "$WORK_DIR/src/pages" --include="*.tsx" -i | wc -l)
        log "Found $PLACEHOLDERS placeholders remaining"
        
        # Check word counts in guides
        for guide in "$WORK_DIR/src/pages/learn"/*.tsx; do
            WORDS=$(wc -w < "$guide" 2>/dev/null || echo 0)
            if [ "$WORDS" -lt 200 ]; then
                log "  ⚠️ $(basename "$guide") only has $WORDS words"
            fi
        done
        
        log "✓ Content check complete"
        ;;
    
    3)
        TASK="Affiliate Links"
        log "Task: $TASK"
        
        # Count products with affiliate links
        if [ -f "$WORK_DIR/public/data.json" ]; then
            AFFILIATE_COUNT=$(grep -c "affiliateUrl" "$WORK_DIR/public/data.json" 2>/dev/null || echo 0)
            TOTAL_PRODUCTS=$(jq '.allProducts | length' "$WORK_DIR/public/data.json" 2>/dev/null || echo 0)
            log "✓ $AFFILIATE_COUNT/$TOTAL_PRODUCTS products have affiliate links"
            
            # Check for specific vendors
            for vendor in "Keychron" "Epomaker" "Drop" "Kono"; do
                COUNT=$(grep -c "$vendor" "$WORK_DIR/public/data.json" 2>/dev/null || echo 0)
                log "  $vendor: $COUNT products"
            done
        fi
        
        # Verify referral params are correct
        KEYCHRON_LINKS=$(grep "ref=switchyard" "$WORK_DIR/scraper"/*.js 2>/dev/null | wc -l)
        log "✓ Keychron links using ?ref=switchyard: $KEYCHRON_LINKS"
        
        EPOMAKER_LINKS=$(grep "sca_ref=10691179" "$WORK_DIR/scraper"/*.js 2>/dev/null | wc -l)
        log "✓ Epomaker links using affiliate ID: $EPOMAKER_LINKS"
        
        log "✓ Affiliate check complete"
        ;;
    
    0)
        # QC Hour - handled in Phase 2
        TASK="QC Hour"
        log "Task: $TASK"
        ;;
esac

# PHASE 2: Hourly QC and Push (every 4 cycles = 1 hour)
if [ $((CYCLE % 4)) -eq 0 ]; then
    log "=== QUALITY CONTROL HOUR $HOUR ==="
    
    # QC CHECK 1: Build verification
    log "QC: Running build test..."
    cd "$WORK_DIR"
    if npm run build >> "$LOG_FILE" 2>&1
    then
        log "✓ Build passes"
        BUILD_STATUS="PASS"
    else
        log "✗ Build FAILED - skipping push"
        BUILD_STATUS="FAIL"
    fi
    
    # QC CHECK 2: Lint check (if it exists)
    if [ -f "$WORK_DIR/package.json" ] && grep -q "lint" "$WORK_DIR/package.json"; then
        log "QC: Running linter..."
        npm run lint 2>&1 | tail -5 >> "$LOG_FILE" || true
    fi
    
    # QC CHECK 3: TypeScript compilation
    log "QC: Running TypeScript check..."
    npx tsc --noEmit 2>&1 | grep -c "error" | xargs -I {} log "  {} TypeScript errors found"
    
    # Check for uncommitted work
    UNCOMMITTED=$(git diff --cached --numstat 2>/dev/null | wc -l)
    UNTRACKED=$(git ls-files --others --exclude-standard 2>/dev/null | wc -l)
    log "QC: $UNCOMMITTED staged files, $UNTRACKED untracked files"
    
    # Stage any work
    if [ $UNCOMMITTED -gt 0 ] || [ $UNTRACKED -gt 0 ]; then
        log "Staging changes..."
        git add -A
        git commit -m "Auto-update: Cycle $CYCLE - $TASK improvements" --allow-empty || true
    fi
    
    # PUSH if build passes
    if [ "$BUILD_STATUS" = "PASS" ]; then
        log "=== PUSHING CHANGES ==="
        git pull --rebase
        if git push; then
            TOTAL_COMMITS=$((TOTAL_COMMITS + 1))
            CHUNK_PROGRESS=$((CHUNK_PROGRESS + 1))
            log "✓ Pushed! Total commits: $TOTAL_COMMITS, Chunk progress: $CHUNK_PROGRESS"
            
            # Advance chunk if enough progress
            if [ $CHUNK_PROGRESS -ge 5 ]; then
                CURRENT_CHUNK=$((CURRENT_CHUNK + 1))
                CHUNK_PROGRESS=0
                log "=== ADVANCING TO CHUNK $CURRENT_CHUNK ==="
                
                # Reset after all chunks
                if [ $CURRENT_CHUNK -gt 8 ]; then
                    CURRENT_CHUNK=1
                    log "=== ALL CHUNKS COMPLETE - RESTARTING ==="
                fi
            fi
        else
            log "✗ Push failed"
        fi
    fi
    
    # Reset cycle after QC (every 24 hours)
    if [ $CYCLE -ge 96 ]; then
        CYCLE=0
        log "=== Day complete - cycle reset ==="
    fi
fi

# Save state
jq -n \
    --arg cycle "$CYCLE" \
    --arg commits "$TOTAL_COMMITS" \
    --arg chunk "$CURRENT_CHUNK" \
    --arg progress "$CHUNK_PROGRESS" \
    '{cycle: ($cycle | tonumber), totalCommits: ($commits | tonumber), currentChunk: ($chunk | tonumber), chunkProgress: ($progress | tonumber)}' \
    > "$STATE_FILE"

log "Cycle $CYCLE complete. Next cycle: $((CYCLE + 1))"
log ""
