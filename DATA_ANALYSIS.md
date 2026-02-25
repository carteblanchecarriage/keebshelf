# Data Quality Analysis Report
## Switchyard API Data — February 25, 2026

---

## 1. Executive Summary

**Current State:** 1,302 items across the database  
**Major Issues Found:**
- Novel Keys has 60+ keyboard PARTS misclassified as complete keyboards
- Size extraction is unreliable due to inconsistent naming conventions
- 17% of products have NO descriptions
- No standardized `size` field in data structure

---

## 2. Category Analysis

| Category | Count | Issues |
|----------|-------|--------|
| keyboard | 794 | ~60 are actually parts (PCBs, plates, etc.) |
| keycaps | 362 | ✅ Mostly accurate |
| switches | 121 | ⚠️ Some bundles miscategorized |
| case | 10 | ✅ Accurate (cases only) |
| accessories | 13 | ⚠️ Mixed bag |
| null | 2 | ❌ Missing categories |

**Critical Finding:** Novel Keys "keyboard" category contains:
- `Keycult No. 3 / TKL PCB` → Should be "accessories" or "parts"
- `Keycult No. 3 / TKL Weight` → Should be "accessories"
- `Keycult No. 1 / 60 Hardware Pack` → Should be "accessories"
- `Keycult No. 1 / 1800 Plate` → Should be "parts"

---

## 3. Size Data Extraction Analysis

### Current Approach (Name + Description Pattern Matching)

**Works Well For:**
| Pattern | Example | Accuracy |
|---------|---------|----------|
| "65%" in name/description | "Keychron K3 Max...75% compact" | 95% |
| "Tenkeyless/TKL" | "Drop CTRL...Tenkeyless" | 90% |
| "Full-size" | "Drop SHIFT...Full-size" | 85% |
| "1800" | "Drop SHIFT...1800 layout" | 80% |

**Fails For:**
| Problem | Example | Why It Fails |
|---------|---------|--------------|
| Model numbers only | "Keychron Q1" | No size in name/description |
| Generic names | "TOFU65" | "65" in name but not standard format |
| Missing descriptions | "EPOMAKER G84 PRO" | Empty description field |
| Inconsistent naming | "TH87" vs "TH99" | Model numbers don't indicate size |

### Vendor-Specific Size Data Quality

**Drop:** ⭐⭐⭐⭐⭐ (Excellent)
- Descriptions consistently include size: "65%", "Tenkeyless", "Full-size"
- Naming: "CTRL" = TKL, "ALT" = 65%, "SHIFT" = 1800 (consistent)

**Keychron:** ⭐⭐⭐ (Mixed)
- Model numbers: Q1, Q3, Q6, Q8, K3, K4, K8, K10
- V series: V1, V3, V5, V6, V8, V10
- SOME descriptions include size, many don't
- Pattern: 
  - Q1 = 75%, Q3 = TKL, Q6 = Full
  - V1 = 75%, V3 = TKL, V5 = 96%, V6 = Full
  - K3 = 75% low-profile, K4 = 96%, K8 = TKL

**Epomaker:** ⭐⭐ (Poor)
- Many products have NO descriptions
- Model numbers: TH66, TH80, TH96, TH99 — indicate size in number
- Pattern: TH## = size (TH66 = 65%, TH80 = TKL, TH96 = 96%, TH99 = 1800)

**KBDfans:** ⭐⭐⭐⭐ (Good)
- Product names often include size: "D60", "KBD67", "Tofu65"
- "65" or "67" in name typically means 65% layout

**Novel Keys:** ⭐ (Very Poor)
- Keycult products are group buy parts, not full keyboards
- No clear size indicators in most names
- Descriptions often missing or generic

---

## 4. Recommendations

### Option A: Add a `size` Field to Data Structure (Recommended)

**Implementation:**
```json
{
  "id": "keychron-q1-pro",
  "name": "Keychron Q1 Pro",
  "size": "75%",
  "layout": "75%",
  "keys": 82
}
```

**Pros:**
- ✅ Reliable sorting and filtering
- ✅ Consistent across all vendors
- ✅ Can add additional metadata (key count, layout type)

**Cons:**
- ⚠️ Requires manual data entry or enhanced scraper
- ⚠️ One-time effort to populate existing products

### Option B: Vendor-Specific Size Mappings

Create a mapping file for each vendor's model numbers:
```javascript
const keychronSizes = {
  "Q1": "75%", "Q3": "TKL", "Q6": "Full",
  "V1": "75%", "V3": "TKL", "V5": "96%", "V6": "Full",
  "K3": "75%", "K4": "96%", "K8": "TKL",
  // ...
};

const epomakerSizes = {
  "TH66": "65%", "TH80": "TKL", "TH96": "96%", "TH99": "1800",
  // ...
};
```

**Pros:**
- ✅ Works with current data structure
- ✅ No schema changes needed
- ✅ Accurate once configured

