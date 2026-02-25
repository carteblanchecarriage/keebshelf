# Affiliate Links Audit Report
**Project:** Keyboard Tracker (Switchyard)  
**Date:** February 25, 2026  
**Time:** 12:45 PM EST  
**Cron ID:** 70c02ac4-aac9-40ce-8d2f-15bdb7c95546

---

## 1. Affiliate Link Counts by Vendor

### ✅ Active Products with Affiliate Tracking (data.json)

| Vendor | Products | Tracking Parameter | Commission | Status |
|--------|----------|-------------------|------------|--------|
| **Keychron** | 959 | `?ref=keyboardtracker` | ~5-8% | ✅ Active |
| **KBDfans** | 604 | `?ref=keyboardtracker` | ~5% | ✅ Active |
| **NovelKeys** | 373 | `?ref=keyboardtracker` | ~5% | ✅ Active |
| **Epomaker** | 278 | `?ref=keyboardtracker` | ~5% | ✅ Active |
| **Drop** | 5 | `?referer=keyboardtracker` | 5% | ✅ Active |
| **Total** | **2,219** | — | — | ✅ Full coverage |

### 📊 Growth Since Last Check (9:45 AM)
- No change in product counts
- All 5 vendors remain active with proper tracking codes
- 100% of affiliate URLs include tracking parameters

---

## 2. Missing Tracking Codes

### ❌ Guide Pages Links WITHOUT Affiliate Tracking

**Summary: 20 external links need tracking parameters added**

| Vendor | Links | Location | Issue |
|--------|-------|----------|-------|
| **amazon.com** | 9 | 5 guide files | ❌ No Amazon Associates tag |
| **keychron.com** | 10 | 5 guide files | ❌ Missing `?ref=keyboardtracker` |
| **aliexpress.com** | 1 | Best75PercentGuide.tsx | ❌ No affiliate program |
| **nuphy.com** | 1 | Best75PercentGuide.tsx | ❌ No affiliate program |
| **zsa.io** | 1 | BestProgrammingGuide.tsx | ❌ No affiliate program |

**Detailed Breakdown:**

| Guide File | Keychron Links | Amazon Links | Other | Total Missing |
|------------|----------------|--------------|-------|---------------|
| Best60PercentGuide.tsx | 1 | 4 | 0 | 5 |
| Best75PercentGuide.tsx | 1 | 2 | 2 (AliExpress, NuPhy) | 5 |
| BestBudgetGuide.tsx | 2 | 2 | 0 | 4 |
| BestProgrammingGuide.tsx | 4 | 1 | 1 (ZSA) | 6 |
| BestTKLGuide.tsx | 3 | 0 | 0 | 3 |
| **TOTAL** | **11** | **9** | **3** | **23** |

---

## 3. Broken/Malformed Links

### ✅ No Issues Found

Current guide links appear properly formatted:
- All URLs use HTTPS
- No duplicate query parameters
- No empty href attributes
- Link syntax is valid

---

## 4. Link Opportunities

### 🎯 Immediate Action Required

**1. Add Keychron tracking to 10 guide links**
   - Append `?ref=keyboardtracker` to all keychron.com URLs in guide pages
   - Affected files: All 5 Best*Guide.tsx files
   - Potential revenue impact: ~5% commission on sales

**2. Apply for Amazon Associates** (HIGH PRIORITY)
   - 9 Amazon links currently untracked
   - Products: HHKB, Royal Kludge RK61/RK84, Glorious GMMK, Akko 3068B, Durgod HK Venus, GMMK Pro
   - Commission: 1-3% on electronics
   - Signup: https://affiliate-program.amazon.com/

**3. Research vendor affiliate programs**
   - **NuPhy** (Halo75 featured) - Low-profile keyboards, growing brand
   - **ZSA** (Moonlander) - High-value split keyboards ($365)
   - **AliExpress** (Feker IK75) - Budget options, requires AliPort
   - **Royal Kludge** - Direct manufacturer program
   - **Glorious** - Already researched, need to apply
   - **Akko** - Chinese brand, check for US affiliate
   - **Durgod** - Check for in-house program

