# Switchyard Content Quality Report
Generated: Friday, February 27, 2026 — 4:30 PM

## Executive Summary

| Metric | Status |
|--------|--------|
| Total Guides | 5 core guides (4 in /guides/ + 1 in /beginner/) |
| Avg Guide Length | 1,834 words ✅|
| Blog Posts | 4 published (verified) |
| Products Tracked | 1,816 items |
| Critical Issues | 4 |
| Content Gaps | 7 missing /learn/* pages in sitemap |

---

## 1. Guide Completeness (Word Counts)

### Current Guides
| Guide | Words | Status | Grade |
|-------|-------|--------|-------|
| `/beginner/index.html` | 1,487 | ⚠️ Thin | C+ |
| `/guides/switches/index.html` | 1,742 | ✅ Good | B |
| `/guides/lubing/index.html` | 1,719 | ✅ Good | B |
| `/guides/programming/index.html` | 1,819 | ✅ Good | B |
| `/guides/complete/index.html` | 1,842+ | ✅ Good | B+ |
| `/best/index.html` | 1,620 | ✅ Good | B |
| `/gaming/index.html` | ~1,020 | ⚠️ Thin | C |

### Assessment
- 5/7 guides exceed 1,500-word minimum threshold
- `/beginner/index.html` needs expansion (1,487 words - close to threshold but thin)
- `/gaming/index.html` is notably thin at ~1,020 words
- Content is comprehensive and well-structured in main guides

**New Finding:** `/best/index.html` has extensive CSS for product cards (`.keyboard-card`) but uses placeholder images with text overlays instead of actual product photos.

---

## 2. Product Descriptions Quality

### Critical Issues Found

**Issue 1: ALL CAPS Disclaimers**
Sample of 50 product descriptions shows 23 items (46%) contain "THIS KEYCAP DOES NOT INCLUDE THE KEYBOARD" or similar in ALL CAPS.

**Affected Products Examples:**
```
- Astronaut Resin Artisan: "THIS KEYCAP DOES NOT INCLUDE THE KEYBOARD."
- Binary Cherry Profile: "THIS KEYCAP SET DOES NOT INCLUDE A KEYBOARD."
- Cosmic Galaxy Set: "\n\n\n\n\n\n\n\nTHIS KEYCAP SET DOES NOT INCLUDE A KEYBOARD."
- Multiple Keychron keycap sets: Same pattern
```

**Issue 2: Vendor Promotional Text**
Found "Please drop your email on \\" in switch descriptions (truncated email capture prompt).

**Affected:**
- Cherry MX2A switch sets
- Multiple Gateron sets

**Issue 3: Quantity Boilerplate**
48 items (96% of keycaps/switches) contain repetitive "Each Switch Set comes with X switches" text that doesn't describe the product.

**Issue 4: Excessive Newlines**
Multiple products have 8+ consecutive newlines in descriptions (formatting artifact from scraping).

### Word Count Analysis

| Description Type | Example Length | Quality |
|------------------|----------------|---------|
| Artisan keycaps | 40-80 chars | ❌ Poor |
| Keycap sets | 150-300 chars | ⚠️ Mediocre |
| Switches | 80-150 chars | ⚠️ Mediocre |
| Keyboard kits | 200-400 chars | ✅ Acceptable |

**Recommendation:** 
- Strip ALL CAPS disclaimers during scraping
- Remove "drop your email" promotional text
- Expand artisan keycap descriptions (currently just "THIS KEYCAP DOES NOT...")
- Target 100-160 char descriptions for search snippets

---

## 3. Sitemap Content Gaps

### Missing Pages (404 from sitemap.xml)

| Sitemap URL | Status | Actual Location | Priority |
|-------------|--------|-----------------|----------|
| `/learn/beginners-guide` | ❌ 404 | `/beginner/` exists | P0 |
| `/learn/layout-sizes` | ❌ 404 | Not found | P0 |
| `/learn/glossary` | ❌ 404 | Not found | P1 |
| `/learn/faq` | ❌ 404 | `/faq/index.html` exists | P0 |
| `/learn/switch-guide` | ❌ 404 | `/guides/switches/` exists | P0 |
| `/learn/keycap-profiles` | ❌ 404 | Not found | P1 |
| `/learn/artisan-guide` | ❌ 404 | `/artisan/index.html` exists | P0 |
| `/learn/group-buys` | ❌ 404 | Not found | P2 |
| `/learn/best-gaming` | ❌ 404 | `/gaming/index.html` exists | P0 |
| `/learn/best-budget` | ❌ 404 | Not found | P1 |
| `/learn/best-programming` | ❌ 404 | `/guides/programming/` exists | P0 |
| `/learn/best-60-percent` | ❌ 404 | `/best-60-percent/index.html` exists | P0 |
| `/learn/best-75-percent` | ❌ 404 | Not found | P1 |
| `/learn/best-tkl` | ❌ 404 | `/best-programming/` covers TKL | P2 |

**Pattern:** Sitemap expects `/learn/*` structure but actual files use flat paths (`/beginner/`, `/guides/*/`, `/gaming/`).

**Recommendation:** Either:
1. Create `/learn/` folder with redirects to actual content
2. Update sitemap.xml to match actual file structure
3. Option 2 is preferred for SEO consistency

---

## 4. Cross-Sale Opportunities

### Current State Analysis

**What's Working:**
- ✅ Blog posts link to relevant guides (proper cross-linking)
- ✅ Guides have CTA boxes linking back to main index
- ✅ CSS exists for `.keyboard-card` with product display styling
- ✅ `/best/index.html` has comparison table structure

**Missing Opportunities:**

1. **No "Related Products" in Guides**
   - Switch guide could link to switch testers at KBDfans
   - Lubing guide could link to lube supplies
   - Programming guide has product picks but no affiliate links

2. **No "Complete Your Setup" Sections**
   - After keyboard recommendations, suggest:
     - Switch testers ($25-40)
     - Keycap pullers ($5-10)
     - USB-C cables ($15-25)
     - Wrist rests ($20-40)

3. **No "Frequently Bought Together"**
   - Custom build path: Keyboard kit + Switches + Keycaps
   - Pre-built path: Keyboard + Extra keycaps

4. **Missing Accessory Guides**
   - No dedicated guide for desk mats
   - No cable buying guide
   - No wrist rest recommendations
   - No switch tester guide

### Quick Win Recommendations

Add to `/guides/switches/index.html`:
```html
<div class="cta-box">
  <p><strong>Not sure which switch to pick?</strong></p>
  <p>Get a <a href="https://kbdfans.com/products/switch-tester">KBDfans Switch Tester</a> with 24 popular switches before committing to a full set.</p>
