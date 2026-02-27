const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
const products = data.allProducts || [];

const stats = {
  total: products.length,
  withAffiliate: 0,
  switchyard: 0,
  scaRef: 0,
  keyboardtracker: 0,
  malformed: 0,
  amazon: 0,
  missingTracking: 0,
  vendors: {}
};

products.forEach(p => {
  const vendor = p.vendor || p.brand || 'Unknown';
  
  if (!stats.vendors[vendor]) {
    stats.vendors[vendor] = { total: 0, affiliate: 0, switchyard: 0, scaRef: 0, malformed: 0 };
  }
  
  stats.vendors[vendor].total++;
  
  if (p.affiliateUrl) {
    stats.withAffiliate++;
    stats.vendors[vendor].affiliate++;
    
    // Check tracking codes
    if (p.affiliateUrl.includes('ref=switchyard')) {
      stats.switchyard++;
      stats.vendors[vendor].switchyard++;
    } else if (p.affiliateUrl.includes('sca_ref=')) {
      stats.scaRef++;
      stats.vendors[vendor].scaRef++;
    } else if (p.affiliateUrl.includes('ref=keyboardtracker')) {
      stats.keyboardtracker++;
    } else {
      stats.missingTracking++;
    }
    
    // Check Amazon
    if (/amazon|amzn\.to/i.test(p.affiliateUrl)) {
      stats.amazon++;
    }
    
    // Check malformed
    if (!/^https:\/\//.test(p.affiliateUrl) || /\s/.test(p.affiliateUrl)) {
      stats.malformed++;
      stats.vendors[vendor].malformed++;
    }
  }
});

console.log(JSON.stringify(stats, null, 2));
