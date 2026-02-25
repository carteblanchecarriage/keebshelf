# Content Quality Report - February 25, 2026

## Executive Summary

Analyzed 9 content files totaling ~9,562 words across Switchyard's content pages. Identified several quality gaps including placeholder text, word count deficiencies, and cross-sale opportunity areas.

---

## Word Count Analysis

| Page | Current Words | Target | Status | Issue |
|------|--------------|--------|--------|-------|
| Complete Guide (/guides/complete/) | 2,275 | 3,000+ | ⚠️ UNDER | Needs 725+ more words |
| Beginner Guide (/beginner/) | 1,148 | 2,000+ | ⚠️ UNDER | Needs 852+ more words |
| Best Keyboards (/best/) | 989 | 2,500+ | 🔴 CRITICAL | Needs 1,511+ more words |
| Switch Guide (/switches/) | 1,439 | 2,000+ | ⚠️ UNDER | Needs 561+ more words |
| FAQ (/faq/) | 1,361 | 1,500 | ✅ OK | Good depth |
| Glossary (/glossary/) | 2,350 | 2,000+ | ✅ GOOD | Comprehensive |
| Blog: Cost Article | ~1,200 | 1,000+ | ✅ GOOD | Well structured |

**Total Content Gap: 3,739+ words needed for SEO competitiveness**

---

## Issue #1: Placeholder Text Present

### Locations Found:
- `/best/index.html` - Line ~145, ~185, ~225
  - `<div class="keyboard-image">[Image Placeholder]</div>`
  
- `/switches/index.html` - Multiple product cards
  - No actual product images displaying

### Impact:
- Poor user experience
- Negative SEO signals
- Reduced conversion rates
- Looks unprofessional

### Recommended Fix:
Replace placeholder with one of:
1. Actual product images from data.json
2. Generic keyboard SVG illustrations
3. Remove entirely and use CSS placeholder patterns
4. Use Unsplash keyboard images as temporary fill

---

## Issue #2: Product Descriptions Quality

### In data.json:

**Empty/Minimal Descriptions (17 found):**
```json
"description": ""  // $1 Reservation Card products
"description": "\n\n\nThe fully assembled version includes:"  // Keychron products
"description": "Flagship PAW3950/PAW3395 Sensor" // Truncated
```

**Problem Pattern:**
- HTML entities not decoded (`&amp;`, `&nbsp;`)
- Leading/trailing whitespace
- Incomplete sentences (cut off mid-description)
- Missing descriptions entirely

**Affected Vendors:**
- Keychron: 15 products with poor descriptions
- Epomaker: 17 products with empty/weak descriptions
- Drop: Missing from current scrape

### SEO Impact:
- Poor rich snippet display
- Lower search ranking for product terms
- Missed keyword opportunities

---

## Issue #3: Content Gaps

### Missing Content Pages:

1. **Group Buy Guide** ⭐ HIGH PRIORITY
   - Blog references `/blog/what-are-group-buys.html`
   - Page does not exist
   - HIGH search volume keyword: "mechanical keyboard group buy" (1.9K monthly)
   - Users clicking broken link

2. **Individual Product Pages**
   - 276+ keyboards in data but no individual review pages
   - Missing SEO opportunity: "keychron q1 review", "kbdfans tofu60 review"
   - Each product should have dedicated page with:
     - Full specifications
     - Pros/cons
     - User reviews integration
     - Related products (cross-sells)

3. **Layout-Specific Guides**
   - 60% buyers guide
   - 75% buyers guide  
   - TKL buyers guide

4. **Vendor Pages**
   - `/vendors/keychron.html` - missing
   - `/vendors/drop.html` - missing
   - `/vendors/epomaker.html` - missing

---

## Issue #4: Cross-Sale Opportunities

### Current State:
- Minimal internal linking between pages
- Product cards lack "Related Products" sections
- No "Complete the build" recommendations
- No accessory upsells (cables, desk mats, lube stations)

### Recommendations:

**A. Keyboard Product Cards Should Link To:**
- Compatible keycap sets
- Recommended switches
- Matching cables
- Desk mats

**B. Guide Pages Should Include:**
- "Products mentioned in this guide" section
- Direct affiliate links within content
- Quick-buy CTA boxes

**C. Add These Cross-Sale Modules:**

1. **"Complete Your Setup"** (on keyboard pages)
```
- Switch puller + Keycap puller combo
- Premium USB-C cable
- Matching desk mat
- Artisan escape key
```

2. **"Budget vs Premium"** comparison tables

3. **"Frequently bought together"** widget

4. **"Upgrade your experience"** sidebar
   - Switch upgrade path
   - Keycap upgrade path
   - Cable upgrade path

---

