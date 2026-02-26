# Affiliate Links Report
**Generated:** Wednesday, February 25th, 2026 — 7:45 PM (America/New_York)  
**Data Source:** `/home/klondike/Desktop/keyboard-tracker/public/data.json`

---

## 📊 Summary

| Metric | Count |
|--------|-------|
| Total Products | 919 |
| Products with Affiliate Links | 919 (100%) |
| **Links with WRONG Tracking Code** | **426** ⚠️ |
| Products without Affiliate Links | 0 |
| Malformed Links | 0 |

---

## 🔗 Affiliate Links by Vendor

### Active Affiliate Integrations

| Vendor | Link Count | Tracking Status | Commission |
|--------|-----------|-----------------|------------|
| **Keychron** | 405 | ✅ `ref=switchyard` CORRECT | 8% |
| **KBDfans** | 262 | ⚠️ `ref=keyboardtracker` WRONG | 8% |
| **NovelKeys** | 164 | ⚠️ `ref=keyboardtracker` WRONG | 10% |
| **Epomaker** | 88 | ✅ `sca_ref` (ShareASale) CORRECT | 6% |

---

## 🚨 Critical Issues Found

### 1. WRONG TRACKING CODE (426 Links)
**Impact:** Commissions will not be properly attributed to Switchyard

- **KBDfans**: 262 links using `ref=keyboardtracker` instead of `ref=switchyard`
  - Example: `https://kbdfans.com/products/hx-40?ref=keyboardtracker`
  - **Fix:** Change to `?ref=switchyard`

- **NovelKeys**: 164 links using `ref=keyboardtracker` instead of `ref=switchyard`
  - Example: `https://novelkeys.com/products/smurve-80-keyboard?ref=keyboardtracker`
  - **Fix:** Change to `?ref=switchyard`

### Root Cause
The issue is in `/home/klondike/Desktop/keyboard-tracker/scraper/scraper.js` (and related scraper files):

```javascript
const AFFILIATE_CODES = {
  'Epomaker': { param: 'sca_ref', value: '10691179.cOO0hJ6jvi' },
  'KBDfans': { param: 'ref', value: 'keyboardtracker' },      // ← WRONG
  'NovelKeys': { param: 'ref', value: 'keyboardtracker' },  // ← WRONG
  'Keychron': { param: 'ref', value: 'switchyard' },          // ← CORRECT
  'Drop': { param: 'referer', value: 'keyboardtracker' }      // ← WRONG
};
```

### 2. Missing Vendor Integrations
Per `/home/klondike/Desktop/keyboard-tracker/docs/AFFILIATE-VENDORS.md`, these vendors have active affiliate programs but are **NOT integrated**:

| Vendor | Commission | Priority |
|--------|-----------|----------|
| CannonKeys | 5-8% | High |
| Glorious | 5-10% | High |
| DiviniKey | ~5% | High |
| The Key Company | 10% | High |
| Mekibo | ~5% | Medium |
| Boardsource | 5-10% | Medium |
| Ashkeebs (Canada) | ~5% | Medium |

---

## 💡 Recommendations

### Immediate Actions (High Priority)

1. **Fix affiliate tracking codes in scraper files:**
   - Update `scraper/scraper.js` line 10-15
   - Update `scraper/scraper-v3.js` line 10-15
   - Update `scraper/scraper-fixed.js` line 9-14
   - Update `scraper/scraper-backup.js` line 9-14

   Change:
   ```javascript
   'KBDfans': { param: 'ref', value: 'keyboardtracker' },
   'NovelKeys': { param: 'ref', value: 'keyboardtracker' },
   'Drop': { param: 'referer', value: 'keyboardtracker' }
   ```
   
   To:
   ```javascript
   'KBDfans': { param: 'ref', value: 'switchyard' },
   'NovelKeys': { param: 'ref', value: 'switchyard' },
   'Drop': { param: 'referer', value: 'switchyard' }
   ```

2. **Rebuild data.json** after fixing scraper configuration
   - Run the scraper to regenerate all affiliate URLs with correct tracking

3. **Verify affiliate account setup** for KBDfans, NovelKeys, and Drop
   - Ensure `switchyard` is registered as the affiliate code on each platform

### Medium-Term Actions

4. **Add missing vendor integrations:**
   - Start with CannonKeys (high priority, ~5-8% commission)
   - Add Glorious (5-10% commission, popular brand)
   - Include The Key Company (10% commission)

5. **Add affiliate disclosure** to site footer if not already present (FTC compliance)

### Link Opportunities

6. **Add affiliate links to group buy posts:**
   - Current group buys lack direct vendor purchase links
   - Estimated 2 active group buys could include affiliate links

---

## 📈 Revenue Impact Estimate

| Scenario | Current | After Fix | Potential + New Vendors |
|----------|---------|-----------|------------------------|
| Monthly Revenue | ~$100-200 | ~$150-300 | ~$300-500 |

*Based on 100 visitors/month at 2% conversion, $50-150 average order value*

---

## 🔍 Files Affected

- `scraper/scraper.js` (lines 10-15)
- `scraper/scraper-v3.js` (lines 10-15)
- `scraper/scraper-fixed.js` (lines 9-14)
- `scraper/scraper-backup.js` (lines 9-14)
- `public/data.json` (426 affiliate URLs need regeneration)
- `build/data.json` (426 affiliate URLs need regeneration)

---

**Next Report:** Thursday, February 26th, 2026 — 8:45 PM
