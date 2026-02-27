# Affiliate Links Report
**Generated:** 2026-02-27 18:46 

---

## 1. Vendor Link Counts

| Vendor | Total Products | With Affiliate | Coverage |
|--------|---------------|----------------|----------|
| Drop | 9 | 9 | 100% |
| Epomaker | 117 | 117 | 100% |
| KBDfans | 80 | 80 | 100% |
| Keychron | 149 | 149 | 100% |
| NovelKeys | 45 | 45 | 100% |
| Unknown | 1 | 0 | 0% |

---

## 2. Tracking Code Analysis

**CONFIRMED:**  is the CORRECT tracking code for Keychron, KBDfans, and NovelKeys. This matches the AFFILIATE_CODES configuration in scraper.js.

**Current Status:** The data-backup.json file contains links using  instead of . This appears to be legacy data that hasn't been updated since the scraper configuration was corrected.


### Keychron
- Expected: ref=switchyard
- Found:  (149 items)

### KBDfans
- Expected: ref=switchyard
- Found:  (80 items)

### NovelKeys
- Expected: ref=switchyard
- Found:  (45 items)

### Drop
- Expected: referer=switchyard
- Found:  (9 items)


---

## 3. Missing Affiliate URLs

Total items missing affiliate URLs: 1
- [Unknown] New Product...


---

## 4. Amazon Associates

**No Amazon links detected** in the current dataset.

All products link directly to vendor sites (Keychron, Epomaker, KBDfans, NovelKeys, Drop).

---

## 5. Summary

| Metric | Count |
|--------|-------|
| Total Products | 401 |
| With Affiliate URL | 400 |
| Missing Affiliate | 1 |
| Tracking Code Issues | 283 |

---

## Recommendations

**CRITICAL:** The data file needs refreshing to update tracking codes from  to  for Keychron, KBDfans, NovelKeys, and Drop. The scraper is correctly configured — the stored data is outdated.

Run the scraper to regenerate data.json with correct tracking codes.