### 🎯 Additional Opportunities

**High-Value Targets:**
| Vendor | Product Examples | Est. Commission | Priority |
|--------|-----------------|-----------------|----------|
| NuPhy | Halo75 ($130) | ~5% = $6.50/sale | High |
| ZSA | Moonlander ($365) | Unknown | High |
| Amazon | Multiple products | 1-3% | Critical |
| Royal Kludge | RK61 ($59), RK84 ($65) | Unknown | Medium |

---

## 5. Tracking Code Consistency

### Current Configurations

| Vendor | Parameter | Value | Consistency |
|--------|-----------|-------|-------------|
| Keychron (data.json) | `ref` | `keyboardtracker` | ✅ Consistent |
| Keychron (guides) | — | None | ❌ Missing |
| KBDfans | `ref` | `keyboardtracker` | ✅ Consistent |
| NovelKeys | `ref` | `keyboardtracker` | ✅ Consistent |
| Epomaker | `ref` | `keyboardtracker` | ✅ Consistent |
| Drop | `referer` | `keyboardtracker` | ✅ Consistent |

### ✅ All data.json Products Have Tracking

Sample URLs verified:
- `keychron.com/...?ref=keyboardtracker` ✅
- `epomaker.com/...?ref=keyboardtracker` ✅
- `novelkeys.com/...?ref=keyboardtracker` ✅
- `kbdfans.com/...?ref=keyboardtracker` ✅
- `drop.com/...?referer=keyboardtracker` ✅

---

## 6. Compliance Status

| Requirement | Status |
|-------------|--------|
| FTC Disclosure | ❌ Missing from guide pages |
| Link transparency | ⚠️ No disclosure that links may earn commission |
| Privacy Policy | ❌ Not checked |

**Action needed:** Add affiliate disclosure to all guide pages.

**Recommended disclosure placement:**
- Top of each guide page: "This page contains affiliate links. We may earn a commission at no extra cost to you."
- Footer disclosure linking to full affiliate policy

---

## Summary Statistics

| Metric | Count |
|--------|-------|
| Products in data.json | 2,219 |
| Products with affiliate links | 2,219 (100%) |
| Products with tracking | 2,219 (100%) |
| Guide page external links | 23 |
| Guide links with tracking | 0 |
| Links missing tracking | 20 (Keychron + Amazon) |
| Links to non-affiliated vendors | 3 (AliExpress, NuPhy, ZSA) |
| Vendors configured | 5 (Keychron, KBDfans, NovelKeys, Epomaker, Drop) |

---

## Action Items (Priority Order)

### 🔴 NOW (Critical)
1. **Add `?ref=keyboardtracker` to 10 Keychron links in guide pages**
   - Files: Best60PercentGuide.tsx, Best75PercentGuide.tsx, BestBudgetGuide.tsx, BestProgrammingGuide.tsx, BestTKLGuide.tsx

2. **Apply for Amazon Associates program**
   - Target: 9 products across guides
   - Commission: 1-3% on electronics

### 🟡 THIS WEEK
3. Add affiliate disclosure to guide pages
4. Research NuPhy affiliate program
5. Research ZSA affiliate/referral options
6. Check Royal Kludge direct partnership

### 🟢 SOON
7. Review AliExpress AliPort program requirements
8. Check Glorious affiliate application status
9. Audit remaining guide pages (Switches, etc.)

---

## Data Integrity Status

✅ **EXCELLENT** - All 2,219 products in data.json have proper affiliate tracking

All vendors (Keychron, KBDfans, NovelKeys, Epomaker, Drop) are configured with tracking codes.

**Remaining work:** Update guide pages to match data.json standards.

---

*Report generated by Switchyard hourly cron - Affiliate Links check (:45)*
*Next check: 1:45 PM EST*
