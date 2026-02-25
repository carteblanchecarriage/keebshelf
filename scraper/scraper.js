const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data.json');

// Affiliate tracking codes
const AFFILIATE_CODES = {
  'Epomaker': { param: 'ref', value: 'keyboardtracker' },
  'KBDfans': { param: 'ref', value: 'keyboardtracker' },
  'NovelKeys': { param: 'ref', value: 'keyboardtracker' },
  'Keychron': { param: 'ref', value: 'keyboardtracker' },
  'Drop': { param: 'referer', value: 'keyboardtracker' }
};

// Vendor configurations
const VENDORS = {
  Keychron: {
    baseUrl: 'https://keychron.com',
    collections: ['/collections/all-keyboards', '/collections/keychron-q-series', '/collections/keychron-v-series'],
    selector: '.product-item',
    nameSelector: '.product-title',
    priceSelector: '.product-price',
    linkSelector: 'a[href*="/products/"]'
  },
  Epomaker: {
    baseUrl: 'https://epomaker.com',
    collections: ['/collections/all-products', '/collections/keyboards', '/collections/keycaps', '/collections/switches'],
    selector: '.product-item',
    nameSelector: '.product-title, h3',
    priceSelector: '.product-price, .price',
    linkSelector: 'a[href*="/products/"]'
  },
  KBDfans: {
    baseUrl: 'https://kbdfans.com',
    collections: ['/collections/keyboard', '/collections/keycaps', '/collections/switches'],
    selector: '.grid__item, .product-card',
    nameSelector: '.product-card__name, h2',
    priceSelector: '.product-card__price, .price',
    linkSelector: 'a[href*="/products/"]'
  },
  NovelKeys: {
    baseUrl: 'https://novelkeys.com',
    collections: ['/collections/keyboards', '/collections/keycaps', '/collections/switches'],
    selector: '.product-item',
    nameSelector: '.product-title',
    priceSelector: '.product-price',
    linkSelector: 'a[href*="/products/"]'
  },
  Drop: {
    baseUrl: 'https://drop.com',
    collections: ['/mechanical-keyboards', '/keycaps', '/switches'],
    selector: '[data-testid="product-card"], .item-card',
    nameSelector: 'h3, .title',
    priceSelector: '[data-testid="price"], .price',
    linkSelector: 'a[href*="/buy/"]'
  }
};

function loadData() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch {
    return { allProducts: [], groupBuys: [], metadata: {} };
  }
}

function saveData(data) {
  data.metadata = {
    ...(data.metadata || {}),
    updatedAt: new Date().toISOString(),
    scrapedAt: new Date().toISOString()
  };
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function addAffiliateLink(url, vendor) {
  if (!url) return url;
  if (url.includes('?')) return url;
  
  const affiliate = AFFILIATE_CODES[vendor];
  if (affiliate) {
    return `${url}?${affiliate.param}=${affiliate.value}`;
  }
  return url;
}

function normalizeVendorName(name) {
  const map = {
    'keychron': 'Keychron',
    'epomaker': 'Epomaker',
    'kbdfans': 'KBDfans',
    'kbd-fans': 'KBDfans',
    'novelkeys': 'NovelKeys',
    'novel-keys': 'NovelKeys',
    'drop': 'Drop',
    'drop-com': 'Drop'
  };
  return map[name.toLowerCase()] || name.charAt(0).toUpperCase() + name.slice(1);
}

async function scrapeVendor(vendorName, config) {
  console.log(`\n🔍 Scraping ${vendorName}...`);
  const products = [];
  
  for (const collection of config.collections) {
    try {
      const url = `${config.baseUrl}${collection}`;
      console.log(`   Checking ${collection}...`);
      
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
          'Cache-Control': 'no-cache'
        },
        timeout: 15000,
        maxRedirects: 5
      });
      
      if (!response.data || response.data.length < 1000) {
        console.log(`   ⚠️ Empty response`);
        continue;
      }
      
      const $ = cheerio.load(response.data);
      
      // Try different selectors based on site structure
      $(config.selector).each((i, elem) => {
        try {
          const $el = $(elem);
          
          // Find name
          let name = $el.find(config.nameSelector).first().text().trim();
          if (!name) name = $el.attr('data-title') || $el.find('h2, h3, h4').first().text().trim();
          if (!name) return;
          
          // Find link
          let link = $el.find(config.linkSelector).first().attr('href');
          if (!link) link = $el.attr('href');
          if (!link) link = $el.closest('a').attr('href');
          if (!link) return;
          
          // Normalize URL
          const fullUrl = link.startsWith('http') ? link : `${config.baseUrl}${link.startsWith('/') ? '' : '/'}${link}`;
          
          // Find price
          let price = $el.find(config.priceSelector).first().text().trim();
          if (!price) price = $el.find('.money, .amount, [class*="price"]').first().text().trim();
          
          // Find image
          let image = $el.find('img').first().attr('src') || $el.find('img').first().attr('data-src');
          if (image && image.startsWith('//')) image = 'https:' + image;
          
          const id = `${vendorName.toLowerCase()}-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 50)}`;
          
          products.push({
            id,
            name: name.slice(0, 120),
            vendor: vendorName,
            url: fullUrl,
            affiliateUrl: addAffiliateLink(fullUrl, vendorName),
            price: price.slice(0, 30) || 'See site',
            image: image || '',
            category: collection.includes('keyboard') ? 'keyboard' : 
                     collection.includes('keycap') ? 'keycaps' : 
                     collection.includes('switch') ? 'switches' : 'accessories',
            status: 'active',
            scrapedAt: new Date().toISOString(),
            source: 'vendor'
          });
        } catch (e) {
          // Skip malformed items
        }
      });
      
    } catch (error) {
      console.log(`   ⚠️ ${collection}: ${error.message.slice(0, 50)}`);
    }
    
    // Rate limiting between requests
    await new Promise(r => setTimeout(r, 1000));
  }
  
  // Remove duplicates
  const seen = new Set();
  const unique = products.filter(p => {
    if (seen.has(p.url)) return false;
    seen.add(p.url);
    return true;
  });
  
  console.log(`   ✅ Found ${unique.length} ${vendorName} products`);
  return unique;
}

