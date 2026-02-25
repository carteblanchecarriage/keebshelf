# Affiliate Links Audit Report
**Project:** Keyboard Tracker (Switchyard)  
**Date:** February 25, 2026  
**Time:** 4:45 AM EST  
**Cron ID:** 70c02ac4-aac9-40ce-8d2f-15bdb7c95546

---

## 1. Affiliate Link Counts by Vendor

### ✅ Active Products with Affiliate Tracking (data.json)

| Vendor | Products | Tracking Parameter | Commission | Status |
|--------|----------|-------------------|------------|--------|
| **Keychron** | 30 | `?ref=keyboardtracker` | 8% | ✅ Active |
| **Epomaker** | 30 | `?ref=keyboardtracker` | 6% | ✅ Active |
| **NovelKeys** | 30 | `?ref=keyboardtracker` | 10% | ✅ Active |
| **KBDfans** | 3 | `?ref=keyboardtracker` | 8% | ✅ Active |
| **Total** | **93** | — | — | ✅ 100% coverage |

### 📋 Pending Integration

| Source | Count | Status |
|--------|-------|--------|
| **add-high-priority-vendors.js** | 24 products from 8 vendors | ⏳ Script ready to run |
| **Guide page links** | 19 links across 5 guides | ⚠️ Missing tracking codes |

### Vendors Configured in Affiliate Script
- Drop (Impact, 5%) - Not yet in data.json
- Kono.store (10%) - No products yet

---

## 2. Missing Tracking Codes (Critical)

### ❌ Guide Pages Links WITHOUT Affiliate Tracking

**Summary: 19 links need tracking parameters added**

**By Vendor:**

| Vendor | Links | Issue |
|--------|-------|-------|
| **keychron.com** | 7 | Missing `?ref=keyboardtracker` |
| **amazon.com** | 7 | No Amazon Associates tag configured |
| **nuphy.com** | 1 | No affiliate program set up |
| **zsa.io** | 1 | No affiliate program set up |
| **aliexpress.com** | 1 | No affiliate program set up |

**Detailed Breakdown:**

**BestProgrammingGuide.tsx (5 links)**
- keychron.com/products/keychron-q1-pro → Missing `?ref=keyboardtracker`
- keychron.com/products/keychron-k3-pro → Missing `?ref=keyboardtracker`
- keychron.com/products/keychron-k8-pro → Missing `?ref=keyboardtracker`
- amazon.com/s?k=hhkb+professional+hybrid → Amazon tag needed
- zsa.io/moonlander → Affiliate program needed

**BestBudgetGuide.tsx (4 links)**
- keychron.com/products/keychron-v1 → Missing `?ref=keyboardtracker`
- keychron.com/products/keychron-k8 → Missing `?ref=keyboardtracker`
- amazon.com/s?k=royal+kludge+rk61 → Amazon tag needed
- amazon.com/s?k=glorious+gmmk+compact → Amazon tag needed

**Best60PercentGuide.tsx (5 links)**
- keychron.com/products/keychron-q4-pro → Missing `?ref=keyboardtracker`
- amazon.com/s?k=akko+3068b+plus → Amazon tag needed
- amazon.com/s?k=rk61+royal+kludge → Amazon tag needed
- amazon.com/s?k=glorious+gmmk+compact → Amazon tag needed
- amazon.com/s?k=durgod+hk+venus → Amazon tag needed

**Best75PercentGuide.tsx (4 links)**
- keychron.com/products/keychron-q1-pro → Missing `?ref=keyboardtracker` (duplicate)
- amazon.com/s?k=rk84+royal+kludge → Amazon tag needed
- aliexpress.com/wholesale?SearchText=feker+ik75 → Affiliate needed
- nuphy.com/products/halo75 → Affiliate needed
- amazon.com/s?k=gmmk+pro → Amazon tag needed

**BestTKLGuide.tsx (3 links)**
- keychron.com/products/keychron-q3 → Missing `?ref=keyboardtracker`
- keychron.com/products/keychron-c3-pro → Missing `?ref=keyboardtracker`
- keychron.com/products/keychron-q3-he → Missing `?ref=keyboardtracker`

---

## 3. Broken/Malformed Links

### ✅ No Issues Found

All 93 existing affiliate links in data.json are properly formatted:
- No duplicate query parameters
- No empty tracking codes
- No malformed URLs
- No vendor/parameter mismatches

