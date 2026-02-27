# Affiliate Links Audit Report

**Generated:** 2/26/2026, 6:45:00 PM EST  
**Source:** Guide files + data.json  
**Report ID:** cron-70c02ac4

---

## 📊 Summary

| Metric | Count | Status |
|--------|-------|--------|
| Total Products in Database | 928 | ✅ |
| Products with Affiliate Links | 928 | 100% Coverage |
| Legacy Tracking Codes (ref=switchyard) | 8 | ⚠️ Needs Update |
| Amazon Links Without Tracking | 9 | 🔴 Missing Tag |
| Untracked Vendor Links | 3 | 🔴 No Program |

---

## 🔴 Critical Issues

### Amazon Links Missing Affiliate Tags (9 links)

**Impact:** These links generate ZERO commission. Amazon Associates account required.

| File | Product | Current URL | Fix Needed |
|------|---------|-------------|------------|
| Best60PercentGuide.tsx | Akko 3068B Plus | `amazon.com/s?k=akko+3068b+plus` | Add `&tag=YOUR_TAG-20` |
| Best60PercentGuide.tsx | RK61 Royal Kludge | `amazon.com/s?k=rk61+royal+kludge` | Add `&tag=YOUR_TAG-20` |
| Best60PercentGuide.tsx | Glorious GMMK Compact | `amazon.com/s?k=glorious+gmmk+compact` | Add `&tag=YOUR_TAG-20` |
| Best60PercentGuide.tsx | Durgod HK Venus | `amazon.com/s?k=durgod+hk+venus` | Add `&tag=YOUR_TAG-20` |
| BestProgrammingGuide.tsx | HHKB Professional | `amazon.com/s?k=hhkb+professional+hybrid` | Add `&tag=YOUR_TAG-20` |
| Best75PercentGuide.tsx | RK84 Royal Kludge | `amazon.com/s?k=rk84+royal+kludge` | Add `&tag=YOUR_TAG-20` |
| Best75PercentGuide.tsx | GMMK Pro | `amazon.com/s?k=gmmk+pro` | Add `&tag=YOUR_TAG-20` |
| BestBudgetGuide.tsx | RK61 (again) | `amazon.com/s?k=royal+kludge+rk61` | Add `&tag=YOUR_TAG-20` |
| BestBudgetGuide.tsx | GMMK Compact (again) | `amazon.com/s?k=glorious+gmmk+compact` | Add `&tag=YOUR_TAG-20` |

**Action Required:**
1. Sign up for Amazon Associates: https://affiliate-program.amazon.com/
2. Add `&tag=YOUR_TAG-20` to all Amazon URLs

---

## ⚠️ Legacy Tracking Codes (8 links)

**Issue:** Using `ref=switchyard` instead of `ref=keyboardtracker`

| File | Line | Current URL |
|------|------|-------------|
| Best60PercentGuide.tsx | badge card | `keychron.com/products/keychron-q4-pro?ref=switchyard` |
| BestProgrammingGuide.tsx | badge card | `keychron.com/products/keychron-q1-pro?ref=switchyard` |
| BestProgrammingGuide.tsx | badge card | `keychron.com/products/keychron-k3-pro?ref=switchyard` |
| BestProgrammingGuide.tsx | badge card | `keychron.com/products/keychron-k8-pro?ref=switchyard` |
| BestTKLGuide.tsx | pick-link | `keychron.com/products/keychron-q3?ref=switchyard` |
| BestTKLGuide.tsx | pick-link | `keychron.com/products/keychron-c3-pro?ref=switchyard` |
| BestTKLGuide.tsx | pick-link | `keychron.com/products/keychron-q3-he?ref=switchyard` |
| Best75PercentGuide.tsx | badge card | `keychron.com/products/keychron-q1-pro?ref=switchyard` |
| BestBudgetGuide.tsx | badge card | `keychron.com/products/keychron-v1?ref=switchyard` |
| BestBudgetGuide.tsx | badge card | `keychron.com/products/keychron-k8?ref=switchyard` |

**Fix:** Replace `ref=switchyard` with `ref=keyboardtracker`

---

## 📈 Vendor Breakdown (Database)

| Vendor | Products | Affiliate Links | Tracking Code | Coverage |
|--------|----------|-----------------|---------------|----------|
| ✅ Keychron | 405 | 405 | ref=keyboardtracker/switchyard | 100% |
| ✅ KBDfans | 262 | 262 | ref=switchyard (legacy) | 100% |
| ✅ NovelKeys | 164 | 164 | ref=switchyard (legacy) | 100% |
| ✅ Epomaker | 88 | 88 | ref=keyboardtracker | 100% |
| ✅ Qwerkywriter | 9 | 9 | Built-in | 100% |

---

## 🔗 Link Opportunities

### Vendors in Guide Files Without Affiliate Programs:

| Vendor | Guide Files | Products Mentioned | Affiliate Status |
|--------|-------------|-------------------|------------------|
| **Amazon** | All guides | 9 products | ❌ Not signed up |
| **Royal Kludge (RK)** | Best60, Best75, BestBudget | RK61, RK84 | ❌ No program found |
| **Akko** | Best60 | 3068B Plus | ❌ No US affiliate found |
| **Durgod** | Best60 | HK Venus | ❌ No program found |
| **HHKB (Fujitsu)** | BestProgramming | Professional Hybrid | ❌ No program found |
| **Glorious** | Best60, BestBudget | GMMK Compact/Pro | ✅ Has program - apply! |
| **ZSA** | BestProgramming | Moonlander | ✅ Has referral - apply! |

### Recommended Actions:

1. **High Priority:** Apply to Amazon Associates and tag all 9 Amazon links
2. **Medium Priority:** Normalize all Keychron links to `ref=keyboardtracker`
3. **Medium Priority:** Apply to Glorious affiliate program (affiliates.gloriousgaming.com)
4. **Medium Priority:** Apply to ZSA Moonlander referral program
5. **Low Priority:** Contact Royal Kludge, Akko, Durgod about partnership opportunities

---

## 📝 Tracking Code Standards

**Current State:**
- ✅ Keychron: Uses `ref=keyboardtracker` (correct) or `ref=switchyard` (legacy)
- ✅ Epomaker: Uses `ref=keyboardtracker` (correct)
- ⚠️ KBDfans: Uses `ref=switchyard` (legacy - should migrate)
- ⚠️ NovelKeys: Uses `ref=switchyard` (legacy - should migrate)
- 🔴 Amazon: No tracking (needs `&tag=ASSOCIATE_TAG-20`)

---

## ✅ Recommendations Summary

| Priority | Action | Impact | Effort |
|----------|--------|--------|--------|
| 🔴 High | Add Amazon Associates tags to 9 links | Revenue boost | 30 min |
| 🟡 Medium | Fix 8 Keychron legacy ref codes | Tracking consistency | 15 min |
| 🟡 Medium | Apply to Glorious affiliate program | New revenue stream | 1 hour |
| 🟢 Low | Normalize KBDfans/NovelKeys refs | Consistency | 30 min |
| 🟢 Low | Research vendor partnerships | Future growth | Ongoing |

---

*Report generated by Switchyard Affiliate Link Checker*  
*Next scan: 7:45 PM EST*
