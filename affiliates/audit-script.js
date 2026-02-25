const fs = require('fs');
const data = JSON.parse(fs.readFileSync('/home/klondike/Desktop/keyboard-tracker/data.json', 'utf8'));

const products = data.allProducts || [];

const vendorCounts = {};
const affiliateCounts = {};
const missingAffiliate = [];
const missingTracking = [];
const malformed = [];

// Known affiliate vendors
const knownVendors = ['Keychron', 'Epomaker', 'KBDfans', 'NovelKeys', 'Drop', 'Kono.store', 'Akko'];

products.forEach(p => {
  const vendor = p.vendor || p.brand || 'Unknown';
  vendorCounts[vendor] = (vendorCounts[vendor] || 0) + 1;

  if (p.affiliateUrl) {
    affiliateCounts[vendor] = (affiliateCounts[vendor] || 0) + 1;

    // Check tracking codes
    if (!p.affiliateUrl.includes('ref=keyboardtracker') && !p.affiliateUrl.includes('referer=keyboardtracker')) {
      missingTracking.push({ name: p.name, vendor, url: p.affiliateUrl });
    }

    // Check malformed
    if (!p.affiliateUrl.startsWith('http') || p.affiliateUrl.includes(' ') || p.affiliateUrl.includes('\n') || p.affiliateUrl.includes('\t')) {
      malformed.push({ name: p.name, vendor, url: p.affiliateUrl });
    }
  } else {
    // Check if this vendor should have affiliate links
    if (knownVendors.includes(vendor)) {
      missingAffiliate.push({ name: p.name, vendor });
    }
  }
});

console.log('=== VENDOR COUNTS ===');
Object.entries(vendorCounts).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => {
  const aff = affiliateCounts[k] || 0;
  const pct = v > 0 ? Math.round(aff / v * 100) : 0;
  console.log(`${k}: ${v} products, ${aff} affiliate links (${pct}%)`);
});

console.log('\n=== MISSING AFFILIATE LINKS (Known Vendors) ===');
if (missingAffiliate.length === 0) {
  console.log('✅ None');
} else {
  missingAffiliate.forEach(m => console.log(`- ${m.name} (${m.vendor})`));
}

console.log('\n=== MISSING TRACKING CODES ===');
if (missingTracking.length === 0) {
  console.log('✅ None');
} else {
  missingTracking.forEach(m => console.log(`- ${m.name} (${m.vendor}): ${m.url}`));
}

console.log('\n=== MALFORMED LINKS ===');
if (malformed.length === 0) {
  console.log('✅ None');
} else {
  malformed.forEach(m => console.log(`- ${m.name}: ${m.url}`));
}

// Calculate totals
const totalProducts = products.length;
const totalAffiliate = Object.values(affiliateCounts).reduce((a, b) => a + b, 0);

console.log('\n=== SUMMARY ===');
console.log(`Total products: ${totalProducts}`);
console.log(`Products with affiliate links: ${totalAffiliate}`);
console.log(`Coverage: ${Math.round(totalAffiliate / totalProducts * 100)}%`);