---

## 4. Link Opportunities

### 🎯 Immediate Action Required

**1. Add tracking to guide page Keychron links (7 links)**
   - BestProgrammingGuide.tsx: 3 links
   - BestBudgetGuide.tsx: 2 links
   - Best60PercentGuide.tsx: 1 link
   - Best75PercentGuide.tsx: 1 link (note: duplicate product)
   - BestTKLGuide.tsx: 3 links

   **Action:** Append `?ref=keyboardtracker` to all keychron.com URLs

**2. Apply for Amazon Associates**
   - 7 Amazon links currently untracked
   - Products: HHKB, Royal Kludge boards, Akko, Glorious GMMK, Durgod
   - High-value products with good conversion potential

**3. Reach out to vendors for affiliate programs**
   - **NuPhy** (Halo75 in 75% guide) - Popular low-profile boards
   - **ZSA** (Moonlander) - High-value split ergonomic keyboards
   - **AliExpress** (Feker IK75) - Budget 75% boards
   - **Royal Kludge** - Multiple budget boards featured

### 🎯 High Impact Opportunity: Add 24 Products

**Run `node add-high-priority-vendors.js`** to add:

| Vendor | Products | Commission | Priority |
|--------|----------|------------|----------|
| CannonKeys | 3 | 5-8% | High |
| Glorious | 4 | 5-15% | High |
| DiviniKey | 3 | 4-6% | Medium |
| Prevail Key Co | 3 | 8-10% | Medium |
| The Key Company | 3 | 5-7% | Medium |
| Mekibo | 3 | 5% | Medium |
| Oblotzky Industries | 3 | 5-8% | Medium |
| Boardsource | 3 | 10% | Low (niche split boards) |

**Revenue Impact:**
- Current: 93 products
- After script: 117 products (+26%)
- Commission range: 4-15%
- Estimated monthly revenue increase: $75-150

---

## 5. Tracking Code Consistency

### Current Configurations (data.json)

```javascript
AFFILIATE_CODES = {
  'Keychron':   { param: 'ref', value: 'keyboardtracker' },
  'Epomaker':   { param: 'ref', value: 'keyboardtracker' },
  'KBDfans':    { param: 'ref', value: 'keyboardtracker' },
  'NovelKeys':  { param: 'ref', value: 'keyboardtracker' },
  'Drop':       { param: 'referer', value: 'keyboardtracker' }
}
```

### ⚠️ Inconsistency Found

Keychron links exist in multiple places:
- ✅ data.json: 30 products with `?ref=keyboardtracker`
- ❌ Guide pages: 7 links WITHOUT tracking parameter

**Fix needed:** Sync guide pages with data.json tracking standard.

---

## 6. Compliance Status

| Requirement | Status |
|-------------|--------|
| Clear Disclosure Banner | ✅ Implemented |
| "No extra cost" language | ✅ Present |
| Terms of Service affiliate clause | ✅ Present |
| FTC Disclosure | ✅ Above board |
| **Guide page affiliate disclosure** | ⚠️ **MISSING** |

**Action needed:** Add affiliate disclosure to guide pages explaining links may earn commission.

---

## Summary Statistics

| Metric | Count |
|--------|-------|
| Total products in data.json | 93 |
| Products with affiliate links | 93 |
| Guide page links | 19 |
| Guide links with tracking | 0 |
| Links missing tracking | 22 (including duplicates) |
| Ready to add (high-priority script) | 24 |
| Vendors configured | 6 |
| Potential vendors to add | 8+ |

---

## Action Items (Priority Order)

### 🔴 NOW (Critical)
1. Add `?ref=keyboardtracker` to 7 Keychron links in guide pages
2. Add affiliate disclosure text to all guide pages

### 🟡 THIS WEEK
3. Run `node add-high-priority-vendors.js` to add 24 products from 8 vendors
4. Apply for Amazon Associates program
5. Add Amazon tracking tags to guide pages

### 🟢 SOON
6. Contact NuPhy for affiliate partnership
7. Contact ZSA for affiliate partnership
8. Research AliExpress affiliate program options
9. Debug KBDfans scraper (only 3 products when ~80 expected)

---

*Report generated by Switchyard hourly cron - Affiliate Links check (:45)*
