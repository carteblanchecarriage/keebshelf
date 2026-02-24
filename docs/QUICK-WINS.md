# Switchyard Quick Wins

*Generated from Content Quality Analysis (Feb 24, 2026)*

## This Week (Before Launch)

### 1. Product Detail Enhancement ⏰ 6 hrs
**Problem:**
- Product descriptions truncated at ~200 characters
- Missing key specs: layout, switch type, hot-swap, connectivity, case material

**Action:**
- Update scraper to capture full product descriptions
- Extract structured specs from vendor product pages
- Add fields: layout, switches, hotSwap, connectivity, material, weight

```javascript
// Add to scraper output
{
  "id": "...",
  "name": "...",
  "description": "...",
  "specs": {
    "layout": "75%",
    "switches": "Gateron Brown",
    "hotSwap": true,
    "connectivity": "USB-C",
    "material": "Aluminum",
    "weight": "1.2kg"
  }
}
```

### 2. Link Guides to Products ⏰ 1 hr
**Problem:**
- Lubing guide doesn't link to switch purchases
- Build guide doesn't link to cases/PCBs
- Guides are content islands

**Action:**
- Add "Related Products" section to each guide
- Link lubing tutorial → in-stock switches
- Link build guide → cases, PCBs, controllers
- Link switch guide → specific switch products

### 3. Expand "Best Of" Page ⏰ 4 hrs
**Problem:**
- Only 989 words (target: 2,000+)
- Only ~20 products listed
- Lacks detailed reviews

**Action:**
- Add 3-5 more keyboard picks per category
- Write 100-150 words per product (pros/cons)
- Add "who this is for" context
- Include price tier breakouts

### 4. Standardize Brand Name ⏰ 30 min
**Problem:**
- Mixed "Keebshelf" and "Switchyard" usage
- Inconsistent branding

**Action:**
- ✅ Replace all "Keebshelf" with "Switchyard" (COMMITTED)
- Update repo name (when ready): github.com/carteblanchecarriage/switchyard
- Update README.md title and description

### 5. Product Image Placeholders ⏰ 2 hrs
**Problem:**
- "[Image Placeholder]" text visible in public/index.html
- Missing keyboard images

**Action:**
- Replace placeholder text with actual product images
- Use vendor product images (with attribution)
- Implement lazy loading for performance

---

## Post-Launch (Next 2 Weeks)

### 6. Email Alert System ⏰ 8 hrs
**Problem:**
- "Email alerts coming soon" placeholder
- No backend for wishlist/price tracking
- Blocker for user engagement

**Action:**
- Set up email service (SendGrid/Resend)
- Create price tracking database
- Build alert trigger system
- Simple signup form with email capture

### 7. Bundle Recommendations ⏰ 3 hrs
**Problem:**
- No "Complete your build" suggestions
- Single-product focus

**Action:**
- Add "Often bought together" section
- Suggest bundles: keyboard + switches + keycaps
- Show savings when buying bundle

### 8. Price History Charts ⏰ 6 hrs
**Problem:**
- No historical price data visible
- Hard to know if current price is good

**Action:**
- Track prices over time in database
- Add sparkline charts to product cards
- Show "lowest price in 30 days" badge

### 9. Cross-Category Navigation ⏰ 2 hrs
**Problem:**
- Guides don't link to each other
- No breadcrumb navigation

**Action:**
- Add "Related Guides" links
- Implement breadcrumb navigation
- Link category chips to filtered views

---

## Technical Debt

### 10. Scraper Enhancement ⏰ 4 hrs
**Current:**
- Basic data extraction
- Descriptions truncated

**Target:**
- Full spec extraction
- Image scraping
- Variant tracking (colorways, layouts)

### 11. SEO Meta Updates ⏰ 2 hrs
**Problem:**
- Generic meta descriptions
- Missing OpenGraph images

**Action:**
- Update title templates
- Add unique meta descriptions per page
- Create OG image generator

---

## Success Metrics

- [ ] Product specs: 80%+ have full details
- [ ] Best Of page: 2,000+ words
- [ ] Email alerts: System operational
- [ ] User signups: 100+ in first week
- [ ] Cross-linking: All guides linked to products

---

## Notes

**Priority Order:**
1. Brand standardization ✅ DONE
2. Product specs (high conversion impact)
3. Best Of expansion (SEO boost)
4. Email alerts (MVP blocker)
5. Bundle recommendations (revenue lift)

**Estimated Total Effort:** ~34 hours
**Split:** 17 hrs pre-launch, 17 hrs post-launch
