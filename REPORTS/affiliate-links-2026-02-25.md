# Affiliate Links Audit Report
**Project:** Keyboard Tracker (Switchyard)  
**Date:** February 25, 2026  
**Time:** 3:45 AM EST  
**Cron ID:** 70c02ac4-aac9-40ce-8d2f-15bdb7c95546

---

## 1. Affiliate Link Counts by Vendor

### ✅ Currently Integrated (Active Products)

| Vendor | Products | Tracking Parameter | Commission | Status |
|--------|----------|-------------------|------------|--------|
| **Epomaker** | 15 | `?ref=keyboardtracker` | 6% | ✅ Active |
| **Drop** | 5 | `?referer=keyboardtracker` | 5% | ✅ Active |
| **Total** | **20** | — | — | ✅ 100% coverage |

### 📋 Products with Configured Links (Not Yet Scraped)

| Vendor | Expected Products | Tracking Config | Status |
|--------|-------------------|-----------------|--------|
| **KBDfans** | ~80 | `?ref=keyboardtracker` | 🔄 Awaiting scrape |
| **Keychron** | ~149 | `?ref=keyboardtracker` | 🔄 Awaiting scrape |
| **NovelKeys** | ~45 | `?ref=keyboardtracker` | 🔄 Awaiting scrape |

### 📋 High-Priority Pending (24 products ready in add-high-priority-vendors.js)

| Vendor | Count | Commission | Categories |
|--------|-------|------------|------------|
| **CannonKeys** | 3 | 5-8% | Keyboards, Keycaps |
| **Glorious** | 4 | 5-15% | Keyboards, Switches |
| **DiviniKey** | 3 | 4-6% | Keyboards, Keycaps, Switches |
| **Prevail Key Co** | 3 | 8-10% | Accessories |
| **The Key Company** | 3 | 5-7% | Keyboards, Keycaps, Switches |
| **Mekibo** | 3 | 5% | Keyboards, Accessories |
| **Oblotzky Industries** | 3 | 5-8% | Keycaps, Switches |
| **Boardsource** | 3 | 10% | Keyboards |
| **Total Ready** | **24** | 5-15% avg | Mixed |

---

## 2. Missing Tracking Codes (Critical)

### ❌ Guide Pages Links WITHOUT Affiliate Tracking

**BestProgrammingGuide.tsx (5 links)**
| Product | Current URL | Missing Param |
|---------|-------------|---------------|
| Keychron Q1 Pro | keychron.com/products/keychron-q1-pro | `?ref=keyboardtracker` |
| HHKB Professional Hybrid | amazon.com/s?k=hhkb | Amazon tag needed |
| Keychron K3 Pro | keychron.com/products/keychron-k3-pro | `?ref=keyboardtracker` |
| Moonlander Mark I | zsa.io/moonlander | Tag needed |
| Keychron K8 Pro | keychron.com/products/keychron-k8-pro | `?ref=keyboardtracker` |

**BestBudgetGuide.tsx (4 links)**
| Product | Current URL | Missing Param |
|---------|-------------|---------------|
| Keychron V1 | keychron.com/products/keychron-v1 | `?ref=keyboardtracker` |
| Royal Kludge RK61 | amazon.com/s?k=royal+kludge+rk61 | Amazon tag needed |
| Keychron K8 | keychron.com/products/keychron-k8 | `?ref=keyboardtracker` |
| Glorious GMMK Compact | amazon.com/s?k=glorious+gmmk+compact | Amazon tag needed |

**Best60PercentGuide.tsx (5 links)**
| Product | Current URL | Missing Param |
|---------|-------------|---------------|
| Akko 3068B Plus | amazon.com/s?k=akko+3068b+plus | Amazon tag needed |
| RK ROYAL KLUDGE RK61 | amazon.com/s?k=rk61+royal+kludge | Amazon tag needed |
| Glorious GMMK Compact | amazon.com/s?k=glorious+gmmk+compact | Amazon tag needed |
| Keychron Q4 Pro | keychron.com/products/keychron-q4-pro | `?ref=keyboardtracker` |
| Durgod HK Venus | amazon.com/s?k=durgod+hk+venus | Amazon tag needed |

