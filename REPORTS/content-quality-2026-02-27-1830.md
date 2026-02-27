# Switchyard Content Quality Report
Generated: Friday, February 27, 2026 — 6:30 PM

## Executive Summary

| Metric | Status |
|--------|--------|
| Total Guides | 7 (5 in /guides/ + beginner + gaming + best) |
| Thin Content Guides | 3 (1,138-1,078 words) |
| Product Descriptions Analyzed | 1,813 items |
| Description Issues Found | 3 types (see below) |
| Broken Sitemap Links | 13 URLs |
| Missing `/learn/` Directory | 14 paths in sitemap don't exist |

---

## 1. Guide Completeness (Word Counts)

### Current Guide Word Counts

| Guide | Words | Status | Grade |
|-------|-------|--------|-------|
| `/beginner/index.html` | 1,138 | ⚠️ Thin (1,500 min) | C |
| `/guides/switches/index.html` | 1,742 | ✅ Good | B |
| `/guides/lubing/index.html` | 1,719 | ✅ Good | B |
| `/guides/programming/index.html` | 1,819 | ✅ Good | B |
| `/guides/complete/index.html` | 2,275 | ✅ Good | B+ |
| `/best/index.html` | 1,078 | ⚠️ Thin (1,500 min) | C |
| `/gaming/index.html` | 1,020 | ⚠️ Thin (1,500 min) | C |

### Assessment
- Only 4/7 guides exceed the 1,500-word minimum threshold
- `/beginner/index.html` is especially problematic (1,138 words) - missing ~362 words
- `/best/index.html` is thin at 1,078 words and uses CSS placeholder images
- `/gaming/index.html` is the thinnest at 1,020 words

### Gaming Guide Specific Issue
Found malformed HTML in `/gaming/index.html`:
```html
>li>Bluetooth + 2.4GHz</li>  <!-- Broken tag: should be <li> -->
```

---

## 2. Product Description Quality Analysis

### Critical Issues Found (from 1,813 products sampled)

**Issue 1: ALL CAPS Disclaimers**
- **Prevalence:** Found in keycap products (Keychron keycap sets, artisan keycaps)
- **Pattern:** "THIS KEYCAP SET DOES NOT INCLUDE A KEYBOARD" or "THIS KEYCAP DOES NOT INCLUDE THE KEYBOARD"
- **Impact:** Looks unprofessional, affects readability

**Examples:**
- **Astronaut Resin Artisan:** "THIS KEYCAP DOES NOT INCLUDE THE KEYBOARD."
- **Keychron Binary Cherry Profile:** "THIS KEYCAP SET DOES NOT INCLUDE A KEYBOARD..."
- **Arsenal Nuclear Power:** "THIS KEYCAP SET DOES NOT INCLUDE A KEYBOARD..."

**Issue 2: "Drop Your Email" Promotional Text**
- **Prevalence:** Found in switch descriptions
- **Pattern:** "Please drop your email on \"..."
- **Affected:** Cherry MX Switch Set, Cherry MX2A Switch Set

**Issue 3: Boilerplate Text**
- **Pattern:** "Each Switch Set comes with X switches" repeats across products
- **Doesn't describe the switch itself**

**Issue 4: Excessive Newlines**
- Multiple products have 5+ consecutive newlines in descriptions
- Formatting artifact from scraping

---

## 3. Content Gaps: Sitemap vs Reality

### Critical Issue: `/learn/` Directory Does NOT Exist

The sitemap.xml references 13 `/learn/*` paths, but **NONE EXIST**:

