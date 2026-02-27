# Affiliate Links Audit Report

**Generated:** 2/26/2026, 8:45:00 PM EST  
**Source:** Guide files + data.json  
**Report ID:** cron-70c02ac4

---

## 📊 Summary

| Metric | Count | Status |
|--------|-------|--------|
| Total Products in Database | 3,546 | ✅ |
| Products with Affiliate Links | 3,546 | 100% Coverage |
| Legacy Tracking Codes (switchyard) | 3,046 | ⚠️ Needs Update |
| Amazon Links Without Tracking | 9 | 🔴 Missing Tag |
| Malformed Links | 0 | ✅ None |

---

## ✅ Vendor Breakdown (Database)

| Vendor | Products | Affiliate Links | Tracking Code | Coverage |
|--------|----------|-----------------|---------------|----------|
| ✅ Keychron | 1,513 | 1,513 | ref=switchyard (legacy) | 100% |
| ✅ KBDfans | 946 | 946 | ref=switchyard (legacy) | 100% |
| ✅ NovelKeys | 582 | 582 | ref=switchyard (legacy) | 100% |
| ✅ Epomaker | 468 | 468 | sca_ref=10691179.cOO0hJ6jvi | 100% |
| ✅ Qwerkywriter | 27 | 27 | sca_ref=10713146.AiDf5cQpby | 100% |
| ✅ Drop | 10 | 10 | referer=switchyard (legacy) | 100% |

**Total Legacy Links:** 3,046  
**Properly Tracked Links:** 495 (Epomaker + Qwerkywriter)

---

## 🔴 Critical Issues

### 1. Amazon Links Missing Affiliate Tags (9 links)

**Impact:** These links generate ZERO commission. Amazon Associates account required.

| File | Product | Current URL |
|------|---------|-------------|
| Best60PercentGuide.tsx | Akko 3068B Plus | `amazon.com/s?k=akko+3068b+plus` |
| Best60PercentGuide.tsx | RK61 Royal Kludge | `amazon.com/s?k=rk61+royal+kludge` |
| Best60PercentGuide.tsx | Glorious GMMK Compact | `amazon.com/s?k=glorious+gmmk+compact` |
| Best60PercentGuide.tsx | Durgod HK Venus | `amazon.com/s?k=durgod+hk+venus` |
| BestProgrammingGuide.tsx | HHKB Professional | `amazon.com/s?k=hhkb+professional+hybrid` |
| Best75PercentGuide.tsx | RK84 Royal Kludge | `amazon.com/s?k=rk84+royal+kludge` |
| Best75PercentGuide.tsx | GMMK Pro | `amazon.com/s?k=gmmk+pro` |
| BestBudgetGuide.tsx | RK61 (duplicate) | `amazon.com/s?k=royal+kludge+rk61` |
| BestBudgetGuide.tsx | GMMK Compact (duplicate) | `amazon.com/s?k=glorious+gmmk+compact` |

**Action Required:**
1. Sign up for Amazon Associates: https://affiliate-program.amazon.com/
2. Add `&tag=YOUR_TAG-20` to all Amazon URLs

---

## ⚠️ Legacy Tracking Codes (3,046 links)

**Issue:** Using `?ref=switchyard` or `?referer=switchyard` instead of `?ref=keyboardtracker`

### Guide Files Affected (10 links in .tsx files):

| File | Line | Current URL |
|------|------|-------------|
| Best60PercentGuide.tsx | 46 | `keychron.com/products/keychron-q4-pro?ref=switchyard` |
| BestProgrammingGuide.tsx | 14 | `keychron.com/products/keychron-q1-pro?ref=switchyard` |
| BestProgrammingGuide.tsx | 30 | `keychron.com/products/keychron-k3-pro?ref=switchyard` |
| BestProgrammingGuide.tsx | 46 | `keychron.com/products/keychron-k8-pro?ref=switchyard` |
| BestTKLGuide.tsx | 47 | `keychron.com/products/keychron-q3?ref=switchyard` |
| BestTKLGuide.tsx | 61 | `keychron.com/products/keychron-c3-pro?ref=switchyard` |
| BestTKLGuide.tsx | 75 | `keychron.com/products/keychron-q3-he?ref=switchyard` |
| Best75PercentGuide.tsx | 14 | `keychron.com/products/keychron-q1-pro?ref=switchyard` |
| BestBudgetGuide.tsx | 15 | `keychron.com/products/keychron-v1?ref=switchyard` |
| BestBudgetGuide.tsx | 33 | `keychron.com/products/keychron-k8?ref=switchyard` |