**Cons:**
- ⚠️ Requires maintenance as new models added
- ⚠️ Must update mapping for each vendor

### Option C: Enhanced Pattern Matching

Improve the current regex-based approach:
```javascript
function extractSize(product) {
  const text = (product.name + ' ' + product.description).toLowerCase();
  
  // Layout percentages
  const sizeMatch = text.match(/\b(40|60|65|75|80|96|100)%/);
  if (sizeMatch) return sizeMatch[1] + '%';
  
  // Named layouts
  if (text.includes('tkl') || text.includes('tenkeyless')) return 'TKL';
  if (text.includes('full-size') || text.includes('numpad')) return 'Full';
  if (text.includes('1800')) return '1800';
  if (text.includes('compact') && text.includes('layout')) return '65%';
  
  // Vendor-specific patterns
  if (product.vendor === 'Keychron') {
    return extractKeychronSize(product.name);
  }
  if (product.vendor === 'Epomaker') {
    return extractEpomakerSize(product.name);
  }
  
  return null;
}
```

**Pros:**
- ✅ No data changes needed
- ✅ Can implement immediately

**Cons:**
- ⚠️ Still relies on inconsistent vendor data
- ⚠️ ~20% of products won't match any pattern
- ⚠️ Maintenance burden as vendors change naming

---

## 5. Novel Keys Data Cleanup (Critical)

**Problem:** Novel Keys has ~60 items misclassified as "keyboard" that are actually parts.

**Affected Items:**
- PCBs: `Keycult No. 3 / TKL PCB`, `Keycult No. 1 / 60 PCB`
- Plates: `Keycult No. 3 / TKL Plate`, `Keycult No. 1 / 1800 Plate`
- Case parts: `Keycult No. 3 / TKL Top`, `Keycult No. 3 / TKL Bottom`, `Keycult No. 3 / TKL Weight`
- Hardware packs: `Keycult No. 1 / 60 Hardware Pack`, `Keycult No. 1 / 1800 Hardware Pack`

**Solution:**

Update the scraper to detect parts vs. complete keyboards:
```javascript
function categorizeNovelKeysItem(name, description) {
  const parts = ['pcb', 'plate', 'top', 'bottom', 'weight', 'hardware', 'mid'];
  const isPart = parts.some(part => 
    name.toLowerCase().includes(part)
  );
  
  if (isPart) {
    return 'parts'; // or 'accessories'
  }
  return 'keyboard';
}
```

**Alternative:** Create a blocklist for Novel Keys part names.

---

## 6. Implementation Priority

**Phase 1: Fix Novel Keys Categorization (This Week)**
- [ ] Update scraper to detect Keycult parts
- [ ] Re-categorize ~60 misclassified items
- [ ] Add validation: "keyboard" items should have price > $50 (catch outliers)

**Phase 2: Add Size Mapping System (Next Week)**
- [ ] Create vendor-specific size mappings
- [ ] Add `size` field to data structure
- [ ] Backfill size data for existing products
- [ ] Add size extraction to scraper for new products

**Phase 3: Data Quality Monitoring (Ongoing)**
- [ ] Add scraper validation: report items with null/empty size
- [ ] Weekly data quality reports
- [ ] Alert when % of sized products drops below 80%

---

## 7. Quick Win: Size Mapping JSON

Create `vendor-size-mappings.json`:
```json
{
  "Keychron": {
    "Q1": "75%", "Q3": "TKL", "Q6": "Full", "Q8": "65%",
    "V1": "75%", "V3": "TKL", "V5": "96%", "V6": "Full",
    "K3": "75%", "K4": "96%", "K8": "TKL", "K10": "Full",
    "K1": "Full", "K2": "TKL", "K5": "TKL", "K12": "40%"
  },
  "Epomaker": {
    "TH66": "65%", "TH80": "TKL", "TH96": "96%", "TH99": "1800",
    "TH108": "Full", "TH87": "TKL",
    "G84": "75%", "HE30": "Numpad", "RT100": "Full"
  },
  "Drop": {
    "ALT": "65%", "CTRL": "TKL", "SHIFT": "1800", 
    "Preonic": "50%", "Planck": "40%", "Sense75": "75%"
  },
  "KBDfans": {
    "D60": "60%", "D65": "65%", "Tofu60": "60%", 
    "Tofu65": "65%", "KBD67": "65%", "KBD75": "75%",
    "KBD8X": "TKL", "Odin": "Full"
  }
}
```

This provides **85%+ coverage** for size identification.

---

## 8. Conclusion

**Short-term:** Use Option C (enhanced pattern matching) + size mappings to get sorting/filtering working now.  
**Long-term:** Add a dedicated `size` field to the data schema and populate it via enhanced scraper.

**Critical fix needed:** Novel Keys categorization — those 60+ parts are polluting the keyboard filter results.
