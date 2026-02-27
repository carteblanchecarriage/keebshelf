# Affiliate Links Audit Report

**Generated:** 2/27/2026, 6:45:00 AM EST  
**Source:** Manual scan of guide files + data.json  
**Report ID:** cron-70c02ac4

---

## 📊 Vendor Breakdown

| Vendor | Products | Affiliate Links | Coverage | Status |
|--------|----------|-----------------|----------|--------|
| Keychron | 405 | 405 | 100% | ✅ Good (legacy tracking) |
| KBDfans | 262 | 262 | 100% | ✅ Good (legacy tracking) |
| NovelKeys | 164 | 164 | 100% | ✅ Good (legacy tracking) |
| Epomaker | 88 | 88 | 100% | ✅ Good (correct tracking) |
| Qwerkywriter | 9 | 9 | 100% | ✅ Good |

**Total Vendor Products:** 928  
**Total with Affiliate Links:** 928  
**Coverage:** 100%

---

## 🔴 CRITICAL: Amazon Links Missing Affiliate Tags

**9 Amazon links have ZERO tracking - generating NO commission:**

| Guide File | Product | Amazon URL |
|------------|---------|------------|
| Best60PercentGuide.tsx | Akko 3068B Plus | `amazon.com/s?k=akko+3068b+plus` |
| Best60PercentGuide.tsx | RK61 Royal Kludge | `amazon.com/s?k=rk61+royal+kludge` |
| Best60PercentGuide.tsx | Glorious GMMK Compact | `amazon.com/s?k=glorious+gmmk+compact` |
| Best60PercentGuide.tsx | Durgod HK Venus | `amazon.com/s?k=durgod+hk+venus` |
| BestProgrammingGuide.tsx | HHKB Professional Hybrid | `amazon.com/s?k=hhkb+professional+hybrid` |
| Best75PercentGuide.tsx | RK84 Royal Kludge | `amazon.com/s?k=rk84+royal+kludge` |
| Best75PercentGuide.tsx | GMMK Pro | `amazon.com/s?k=gmmk+pro` |
| BestBudgetGuide.tsx | RK61 (duplicate) | `amazon.com/s?k=royal+kludge+rk61` |
| BestBudgetGuide.tsx | GMMK Compact (duplicate) | `amazon.com/s?k=glorious+gmmk+compact` |

**Impact:** These 9 links drive traffic to Amazon without generating commission.  
**Estimated Lost Revenue:** $50-150/month (based on typical conversion rates)

---

## ⚠️ Tracking Code Inconsistencies

**Found mixed tracking codes across vendors:**

```
Keychron:   ref=switchyard (405 links) → Should be ref=keyboardtracker
KBDfans:    ref=switchyard (262 links) → Should be ref=keyboardtracker
NovelKeys:  ref=switchyard (164 links) → Should be ref=keyboardtracker
Epomaker:   ref=keyboardtracker (88 links) ✅ Correct
```

**Note:** `switchyard` is the legacy tracking code. While it still works, `keyboardtracker` is the current standard.

---

## 🔗 Link Opportunities

**Guide files with Amazon-only products (potential vendor partnerships):**

1. **NuPhy Halo75** (Best75PercentGuide.tsx)
   - Currently: `nuphy.com/products/halo75`
   - Status: No affiliate tracking
   - Opportunity: Apply for NuPhy affiliate program

2. **ZSA Moonlander** (BestProgrammingGuide.tsx)
   - Currently: `zsa.io/moonlander`
   - Status: No affiliate tracking
   - Opportunity: ZSA has referral program

3. **Feker IK75** (Best75PercentGuide.tsx)
   - Currently: `aliexpress.com/wholesale?SearchText=feker+ik75`
   - Status: Generic search link
   - Opportunity: Affiliate available via AliExpress Portals

---

## ✅ Healthy Links Summary

| Vendor | Sample URL Pattern | Status |
|--------|-------------------|--------|
| Keychron | `keychron.com/products/...?ref=switchyard` | Working (legacy) |
| Epomaker | `epomaker.com/products/...?ref=keyboardtracker` | Working ✅ |
| KBDfans | `kbdfans.com/products/...?ref=switchyard` | Working (legacy) |
| NovelKeys | `novelkeys.com/products/...?ref=switchyard` | Working (legacy) |

---

## 📝 Recommended Actions

### 🔴 HIGH PRIORITY
1. **Sign up for Amazon Associates** (https://affiliate-program.amazon.com/)
   - Add `&tag=YOUR_TAG-20` to all 9 Amazon URLs
   - Estimated setup time: 30 minutes
   - Potential revenue: $50-150/month

### 🟡 MEDIUM PRIORITY
2. **Normalize tracking codes**
   - Update all `ref=switchyard` to `ref=keyboardtracker`
   - Files affected: All guide files with Keychron links
   - Estimated time: 15 minutes

3. **Apply for NuPhy affiliate program**
   - Product: NuPhy Halo75 in Best75PercentGuide.tsx
   - URL: Contact NuPhy directly for affiliate partnership

### 🟢 LOW PRIORITY
4. **Consolidate duplicate Amazon links**
   - RK61 appears in both Best60PercentGuide.tsx and BestBudgetGuide.tsx
   - GMMK Compact appears in both Best60PercentGuide.tsx and BestBudgetGuide.tsx
   - Consider deduplication or standardizing to single reference

---

## Summary Metrics

| Metric | Count |
|--------|-------|
| Total Products with Affiliate Links | 928 |
| Links with Correct Tracking | 88 (Epomaker only) |
| Links with Legacy Tracking | 840 |
| Links with Missing Tracking | 9 (Amazon) |
| Estimated Monthly Lost Revenue | $50-150 |

---

*Next audit scheduled: 2/27/2026, 7:45 AM EST*
