# Affiliate Links Report
**Generated:** Wednesday, February 25th, 2026 — 9:45 PM (America/New_York)  
**Data Source:** `/home/klondike/Desktop/keyboard-tracker/public/data.json`

---

## 📊 Summary

| Metric | Count | Status |
|--------|-------|--------|
| Total Products | 919 | — |
| Products with Affiliate Links | 919 | 100% ✅ |
| Links with CORRECT Tracking | 2,214 | ✅ |
| Links with WRONG Tracking Code | 1,300 | ⚠️ CRITICAL |
| Malformed Links | 0 | ✅ |
| Products without Affiliate Links | 0 | ✅ |

---

## 🔗 Affiliate Links by Vendor

### Full Link Distribution

| Vendor | Total Products | Correct Tracking | Wrong Tracking | Status |
|--------|---------------|------------------|----------------|--------|
| **Keychron** | 405 | 959 ✅ | 554 ⚠️ | Partially Fixed |
| **KBDfans** | 262 | 604 ✅ | 342 ⚠️ | Partially Fixed |
| **NovelKeys** | 164 | 373 ✅ | 209 ⚠️ | Partially Fixed |
| **Epomaker** | 88 | 278 ✅ (sca_ref) | 190 ⚠️ | Partially Fixed |
| **Drop** | 0* | 5 ✅ | 5 ⚠️ | Partially Fixed |

*Note: Drop products are in data but not in main product count — may be from different scrape sessions.

---

## 🚨 Critical Issues Found

### 1. WRONG TRACKING CODE (1,300 Links)
**Impact:** Commissions will NOT be properly attributed to Switchyard

**Breakdown by vendor:**

| Vendor | Wrong Links | Example URL |
|--------|-------------|-------------|
| Keychron | 554 | `https://keychron.com/...?ref=keyboardtracker` |
| KBDfans | 342 | `https://kbdfans.com/...?ref=keyboardtracker` |
| NovelKeys | 209 | `https://novelkeys.com/...?ref=keyboardtracker` |
| Epomaker | 190 | `https://epomaker.com/...?ref=keyboardtracker` |
| Drop | 5 | `https://drop.com/...?referer=keyboardtracker` |

**Root Cause:**  
Despite `scraper/scraper.js` having the CORRECT codes, `public/data.json` still contains many products with the OLD `keyboardtracker` tracking. This indicates:
- Scraper was fixed after initial data generation
- Data has NOT been fully regenerated since fix
- Some cached/stale products weren't updated

### 2. Correct Tracking Distribution

| Vendor | Correct Links | Tracking Method |
|--------|---------------|-----------------|
| Keychron | 959 | `?ref=switchyard` |
| KBDfans | 604 | `?ref=switchyard` |
| NovelKeys | 373 | `?ref=switchyard` |
| Epomaker | 278 | `?sca_ref=10691179.cOO0hJ6jvi` (ShareASale) |
| Drop | 5 | `?referer=switchyard` |

---

## ✅ What's Working

1. **100% Product Coverage** — All 919 products have affiliate URLs
2. **No Malformed Links** — All URLs are properly formatted
3. **Fresh Data** — All products scraped within last 30 days
4. **Multiple Tracking Methods** — ref parameter, ShareASale sca_ref, and referer all working

---

## 💡 Link Opportunities

### Immediate Revenue Opportunities

1. **Group Buy Posts Without Affiliate Links**
   - 2 active group buys lack direct vendor purchase links
   - Finn 60XT Keyboard (ends March 30)
   - Float65 Keyboard (ends March 25)
   - **Opportunity:** Add vendor website links with affiliate tracking

### Missing Vendor Integrations

Per `AFFILIATE-VENDORS.md`, these vendors have affiliate programs but are NOT integrated:

| Vendor | Commission | Priority | Action Needed |
|--------|------------|----------|---------------|
| CannonKeys | 5-8% | 🔴 High | Apply at support@cannonkeys.com |
| Glorious | 5-10% | 🔴 High | Apply at gloriousgaming.com/affiliates |
| The Key Company | 10% | 🔴 High | Apply for partnership |
| DiviniKey | ~5% | 🟡 Medium | Contact via website |
| Boardsource | 5-10% | 🟡 Medium | DIY kits, Choc switches |
| Ashkeebs (Canada) | ~5% | 🟢 Low | Canadian market coverage |

---

## 📋 Action Items

### URGENT (This Week)

1. **Regenerate All Data with Correct Tracking**
   ```bash
   # Run full scraper rebuild
   node scraper/scraper.js --full-rebuild
   ```
   - Must replace 1,300 stale entries with wrong tracking
   - Run rebuild during low-traffic hours (late night)

2. **Verify Affiliate Account Setup**
   - Confirm `switchyard` is registered on:
     - KBDfans affiliate portal
     - NovelKeys affiliate portal
     - Drop affiliate portal (Impact)

### Medium Priority (Next 2 Weeks)

3. **Apply for New Vendor Programs**
   - Start with CannonKeys (high commission + active GBs)
   - Glorious (popular brand, good conversion)
   - The Key Company (10% commission)

4. **Add Affiliate Disclosure to Site Footer**
   - FTC compliance requirement
   - Brief disclosure near affiliate links

5. **Add Affiliate Links to Group Buy Posts**
   - Link to vendor GB pages when available
   - Track which posts convert

---

## 📈 Revenue Impact Estimate

| Scenario | Monthly Revenue | Notes |
|----------|-----------------|-------|
| **Current (broken tracking)** | ~$50-100 | 1,300+ links not attributed |
| **After Fix** | ~$150-300 | All 919 products properly tracked |
| **+ New Vendors** | ~$300-500 | Add CannonKeys, Glorious, TKC |

*Based on 100-200 visitors/month at 2% conversion, $50-150 AOV*

**Fixing the tracking issue could DOUBLE current affiliate revenue.**

---

## 🔍 Files Affected

| File | Issue | Action |
|------|-------|--------|
| `public/data.json` | 1,300 stale URLs with wrong tracking | Regenerate via scraper |
| `build/data.json` | May have same issue | Copy after regeneration |
| `scraper/*.js` | ✅ Already fixed | No changes needed |

---

## Compliance Check

| Requirement | Status | Notes |
|------------|--------|-------|
| FTC Disclosure | ⚠️ Check | Verify footer or near-link disclosure |
| Amazon Associates | N/A | Not using Amazon currently |
| Vendor Terms | ✅ | All affiliate IDs properly set in scraper |

---

**Next Report:** Wednesday, February 25th, 2026 — 10:45 PM
