# Affiliate Links Audit Report

**Generated:** 2/26/2026, 2:45:00 PM EST  
**Source:** data.json  
**Total Products:** 928

---

## 📊 Vendor Affiliate Link Counts

| Vendor | Products | With Affiliate | Coverage | Tracking Code | Status |
|--------|----------|----------------|----------|---------------|--------|
| Keychron | 405 | 405 | 100% | `ref=switchyard` | ⚠️ Legacy |
| KBDfans | 262 | 262 | 100% | `ref=switchyard` | ⚠️ Legacy |
| NovelKeys | 164 | 164 | 100% | `ref=switchyard` | ⚠️ Legacy |
| Epomaker | 88 | 88 | 100% | `sca_ref=` (Shopify) | ⚠️ Mixed |
| Qwerkywriter | 9 | 9 | 100% | `ref=switchyard` | ⚠️ Legacy |
| **TOTAL** | **928** | **928** | **100%** | - | - |

---

## ✅ Summary

| Metric | Count |
|--------|-------|
| Total Products | 928 |
| Products with Affiliate Links | 928 |
| Coverage | 100% |
| Missing Affiliate Links | 0 |
| Broken/Malformed Links | 0 |

---

## ⚠️ Tracking Code Issues

**CRITICAL: Inconsistent Tracking Codes Detected**

All 928 affiliate links in the database use legacy or mismatched tracking codes:

| Vendor | Current Code | Expected | Products Affected | Status |
|--------|--------------|----------|-------------------|--------|
| Keychron | `ref=switchyard` | `ref=keyboardtracker` | 405 | ❌ Mismatch |
| KBDfans | `ref=switchyard` | `ref=keyboardtracker` | 262 | ❌ Mismatch |
| NovelKeys | `ref=switchyard` | `ref=keyboardtracker` | 264 | ❌ Mismatch |
| Qwerkywriter | `ref=switchyard` | `ref=keyboardtracker` | 9 | ❌ Mismatch |
| Epomaker | `sca_ref=10691179...` | Native Shopify | 88 | ✅ Native |

**Impact:** Zero links currently tracked under the `keyboardtracker` code. Analytics will show minimal attribution.

---

## 🔗 Missing Vendor Opportunities

**Configured in AFFILIATE-VENDORS.md but no products in database:**

| Vendor | Priority | Commission | Products in data-backup | Status |
|--------|----------|------------|------------------------|--------|
| Drop | Active Partner | 5% | 5 products available | ⚠️ Not integrated in data.json |

**5 Drop products found in backup data:**
- Drop CTRL Mechanical Keyboard
- Drop ALT Mechanical Keyboard
- Drop Holy Panda X Mechanical Switches
- Drop SHIFT Mechanical Keyboard
- Drop SENSE75 Mechanical Keyboard

---

## 📝 Action Items

### HIGH PRIORITY (Fix immediately)

1. **Normalize All Tracking Codes**
   - Migrate Keychron: 405 products from `ref=switchyard` → `ref=keyboardtracker`
   - Migrate KBDfans: 262 products from `ref=switchyard` → `ref=keyboardtracker`
   - Migrate NovelKeys: 164 products from `ref=switchyard` → `ref=keyboardtracker`
   - Migrate Qwerkywriter: 9 products from `ref=switchyard` → `ref=keyboardtracker`
   - **Total links to update: 840**

2. **Fix Drop Integration**
   - 5 Drop products exist in backup data with `?referer=keyboardtracker`
   - These products are not appearing in current data.json
   - Check scraper status for drop.com

### MEDIUM PRIORITY (Complete soon)

3. **Apply to Missing Affiliate Programs**
   - CannonKeys (support@cannonkeys.com) - 5-8% commission
   - Glorious (https://gloriousgaming.com/pages/affiliates) - 5-10% commission
   - The Key Company - 10% commission

4. **Contact EU Vendors** (for international traffic)
   - CandyKeys (EU-focused)
   - ProtoTypist (UK)
   - MyKeyboard.eu

### LOW PRIORITY (Nice to have)

5. **Niche Vendor Expansion**
   - RNDKBD (lubricants/tools)
   - Prevail Key Co (stabilizers)
   - Boardsource (DIY kits)

---

## 💰 Revenue Potential

| Scenario | Additional Products | Est. Monthly Revenue |
|----------|---------------------|----------------------|
| Current (5 vendors) | 928 | Baseline |
| Add Drop products | +5 | Minimal impact |
| Add 8 new vendors | +50-100 | +$50-100/month |
| Full integration | +100-150 | +$150-300/month |

**Commission Rates by Vendor:**
- Epomaker: 6%
- Keychron: 8%
- KBDfans: 8%
- NovelKeys: 10%
- Drop: 5%
- CannonKeys: 5-8% (estimated)
- Glorious: 5-10%
- The Key Company: 10%

---

## 🔍 Code-Level Findings

### ProductModal.tsx
- Line 75: Uses `product.affiliateUrl || product.url` (fallback to regular URL)
- Properly includes `rel="noopener noreferrer"` for security
- Uses `target="_blank"` for external navigation

### Guide Pages (src/pages/learn/)
Multiple guide pages have hardcoded affiliate links with `ref=switchyard`:
- Best60PercentGuide.tsx: 5 links
- BestProgrammingGuide.tsx: 4 links
- Best75PercentGuide.tsx: 4 links
- BestBudgetGuide.tsx: 4 links
- BestTKLGuide.tsx: 2 links

**Total hardcoded guide links: ~19 (all using `ref=switchyard`)**

---

## ✅ Recent Report Comparison

| Report Time | Total Products | Affiliate Coverage | Missing |
|-------------|----------------|-------------------|---------|
| 1:45 PM | 912 | 100% | 0 |
| **2:45 PM** | **928** | **100%** | **0** |

**Change:** +16 products added since last check

---
*Report ID: cron-70c02ac4*  
*Next Check: 2/26/2026, 3:45 PM EST*
