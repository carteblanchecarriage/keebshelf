# Switchyard Content Quality Report
Generated: Friday, February 27, 2026 — 7:30 AM

## Executive Summary

| Metric | Status |
|--------|--------|
| Total Guides | 4 active guides |
| Avg Guide Length | 1,875 words |
| Blog Posts | 2 published |
| Products Tracked | 928 |
| Critical Issues | 7 |
| Content Gaps | 6 missing pages |

---

## 1. Guide Completeness (Word Counts)

### Current Guides
| Guide | Words | Status | Grade |
|-------|-------|--------|-------|
| `/guides/complete/` (Complete Guide) | 2,275 | ✅ Good | B+ |
| `/guides/programming/` (Programming) | 1,819 | ✅ Good | B |
| `/guides/lubing/` (How to Lube) | 1,719 | ✅ Good | B |
| `/guides/switches/` (Switch Buying) | 1,689 | ✅ Good | B |

### Assessment
- All guides meet minimum 1,500 word threshold for SEO
- Content is comprehensive and well-structured
- No thin content detected

---

## 2. Product Descriptions Quality

### Issues Found

**Critical:**
1. **Truncated descriptions** - All product descriptions are cut off from scraping (e.g., "Keychron K2 HE is a 75% layout... Now in a premium concrete body - a masterp...")
2. **HTML entities not decoded** - Descriptions contain `&amp;`, `&gt;`, `&lt;` instead of actual characters
3. **Scraping artifacts** - "Please drop your email in 'Notify Me When Available'..." shows up in many

**Examples:**
```json
"description": "The Fully Assembled version includes:\n\n\nThe keyboard PCB..." // Multi-line formatting issues
"description": "Keychron K2 HE is a 75% layout... Now in a premium concrete body - a masterp" // Truncated
```

### Recommendation
- Products need manual SEO descriptions (50-160 chars)
- Clean HTML entities
- Remove vendor promotional text from descriptions

---

## 3. Placeholder Text & Broken Elements

### Critical Issues

1. **guides/switches/index.html: Line ~340**
   ```html
   <button class="theme-toggle"> <!-- Missing attributes, broken script -->
       <span id="themeIcon"></span>  <!-- Empty, no icon -->
       <span id="themeText">Dark</span>
   </button>
   ```

2. **guides/lubing/index.html: Line ~285**
   ```html
   <div class="tool-icon">🧽</div>  <!-- OK -->
   <div class="tool-icon"></div>    <!-- EMPTY - Missing icon -->
   ```

3. **guides/programming/index.html: Line ~180**
   ```html
   <div class="feature-icon"></div> <!-- Empty emoji/ icon -->
   ```

4. **All guides have broken theme toggle JavaScript**
   - Variables `isDark`, `savedTheme`, `prefersDark` used but never declared
   - Theme switching will not work

### Missing Pages (Listed in sitemap.xml but don't exist)
- `/learn/beginners-guide` → Should redirect to `/beginner/`
- `/learn/layout-sizes` → Missing
- `/learn/glossary` → Should redirect to `/glossary/`
- `/learn/keycap-profiles` → Missing
- `/learn/artisan-guide` → Missing  
- `/learn/best-gaming` → Missing
- `/learn/best-60-percent` → Missing
- `/learn/best-75-percent` → Missing
- `/learn/best-tkl` → Missing

---

## 4. Content Gaps

### High Priority (Missing Guides)
| Topic | Search Volume | Priority |
|-------|---------------|----------|
| Gaming Keyboards Guide | High | P0 |
| Keycap Profile Comparison | Medium-High | P1 |
| Best 60% Keyboards | Medium | P1 |
| Best 75% Keyboards | Medium | P1 |
| Best TKL Keyboards | Medium | P1 |
| Artisan Keycap Guide | Medium | P2 |

### Medium Priority (Enhancements)
- Switch sound comparison (audio embeds)
- Interactive switch selector tool
- "Build your first keyboard" step-by-step guide
- Switch tester recommendations section

### Low Priority
- Historical Group Buy archive
- Community showcase/gallery

---

## 5. Cross-Sale Opportunities

### Current State
- Guides reference products via text links only
- No prominent product cards within guides
- Missing "Frequently bought together" sections
- No related guides sidebar

### Recommendations

1. **Add Product Cards in Guides**
   Add to `/guides/switches/index.html` after recommendations section:
   ```html
   <div class="product-cta">
     <h3>Ready to try these switches?</h3>
     <div class="product-grid">
       <!-- Featured products matching guide recommendations -->
     </div>
   </div>
   ```

2. **Link Related Guides**
   - Switch Guide → Lubing Guide
   - Programming Guide → Switch Guide
   - Complete Guide → All other guides

3. **Add "Complete Your Setup" Section**
   After keyboard recommendations, suggest:
   - Switch testers
   - Keycap sets
   - Accessories (cables, wrist rests)

4. **Blog Cross-Links**
   Both blog posts should cross-link to relevant guides

---

## 6. SEO & Metadata Quality

### Good
- ✅ All pages have unique titles
- ✅ Meta descriptions present
- ✅ Schema.org markup on complete guide
- ✅ Canonical URLs set
- ✅ Sitemap.xml comprehensive

### Needs Improvement
- ⚠️ Open Graph images missing (og-image.png referenced but may not exist)
- ⚠️ Twitter card image same issue
- ⚠️ Article schema missing on some guides
- ⚠️ Breadcrumbs not implemented sitewide

---

## 7. Action Items (Priority Order)

### P0 - Fix Immediately
1. [ ] Fix theme toggle JavaScript in all 4 guides (add missing `const` declarations)
2. [ ] Fill empty emoji icons in guides/lubing and guides/programming
3. [ ] Create missing gaming keyboard guide `/learn/best-gaming` or remove from sitemap
4 [ ] Fix broken theme toggle button in guides/switches

### P1 - This Week
5. [ ] Create redirects from `/learn/*` URLs to actual guide pages (SEO preservation)
6. [ ] Add manual SEO descriptions for top 50 products in data.json
7. [ ] Add "Related Products" cards to bottom of each guide
8. [ ] Create `/best/#gaming` section or dedicated gaming guide

### P2 - This Month
9. [ ] Build keycap profiles guide
10. [ ] Create size-specific guides (60%, 75%, TKL)
11. [ ] Add cross-links between all guides
12. [ ] Implement related guides sidebar

### P3 - Backlog
13. [ ] Add audio samples to switch guide
14. [ ] Build interactive switch selector
15. [ ] Create "build your first" tutorial

---

## Files Modified in This Report
None created yet - this is diagnostic only.
Recommended fixes should be implemented via `write()` tool per task instructions.

---

Report prepared by: Content Quality Bot
Next check scheduled: Hourly (:30)