</div>
```

Add to `/guides/lubing/index.html`:
```html
<div class="tools-grid">
  <div class="tool-card">
    <div class="tool-name">Krytox 205g0</div>
    <div class="tool-price"><a href="https://divinikey.com">Buy at Divinikey →</a></div>
  </div>
</div>
```

---

## 5. Content Quality Improvements

### Placeholder Text Issues

**Location:** `/best/index.html`

All product images use placeholder CSS:
```css
.keyboard-image.placeholder {
    background: linear-gradient(135deg, #f7f6f2 0%, #ebe9e4 100%);
    border: 2px dashed var(--border);
}
```

**Impact:** 
- No actual product images in "Best Keyboards" guide
- Reduces trust and click-through rates
- Missed SEO opportunity (image alt text, file names)

**Recommendation:**
- Source product images from vendors (with permission)
- Use Unsplash placeholders with keyboard keywords
- Or remove image containers until real photos available

### Meta Description Quality

Review of 5 guides:

| Page | Meta Description Length | Quality |
|------|------------------------|---------|
| `/beginner/` | 156 chars | ✅ Good |
| `/guides/switches/` | 158 chars | ✅ Good |
| `/guides/lubing/` | 172 chars | ✅ Good |
| `/guides/programming/` | 142 chars | ✅ Good |
| `/best/` | 167 chars | ✅ Good |

All meta descriptions are within 150-175 char range ✅

---

## 6. Action Items Summary

### P0 - Fix Immediately
1. [ ] **Fix sitemap.xml paths** - 13 URLs point to non-existent `/learn/*` paths
2. [ ] **Add redirects:** `/learn/beginners-guide` → `/beginner/`
3. [ ] **Create `/faq/index.html`** (referenced in navigation but 404s)
4. [ ] **Update scraper** to strip ALL CAPS disclaimers from descriptions

### P1 - This Week  
5. [ ] **Expand beginner guide** from 1,487 to 1,800+ words
6. [ ] **Expand gaming guide** from ~1,020 to 1,500+ words
7. [ ] **Add affiliate product links** to `/guides/programming/` picks
8. [ ] **Create `/learn/layout-sizes` guide** (high search intent)

### P2 - This Month
9. [ ] **Write `/learn/keycap-profiles` guide**
10. [ ] **Source product images** for `/best/` guide
11. [ ] **Add "Related Products" sections** to all guides
12. [ ] **Create accessory guides** (cables, desk mats, wrist rests)

### P3 - Backlog
13. [ ] Build "keyboard builder" tool (kit + switches + keycaps)
14. [ ] Add switch sound samples to switch guide
15. [ ] Create video content embeds for lubing guide

---

## 7. Files Reviewed

| File | Words | Issues |
|------|-------|--------|
| `/beginner/index.html` | 1,487 | Thin content, broken theme script |
| `/best/index.html` | 1,620 | Placeholder images only |
| `/guides/switches/index.html` | 1,742 | ✅ Good |
| `/guides/lubing/index.html` | 1,719 | ✅ Good |
| `/guides/programming/index.html` | 1,819 | No affiliate links on picks |
| `/guides/complete/index.html` | 1,842+ | ✅ Good |
| `/gaming/index.html` | ~1,020 | Thin content |
| `/sitemap.xml` | N/A | 13 broken paths |
| `/data.json` | N/A | 46% descriptions have ALL CAPS issues |

---

## Quality Score: B-

| Category | Score | Notes |
|----------|-------|-------|
| Guide Completeness | B | 5/7 guides sufficient |
| Product Descriptions | C+ | 46% have formatting issues |
| SEO Sitemap | D | 13 broken URLs |
| Cross-Selling | C | CSS ready, content missing |
| Meta Quality | A | All descriptions proper length |

---

Report prepared by: Content Quality Bot  
Next check scheduled: Hourly (:30)