async function runScraper() {
  console.log('🚀 Starting vendor product scraper...\n');
  
  const existingData = loadData();
  const originalCount = existingData.allProducts?.length || 0;
  
  // Build existing product map
  const existingByUrl = new Map();
  (existingData.allProducts || []).forEach(p => {
    if (p.url) existingByUrl.set(p.url.split('?')[0], p);
  });
  
  const allNewProducts = [];
  let totalNew = 0;
  
  // Scrape each vendor
  for (const [vendorName, config] of Object.entries(VENDORS)) {
    try {
      const products = await scrapeVendor(vendorName, config);
      
      products.forEach(p => {
        const baseUrl = p.url.split('?')[0];
        if (!existingByUrl.has(baseUrl)) {
          allNewProducts.push(p);
          existingByUrl.set(baseUrl, p);
          totalNew++;
        }
      });
      
    } catch (error) {
      console.log(`❌ ${vendorName} failed: ${error.message}`);
    }
  }
  
  // Merge with existing
  const updatedProducts = [...(existingData.allProducts || []), ...allNewProducts];
  
  // Update data
  const newData = {
    ...existingData,
    allProducts: updatedProducts,
    metadata: {
      ...existingData.metadata,
      updatedAt: new Date().toISOString(),
      lastScrape: new Date().toISOString(),
      totalVendors: Object.keys(VENDORS).length,
      newProductsAdded: totalNew,
      totalProducts: updatedProducts.length
    }
  };
  
  // Count by vendor
  const byVendor = {};
  updatedProducts.forEach(p => {
    byVendor[p.vendor] = (byVendor[p.vendor] || 0) + 1;
  });
  
  saveData(newData);
  
  console.log('\n📊 Summary:');
  console.log(`   Previous: ${originalCount} products`);
  console.log(`   New: ${totalNew} products`);
  console.log(`   Total: ${updatedProducts.length} products`);
  console.log('\n   By Vendor:');
  Object.entries(byVendor)
    .sort((a, b) => b[1] - a[1])
    .forEach(([v, c]) => console.log(`      ${v}: ${c}`));
  
  return { changed: totalNew > 0, newItems: totalNew, data: newData };
}

// Run
runScraper().then(result => {
  if (result.changed) {
    console.log('\n✅ New products found and added!');
  } else {
    console.log('\n📊 No new products (scrape successful, existing data current)');
  }
  process.exit(0);
}).catch(error => {
  console.error('Scraper failed:', error.message);
  process.exit(1);
});
