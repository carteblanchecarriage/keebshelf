# Affiliate Links Report
**Date:** 2026-02-25 13:45 EST  
**Location:** /home/klondike/Desktop/keyboard-tracker/

---

## Executive Summary

| Metric | Count | Status |
|--------|-------|--------|
| Active Affiliate Links (tracked) | ~7,300 | ✅ Good |
| Untracked Vendor Links | 7 | ⚠️ Missing ref codes |
| Amazon Links (no tag) | 9 | ❌ No Associates ID |

---

## 1. Affiliate Links by Vendor

### Currently Integrated Vendors

| Vendor | Domain | Tracking Parameter | Status |
|--------|--------|-------------------|--------|
| Keychron | keychron.com | `?ref=keyboardtracker` | ✅ Active (~60+ links) |
| Epomaker | epomaker.com | `?ref=keyboardtracker` | ✅ Active |
| KBDfans | kbdfans.com | `?ref=keyboardtracker` | ✅ Active |
| NovelKeys | novelkeys.com | `?ref=keyboardtracker` | ✅ Active |
| Drop | drop.com | `?ref=keyboardtracker` | ✅ Active |

**Total Tracked Links:** ~7,304 found with `ref=keyboardtracker`

---

## 2. Missing Tracking Codes

### Vendor Links WITHOUT ref=keyboardtracker

These links are sending traffic without attribution:

| File | Line | URL | Issue |
|------|------|-----|-------|
| Best60PercentGuide.tsx | 45 | `https://keychron.com/products/keychron-q4-pro` | Missing ?ref=keyboardtracker |
| BestBudgetGuide.tsx | 14 | `https://keychron.com/products/keychron-v1` | Missing ?ref=keyboardtracker |
| BestBudgetGuide.tsx | 32 | `https://keychron.com/products/keychron-k8` | Missing ?ref=keyboardtracker |
| BestProgrammingGuide.tsx | 12 | `https://keychron.com/products/keychron-q1-pro` | Missing ?ref=keyboardtracker |
| BestProgrammingGuide.tsx | 28 | `https://keychron.com/products/keychron-k3-pro` | Missing ?ref=keyboardtracker |
| BestProgrammingGuide.tsx | 36 | `https://keychron.com/products/keychron-k8-pro` | Missing ?ref=keyboardtracker |
| Best75PercentGuide.tsx | 12 | `https://keychron.com/products/keychron-q1-pro` | Missing ?ref=keyboardtracker |

**Total:** 7 untracked Keychron links

---

## 3. Amazon Links without Associates Tag

**Critical:** 9 Amazon search links have NO affiliate tracking. These generate zero commission.

| File | Line | Product Search | Status |
|------|------|----------------|--------|
| Best60PercentGuide.tsx | 21 | akko 3068b plus | ❌ No tag |
| Best60PercentGuide.tsx | 29 | rk61 royal kludge | ❌ No tag |
| Best60PercentGuide.tsx | 37 | glorious gmmk compact | ❌ No tag |
| Best60PercentGuide.tsx | 53 | durgod hk venus | ❌ No tag |
| Best75PercentGuide.tsx | 20 | rk84 royal kludge | ❌ No tag |
| Best75PercentGuide.tsx | 44 | gmmk pro | ❌ No tag |
| BestBudgetGuide.tsx | 23 | royal kludge rk61 | ❌ No tag |
| BestBudgetGuide.tsx | 41 | glorious gmmk compact | ❌ No tag |
| BestProgrammingGuide.tsx | 20 | hhkb professional hybrid | ❌ No tag |

**Recommendation:** Sign up for Amazon Associates at https://affiliate-program.amazon.com/ and add `&tag=YOUR_TAG-20` to all URLs.

---

## 4. Other Vendors Without Affiliate Programs

These products are linked but have no affiliate relationship:

| Vendor | File | Product | Opportunity |
|--------|------|---------|-------------|
| AliExpress | Best75PercentGuide.tsx | Feker IK75 | Consider ShareASale or AliExpress portal |
| Nuphy | Best75PercentGuide.tsx | Halo75 | Contact for in-house program |
| ZSA (Moonlander) | BestProgrammingGuide.tsx | Moonlander | Has referral program - apply |

---

## 5. Link Opportunities

### High-Priority Vendor Applications (from AFFILIATE-VENDORS.md)

| Vendor | Commission | Action |
|--------|------------|--------|
| CannonKeys | 5-8% | ⏳ Application pending |
| Glorious | 5-10% | ⏳ Apply via Impact |
| The Key Company | 10% | ⏳ Contact for partnership |
| Prevail Key Co | ~5-10% | ⏳ Email info@prevailkeyco.com |
| DiviniKey | Unknown | ⏳ Contact via website |

### Product Categories Missing Coverage

- **Switches:** Gateron, Kailh, Cherry, Akko - No dedicated switch vendor affiliate
- **Keycaps:** Drop only - Missing CannonKeys, The Key Company
- **DIY Kits:** Boardsource, RNDKBD - Opportunity for hobbyist segment

---

## 6. Recommendations

### Immediate Actions (This Week)

1. **Fix 7 untracked Keychron links** - Add `?ref=keyboardtracker` to guide files
2. **Apply for Amazon Associates** - Critical revenue opportunity (9 links affected)
3. **Fix links:** Best60PercentGuide.tsx, BestBudgetGuide.tsx, BestProgrammingGuide.tsx, Best75PercentGuide.tsx

### Medium-Term (This Month)

1. Submit CannonKeys affiliate application
2. Contact Glorious via Impact platform
3. Reach out to Nuphy for partnership
4. Add ZSA Moonlander referral tracking

### Revenue Estimate

| Scenario | Monthly Estimate |
|----------|------------------|
| Current state | $50-150/month |
| After Amazon Associates fix | $100-300/month (+50-100%) |
| With 3 new vendors | $200-500/month |
| Full integration (8 vendors) | $500-1000/month |

---

## 7. Files Requiring Updates

```
src/pages/learn/Best60PercentGuide.tsx  (5 links to fix)
src/pages/learn/BestBudgetGuide.tsx     (3 links to fix)  
src/pages/learn/BestProgrammingGuide.tsx (3 links to fix)
src/pages/learn/Best75PercentGuide.tsx   (2 links to fix)
```

---

*Report generated by Switchyard Affiliate Links Check*  
*Next check: 2026-02-25 14:45*
