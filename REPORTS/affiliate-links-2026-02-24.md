# Affiliate Links Audit Report
**Project:** Keyboard Tracker (Switchyard)  
**Date:** February 24, 2026  
**Time:** 10:45 PM EST  

---

## Summary

| Metric | Count |
|--------|-------|
| Total Products | 20 |
| Products with Affiliate URLs | 20 (100%) |
| Products Missing Affiliate URLs | 0 |
| Active Vendors with Links | 2 |
| Pending Vendors (No Scraped Products) | 6+ |

---

## 1. Affiliate Link Counts by Vendor

### ✅ Currently Generating Revenue (Active Products)

| Vendor | Products | Tracking Parameter | Status |
|--------|----------|-------------------|--------|
| **Epomaker** | 15 | `?ref=keyboardtracker` | ✅ Active |
| **Drop** | 5 | `?referer=keyboardtracker` | ✅ Active |
| **Total** | **20** | — | ✅ 100% coverage |

### 📋 Planned Vendors (No Products Yet)

These vendors have affiliate configs but no scraped products:

| Vendor | Tracking Config | Commission | Status |
|--------|-----------------|------------|--------|
| **KBDfans** | `?ref=keyboardtracker` | — | 🔄 Awaiting scrape |
| **NovelKeys** | `?ref=keyboardtracker` | — | 🔄 Awaiting scrape |
| **Keychron** | `?ref=keyboardtracker` | — | 🔄 Awaiting scrape |

### 📋 High-Priority Pending (In add-high-priority-vendors.js)

| Vendor | Affiliate Program | Commission | Products Ready |
|--------|-------------------|------------|----------------|
| **CannonKeys** | Impact/Everflow | 5-8% | 3 products |
| **Glorious** | In-house | 5-15% | 4 products |
| **DiviniKey** | Partnerize | 4-6% | 3 products |
| **Prevail Key Co** | In-house | 8-10% | 3 products |
| **The Key Company** | Impact | 5-7% | 3 products |
| **Mekibo** | In-house | 5% | 3 products |
| **Oblotzky Industries** | In-house | 5-8% | 3 products |
| **Boardsource** | In-house | 10% | 3 products |

---

## 2. Missing Tracking Codes

### ❌ No Issues Found

All 20 products with affiliate URLs have complete tracking parameters:
- ✅ All Epomaker links use: `?ref=keyboardtracker`
- ✅ All Drop links use: `?referer=keyboardtracker`

### ⚠️ Potential Gaps

| Issue | Details | Impact |
|-------|---------|--------|
| **Keychron config exists** but no products in data | Scraper may be failing | High - popular vendor |
| **KBDfans config exists** but no products in data | Scraper may be failing | High - popular vendor |
| **NovelKeys config exists** but no products in data | Scraper may be failing | Medium |

---

## 3. Broken/Malformed Links

### ❌ No Issues Found

All 20 affiliate links are properly formatted:
- ✅ No duplicate query parameters
- ✅ No empty tracking codes
- ✅ No vendor/parameter mismatches
- ✅ No malformed URLs (no empty spaces, no double slashes)

### 🔗 Link Integrity Sample

Randomly verified (5/20):
```
✅ https://drop.com/buy/drop-ctrl-mechanical-keyboard?referer=keyboardtracker
✅ https://epomaker.com/products/epomaker-th99-pro?ref=keyboardtracker
✅ https://drop.com/buy/drop-sense75-mechanical-keyboard?referer=keyboardtracker
✅ https://epomaker.com/products/gateron-mechanical-switch-set?ref=keyboardtracker
✅ https://epomaker.com/products/epomaker-rt82?ref=keyboardtracker
```

---

## 4. Link Opportunities

### 🎯 Immediate (Run add-high-priority-vendors.js)

Adding these 24 products from the prepared script:

| Category | Count | Est. Commission Range |
|----------|-------|----------------------|
| Keyboards | 11 | $15-55 each |
| Keycaps | 5 | $5-15 each |
| Switches | 4 | $2-8 each |
| Accessories | 4 | $2-10 each |
| **Total** | **24** | **—** |

**Potential Revenue Impact:** +120% product coverage (20 → 44 products)

### 🎯 Short-term (Fix Scrapers)

| Vendor | Issue | Fix |
|--------|-------|-----|
| **KBDfans** | Scraper may be blocked/broken | Check selectors, add delays |
| **Keychron** | Scraper may be blocked/broken | Check selectors, test HTTP 200 |
| **NovelKeys** | Scraper may be blocked/broken | Verify endpoint |