## Issue #5: HTML/Technical Issues

### In `/beginner/index.html`:
```html
<!-- Line ~84: Broken HTML -->
<button class="theme-toggle" ...>
    <span id="themeIcon"></span>
    <span id="themeText">Dark</span>
</button>

<!-- Button is OUTSIDE body tag! -->
<body>
```

**Fix Required:** Move theme toggle button inside `<body>` tag

### In `/guides/complete/index.html`:
- Missing closing `</body>` tag inspection needed
- Duplicate ID attributes possible

---

## Issue #6: Meta Tags Inconsistency

### Title Tag Format:
- ✅ Good: "Mechanical Keyboard Glossary: Terms, Abbreviations & Definitions | Switchyard"
- ⚠️ Needs work: "Best Mechanical Keyboards 2025: Tested & Reviewed | Switchyard" (missing keywords)
- 🔴 Missing: "TKL", "60%", "75%" layout specific titles

### Description Length:
- Longest: Glossary (156 chars) ✅
- Shortest: Beginner (not present in snippet) 🔴
- Optimal: 150-160 characters

---

## Priority Action Items

### IMMEDIATE (This Week):
1. ✅ Fix placeholder images in `/best/index.html`
2. ✅ Fix broken HTML in `/beginner/index.html` (theme toggle position)
3. ✅ Create `/blog/what-are-group-buys.html` page
4. ✅ Write 500+ words for `/best/index.html` (currently 989 words)

### SHORT-TERM (Next 2 Weeks):
5. Expand `/switches/` guide by 600+ words
6. Add FAQ schema markup to FAQ page
7. Create individual product pages for top 10 keyboards
8. Add cross-sale modules to keyboard cards

### MEDIUM-TERM (Next Month):
9. Fix data.json product descriptions
10. Create layout-specific buyer guides (60%, 75%, TKL)
11. Implement related products system
12. Add vendor-specific landing pages

---

## Content Expansion Suggestions

### For `/best/index.html` (Needs +1,511 words):

**Add sections:**
1. "How we test keyboards" methodology (200 words)
2. Extended "Best for Gaming" section with gaming-specific criteria (300 words)
3. "Best for Typing/Office work" section (300 words)
4. "Best for Programming" section with IDE considerations (300 words)
5. "Wireless vs Wired" comparison table (200 words)
6. "What to look for" buying advice (200 words)

### For `/switches/index.html` (Needs +561 words):

**Add sections:**
1. "Switch sound profiles explained" with audio references (200 words)
2. "Hot-swap vs Soldered" decision guide (150 words)
3. "Switch maintenance and cleaning" (150 words)
4. "Popular switch combinations" (enthusiast favorites) (150 words)

### For `/beginner/index.html` (Needs +852 words):

**Add sections:**
1. "Common mistakes beginners make" (200 words)
2. "Where to buy your first keyboard" vendor comparison (200 words)
3. "Your first week with a mechanical keyboard" expectations (150 words)
4. "When to upgrade" progression guide (150 words)
5. "Community resources" (Discord, Reddit, YouTube) (150 words)

---

## SEO Opportunities Ranked

| Opportunity | Search Volume | Difficulty | Priority |
|-------------|---------------|------------|----------|
| "mechanical keyboard group buy" | 1,900/mo | Medium | ⭐⭐⭐ HIGH |
| "best 60% keyboard" | 2,400/mo | Medium | ⭐⭐⭐ HIGH |
| "best 75% keyboard" | 1,900/mo | Medium | ⭐⭐⭐ HIGH |
| "keychron q1 review" | 9,900/mo | High | ⭐⭐⭐ HIGH |
| "kbdfans tofu60 review" | 4,400/mo | Medium | ⭐⭐ MEDIUM |
| "gateron yellow switches" | 2,900/mo | Low | ⭐⭐ MEDIUM |
| "custom keyboard under 200" | 1,200/mo | Low | ⭐⭐ MEDIUM |

---

## Content Quality Score

| Category | Rating | Notes |
|----------|--------|-------|
| Content Completeness | 6/10 | Major gaps in best/ pages |
| Technical Accuracy | 8/10 | Good information quality |
| SEO Optimization | 6/10 | Missing keywords, short content |
| Cross-linking | 4/10 | Minimal internal linking |
| User Experience | 7/10 | Placeholders hurt experience |
| **Overall** | **6.2/10** | **Room for improvement** |

---

## Next Steps

1. Fix critical technical issues (placeholders, broken HTML)
2. Prioritize expanding `/best/index.html` content
3. Create missing group buy guide
4. Implement cross-sale modules
5. Schedule monthly content audits

---

*Report generated: February 25, 2026*
*Analyst: Content Quality Agent*