| Sitemap URL | Actual Location | Status |
|-------------|-----------------|--------|
| `/learn/beginners-guide` | `/beginner/` | ❌ 404 |
| `/learn/layout-sizes` | DOES NOT EXIST | ❌ 404 |
| `/learn/glossary` | `/glossary/` | ❌ 404 |
| `/learn/faq` | `/faq/` | ❌ 404 |
| `/learn/switch-guide` | `/guides/switches/` | ❌ 404 |
| `/learn/keycap-profiles` | DOES NOT EXIST | ❌ 404 |
| `/learn/artisan-guide` | `/artisan/` | ❌ 404 |
| `/learn/group-buys` | DOES NOT EXIST | ❌ 404 |
| `/learn/best-budget` | `/best-budget/` or `/best/` | ❌ 404 |
| `/learn/best-gaming` | `/gaming/` | ❌ 404 |
| `/learn/best-programming` | `/guides/programming/` | ❌ 404 |
| `/learn/best-60-percent` | `/best-60-percent/` | ❌ 404 |
| `/learn/best-75-percent` | DOES NOT EXIST | ❌ 404 |
| `/learn/best-tkl` | DOES NOT EXIST | ❌ 404 |

**Root Cause:** Sitemap expects `/learn/` structure but actual files use flat paths (`/beginner/`, `/guides/*/`, `/gaming/`). 

**Recommendation:** Either:
1. Create `/learn/` folder with redirects or symlinks to actual content
2. Update sitemap.xml to match actual file structure
3. **Preferred:** Option 2 (update sitemap) for SEO consistency

---

## 4. Cross-Sale Opportunities Analysis

### Missing High-Value Opportunities

**1. "Related Products" Sections**
- `/guides/switches/` should link to switch testers
- `/guides/lubing/` should link to lube supplies
- `/guides/programming/` needs affiliate links on product picks

**2. "Complete Your Setup" Missing**
- No desk mat recommendations
- No cable buying guide
- No wrist rest guide
- No switch tester guide

**3. "Frequently Bought Together"**
- Custom build path (kit + switches + keycaps) not visualized
- Pre-built path recommendations missing

### Existing Assets Ready to Use
- `/best/index.html` has `.keyboard-card` CSS styling
- Comparison table structure exists
- CTA boxes exist but need affiliate links

---

## 5. Placeholder Text Issues

### `/best/index.html` Placeholder Images
All product images use CSS placeholders:
```css
.keyboard-image.placeholder {
    background: linear-gradient(135deg, #f7f6f2 0%, #ebe9e4 100%);
    border: 2px dashed var(--border);
}
```
**Impact:** No actual product images reduce trust and CTR

---

## 6. Action Items

### P0 - Critical (This Week)
1. **Fix sitemap.xml** - 13 URLs point to non-existent `/learn/*` paths
2. **Fix HTML typo** in `/gaming/index.html` line with `>li>Bluetooth`
3. **Update scraper** to strip ALL CAPS disclaimers from descriptions
4. **Remove** "drop your email" promotional text from switch descriptions

### P1 - High Priority (This Week)
5. **Expand beginner guide** from 1,138 → 1,500+ words
6. **Expand gaming guide** from 1,020 → 1,500+ words
7. **Expand best guide** from 1,078 → 1,500+ words
8. **Add affiliate links** to `/guides/programming/` product picks

### P2 - Medium Priority (This Month)
9. **Create missing `/learn/` structure** or update sitemap
10. **Source product images** for `/best/` guide
11. **Add "Related Products"** sections to all guides
12. **Write `/learn/layout-sizes` guide** (high search intent)
13. **Write `/learn/keycap-profiles` guide**
14. **Create accessory guides** (cables, desk mats, wrist rests)

### P3 - Backlog
15. Build keyboard builder tool
16. Add switch sound samples
17. Create video content embeds

---

## Quality Score: C+

| Category | Score | Notes |
|----------|-------|-------|
| Guide Completeness | C | 4/7 guides sufficient |
| Product Descriptions | C | ALL CAPS and boilerplate issues |
| SEO Sitemap | D | 13 broken URLs to /learn/* |
| Cross-Selling | C | CSS ready, content missing |
| HTML Quality | C+ | Minor typo in gaming guide |

**Most Critical:** 
- Sitemap has 13 404s
- 3 guides need expansion
- Product descriptions have quality issues

---

Report prepared by: Content Quality Bot  
Next check scheduled: Hourly (:30)