**Best75PercentGuide.tsx (5 links)**
| Product | Current URL | Missing Param |
|---------|-------------|---------------|
| Keychron Q1 Pro | keychron.com/products/keychron-q1-pro | `?ref=keyboardtracker` |
| Royal Kludge RK84 | amazon.com/s?k=rk84+royal+kludge | Amazon tag needed |
| Feker IK75 | aliexpress.com/wholesale?SearchText=feker+ik75 | Tag needed |
| NuPhy Halo75 | nuphy.com/products/halo75 | Tag needed |
| GMMK Pro | amazon.com/s?k=gmmk+pro | Amazon tag needed |

**BestTKLGuide.tsx (3 links)**
| Product | Current URL | Missing Param |
|---------|-------------|---------------|
| Keychron Q3 | keychron.com/products/keychron-q3 | `?ref=keyboardtracker` |
| Keychron C3 Pro | keychron.com/products/keychron-c3-pro | `?ref=keyboardtracker` |
| Keychron Q3 HE | keychron.com/products/keychron-q3-he | `?ref=keyboardtracker` |

**Summary: 22 links missing affiliate tracking codes**

---

## 3. Broken/Malformed Links

### ❌ No Issues Found

All 20 existing affiliate links are properly formatted:
- ✅ No duplicate query parameters
- ✅ No empty tracking codes
- ✅ No vendor/parameter mismatches
- ✅ No malformed URLs

---

## 4. Link Opportunities

### 🎯 Immediate Action Required

**Add tracking to guide page links:**
1. Add `?ref=keyboardtracker` to all keychron.com links (7 links)
2. Apply for Amazon Associates and add tags to Amazon links (7 links)
3. Reach out to NuPhy, ZSA, and AliExpress for affiliate programs

### 🎯 High Impact Opportunity

**Run add-high-priority-vendors.js:**
- Adds **24 new products** from 8 premium vendors
- Potential revenue increase: **+120%** (20 → 44 products)
- New commission rates: 5-15%
- Estimated monthly additional revenue: $50-100

### 🎯 Missing Vendors to Pursue

From AFFILIATE-VENDORS.md:
- [ ] **Amazon Associates** (7 guide page links use Amazon)
- [ ] **ZSA affiliate** (Moonlander in programming guide)
- [ ] **NuPhy affiliate** (Halo75 in 75% guide)
- [ ] **AliExpress affiliate** (Feker IK75 in 75% guide)
- [ ] **RK/Royal Kludge** (Multiple budget boards)

---

## 5. Tracking Code Consistency

### Current Configurations

```javascript
AFFILIATE_CODES = {
  'Epomaker':   { param: 'ref',      value: 'keyboardtracker' },
  'KBDfans':    { param: 'ref',      value: 'keyboardtracker' },
  'NovelKeys':  { param: 'ref',      value: 'keyboardtracker' },
  'Keychron':   { param: 'ref',      value: 'keyboardtracker' },
  'Drop':       { param: 'referer',  value: 'keyboardtracker' }
}
```

### ⚠️ Consistency Issue

Keychron links in guide pages lack tracking parameters even though Keychron config exists. **22 guide page links need affiliate parameters.**

---

## 6. Compliance Status

| Requirement | Status |
|-------------|--------|
| Clear Disclosure Banner | ✅ Implemented |
| "No extra cost" language | ✅ Present |
| Terms of Service affiliate clause | ✅ Present (
| FTC Disclosure | ✅ Above board |
| **Actual Affiliate Signups** | ❌ ⚠️ **PENDING** |

---

## Summary Statistics

| Metric | Count |
|--------|-------|
| Active Products with Tracking | 20 |
| Links Missing Tracking | 22 |
| Ready to Add (high-priority script) | 24 |
| Vendors Configured | 6 |
| Vendors Pending | 8+ |

---

## Action Items (Priority Order)

1. **NOW**: Add `?ref=keyboardtracker` to all 7 Keychron links in guide pages
2. **THIS WEEK**: Apply for Amazon Associates (7 high-value links)
3. **THIS WEEK**: Run `node add-high-priority-vendors.js` to add 24 products
4. **SOON**: Debug KBDfans/Keychron/NovelKeys scrapers
5. **SOON**: Contact NuPhy, ZSA, AliExpress for affiliate programs

---

*Report generated by Switchyard hourly cron - Affiliate Links check (:45)*