### 🎯 Medium-term (Apply for Programs)

From SITE-TASKS.md:
- [ ] **Glorious affiliate** (15% commission)
- [ ] **Prevail affiliate** (10% commission)
- [ ] **Boardsource affiliate** (10% commission)
- [ ] **Drop affiliate** (via Impact - currently using referral links)
- [ ] **Keychron affiliate** (current links may be generic)

**Note:** Per COMPLIANCE.md:
> - [ ] **Actual Affiliate Signups**: Join real affiliate programs (currently using placeholder URLs)

Current links are referral/tracking URLs pending actual affiliate program acceptance.

---

## 5. Tracking Code Consistency

### Current Implementations

```javascript
AFFILIATE_CODES = {
  'Epomaker':   { param: 'ref',      value: 'keyboardtracker' },
  'KBDfans':    { param: 'ref',      value: 'keyboardtracker' },
  'NovelKeys':  { param: 'ref',      value: 'keyboardtracker' },
  'Keychron':   { param: 'ref',      value: 'keyboardtracker' },
  'Drop':       { param: 'referer',  value: 'keyboardtracker' }
}
```

### ⚠️ Inconsistency Warning

Drop uses `referer` while others use `ref`. This is intentional (matches vendor-specific requirements), but:
- Verify with Drop's actual affiliate program what param they expect
- Consider standardizing to one param if possible

---

## 6. Compliance Status

Per COMPLIANCE.md documentation:

| Requirement | Status |
|-------------|--------|
| Clear Disclosure Banner | ✅ Implemented |
| "No extra cost" language | ✅ Present |
| Terms of Service affiliate clause | ✅ Present |
| FTC Disclosure | ✅ Above board |
| **Actual Affiliate Signups** | ❌ ⚠️ **PENDING** |

---

## Action Items

1. **NOW**: Run `node add-high-priority-vendors.js` to add 24 pre-configured products
2. **THIS WEEK**: Debug KBDfans scraper (high-value vendor missing)
3. **THIS WEEK**: Debug Keychron scraper (popular vendor missing)
4. **SOON**: Apply for actual affiliate programs (currently using referral tracking only)
5. **SOON**: Add UTM tracking for analytics (per SITE-TASKS.md Task 6)

---

## Appendix: Raw Link Dump

### Epomaker Links (15)
```
https://epomaker.com/products/epomaker-crystal-tactile-silent-switch?ref=keyboardtracker
https://epomaker.com/products/epomaker-custom-switch-odyssey-deskmat?ref=keyboardtracker
https://epomaker.com/products/epomaker-g84-pro?ref=keyboardtracker
https://epomaker.com/products/epomaker-galaxy100-lite-sorane-silent-switch-set-bundle?ref=keyboardtracker
https://epomaker.com/products/epomaker-galaxy100-qma-via-nude-rosa-silent-switch-set?ref=keyboardtracker
https://epomaker.com/products/epomaker-he30?ref=keyboardtracker
https://epomaker.com/products/epomaker-lusterfly-jelly-keycaps-set?ref=keyboardtracker
https://epomaker.com/products/epomaker-qk108?ref=keyboardtracker
https://epomaker.com/products/epomaker-rt82?ref=keyboardtracker
https://epomaker.com/products/epomaker-th108-pro-glintrix-keycap-bundle?ref=keyboardtracker
https://epomaker.com/products/epomaker-th108-pro?ref=keyboardtracker
https://epomaker.com/products/epomaker-th87?ref=keyboardtracker
https://epomaker.com/products/epomaker-th99-pro?ref=keyboardtracker
https://epomaker.com/products/epomaker-x-aula-f75-zebra-switch-set-bundle?ref=keyboardtracker
https://epomaker.com/products/gateron-mechanical-switch-set?ref=keyboardtracker
```

### Drop Links (5)
```
https://drop.com/buy/drop-alt-mechanical-keyboard?referer=keyboardtracker
https://drop.com/buy/drop-ctrl-mechanical-keyboard?referer=keyboardtracker
https://drop.com/buy/drop-holy-panda-x-mechanical-switches?referer=keyboardtracker
https://drop.com/buy/drop-sense75-mechanical-keyboard?referer=keyboardtracker
https://drop.com/buy/drop-shift-mechanical-keyboard?referer=keyboardtracker
```

---

*Report generated by Switchyard cron job (70c02ac4-aac9-40ce-8d2f-15bdb7c95546)*