### Database Products (3,036 links):
- **Keychron:** 1,513 products with `?ref=switchyard`
- **KBDfans:** 946 products with `?ref=switchyard`
- **NovelKeys:** 582 products with `?ref=switchyard`
- **Drop:** 10 products with `?referer=switchyard`

**Fix:** Search/replace `switchyard` → `keyboardtracker` across database

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

1. **🔴 High Priority:** Apply to Amazon Associates and tag all 9 Amazon links
2. **🟡 Medium Priority:** Normalize all database links from `switchyard` → `keyboardtracker`
3. **🟡 Medium Priority:** Apply to Glorious affiliate program (affiliates.gloriousgaming.com)
4. **🟡 Medium Priority:** Apply to ZSA Moonlander referral program
5. **🟡 Medium Priority:** Apply to Drop affiliate program via Impact
6. **🟢 Low Priority:** Contact Royal Kludge, Akko, Durgod about partnership opportunities
7. **🟢 Low Priority:** Research additional vendor partners from AFFILIATE-VENDORS.md list
   - CannonKeys
   - DiviniKey
   - The Key Company
   - Boardsource

---

## 📝 Tracking Code Standards

**Current State:**
- ⚠️ Keychron: Uses `?ref=switchyard` (legacy - should migrate)
- ⚠️ KBDfans: Uses `?ref=switchyard` (legacy - should migrate)
- ⚠️ NovelKeys: Uses `?ref=switchyard` (legacy - should migrate)
- ⚠️ Drop: Uses `?referer=switchyard` (legacy - should migrate)
- ✅ Epomaker: Uses `sca_ref=10691179.cOO0hJ6jvi` (correct)
- 🔴 Amazon: No tracking (needs `&tag=ASSOCIATE_TAG-20`)
- ✅ Qwerkywriter: Uses `sca_ref=10713146.AiDf5cQpby` (correct)

**Target Standard:**
- Keychron: `?ref=keyboardtracker`
- KBDfans: `?ref=keyboardtracker`
- NovelKeys: `?ref=keyboardtracker`
- Drop: `?referer=keyboardtracker`
- Amazon: `&tag=keyboardtracker-20` (or actual Associates tag)

---

## ✅ Recommendations Summary

| Priority | Action | Impact | Effort |
|----------|--------|--------|--------|
| 🔴 High | Apply to Amazon Associates | Revenue boost | 30 min |
| 🔴 High | Add tags to 9 Amazon links | Revenue boost | 15 min |
| 🟡 Medium | Migrate 1,513 Keychron links from switchyard → keyboardtracker | Tracking consistency | 1 hour |
| 🟡 Medium | Migrate 946 KBDfans links from switchyard → keyboardtracker | Tracking consistency | 30 min |
| 🟡 Medium | Migrate 582 NovelKeys links from switchyard → keyboardtracker | Tracking consistency | 20 min |
| 🟡 Medium | Migrate 10 Drop links from switchyard → keyboardtracker | Tracking consistency | 5 min |
| 🟡 Medium | Apply to Glorious affiliate program | New revenue stream | 1 hour |
| 🟢 Low | Apply to ZSA referral program | New revenue stream | 30 min |
| 🟢 Low | Apply to Drop affiliate via Impact | New revenue stream | 1 hour |
| 🟢 Low | Research vendor partnerships (CannonKeys, DiviniKey, etc.) | Future growth | Ongoing |

---

## 📈 Revenue Estimate

Adding 8 new vendors at ~5% commission on $50-150 average order:
- Estimated 50-100 additional products with affiliate links
- At 100 visitors/month converting 2%: ~$50-100/month additional revenue
- Full integration could add $150-300/month total affiliate revenue

**Amazon Boost:** Tagging the 9 existing Amazon links could add $20-50/month immediately.

---

## 📊 Changes Since Last Report (7:45 PM)

- Status: **No changes detected**
- Amazon links still untagged
- Legacy tracking codes unchanged
- All vendor counts stable

---

*Report generated by Switchyard Affiliate Link Checker*  
*Next scan: 9:45 PM EST*
