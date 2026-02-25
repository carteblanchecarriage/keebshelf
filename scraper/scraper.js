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

function loadData() {
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    if (!data.items && data.allProducts) {
      data.items = data.allProducts;
    }
    return data;
  } catch {
    return { items: [], allProducts: [], groupBuys: [], metadata: {} };
  }
}

function saveData(data) {
  data.metadata.updatedAt = new Date().toISOString();
  data.metadata.scrapedAt = new Date().toISOString();
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function addAffiliateLink(url, vendor) {
  if (!url || url.includes('?')) return url;
  const aff = AFFILIATE_CODES[vendor];
  if (aff) return `${url}?${aff.param}=${aff.value}`;
  return url;
}

// Shopify JSON API scraper (works for Keychron, Epomaker, KBDfans, NovelKeys)
async function scrapeShopifyStore(baseUrl, collectionPath, vendorName, limit = 50) {
  const items = [];
  try {
    const res = await axios.get(`${baseUrl}${collectionPath}/products.json`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
      timeout: 15000
    });
    
    const products = res.data?.products || [];
    
    products.slice(0, limit).forEach(p => {
      const url = `${baseUrl}/products/${p.handle}`;
      const price = p.variants?.[0]?.price || 'See site';
      const img = p.images?.[0]?.src || '';
      const type = (p.product_type || '').toLowerCase();
      
      items.push({
        id: `${vendorName.toLowerCase()}-${p.handle}-${p.id}`.slice(0, 80),
        name: p.title,
        type: 'product',
        platform: vendorName,
        vendor: vendorName,
        category: type.includes('keycap') ? 'keycaps' :
                 type.includes('switch') ? 'switches' :
                 type.includes('cable') ? 'accessories' :
                 type.includes('deskmat') ? 'accessories' : 'keyboard',
        url,
        affiliateUrl: addAffiliateLink(url, vendorName),
        price: price.startsWith('$') ? price : `$${price}`,
        image: img,
        description: p.body_html?.replace(/<[^>]*>/g, '').slice(0, 200).trim() || '',
        status: 'active',
        scrapedAt: new Date().toISOString(),
        source: 'vendor'
      });
    });
    
  } catch (e) {
    console.log(`   ⚠️ ${e.message.slice(0, 50)}`);
  }
  return items;
}

// Individual scrapers
async function scrapeKeychron() {
  console.log('🔍 Keychron...');
  const items = await scrapeShopifyStore('https://keychron.com', '/collections/all-keyboards', 'Keychron', 50);
  console.log(`   ✅ ${items.length}`);
  return items;
}

async function scrapeEpomaker() {
  console.log('🔍 Epomaker...');
  const items = await scrapeShopifyStore('https://epomaker.com', '/collections/all', 'Epomaker', 50);
  console.log(`   ✅ ${items.length}`);
  return items;
}

async function scrapeKBDfans() {
  console.log('🔍 KBDfans...');
  const items = await scrapeShopifyStore('https://kbdfans.com', '/collections/keyboard', 'KBDfans', 50);
  console.log(`   ✅ ${items.length}`);
  return items;
}

async function scrapeNovelKeys() {
  console.log('🔍 NovelKeys...');
  const items = await scrapeShopifyStore('https://novelkeys.com', '/collections/keyboards', 'NovelKeys', 50);
  console.log(`   ✅ ${items.length}`);
  return items;
}

// Drop scraper (not Shopify)
async function scrapeDrop() {
  console.log('🔍 Drop...');
  const items = [];
  try {
    const res = await axios.get('https://drop.com/mechanical-keyboards', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
      timeout: 10000
    });
    const $ = cheerio.load(res.data);
    $('a[href*="/buy/"]').each((i, el) => {
      const $el = $(el);
      const name = $el.find('h3, .title').first().text().trim();
      const href = $el.attr('href');
      const joins = $el.text().match(/(\d+) joined/)?.[1];
      
      if (name && href && name.length > 2) {
        const url = href.startsWith('http') ? href : `https://drop.com${href}`;
        items.push({
          id: `drop-${href.split('/').pop()?.slice(0, 20) || i}`,
          name: name.slice(0, 100),
          type: 'product',
          platform: 'Drop',
          vendor: 'Drop',
          category: 'keyboard',
          url,
          affiliateUrl: addAffiliateLink(url, 'Drop'),
          joins: joins ? parseInt(joins) : 0,
          status: 'active',
          scrapedAt: new Date().toISOString(),
          source: 'vendor'
        });
      }
    });
  } catch (e) { console.log(`   ⚠️ ${e.message.slice(0, 50)}`); }
  console.log(`   ✅ ${items.length}`);
  return items;
}

// Group Buy scrapers
async function scrapeGeekhack() {
  console.log('\n🔍 Geekhack Group Buys...');
  const items = [];
  try {
    const res = await axios.get('https://geekhack.org/index.php?board=70.0', {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 10000
    });
    const $ = cheerio.load(res.data);
    $('.topic_row').each((i, el) => {
      const title = $(el).find('.subject a').first().text().trim();
      const href = $(el).find('.subject a').attr('href');
      const author = $(el).find('.poster a').text().trim();
      const replies = $(el).find('.stats .replies').text().trim() || 
                     $(el).find('.stats').text().match(/(\d+) replies?/)?.[1];
      
      if (title && href) {
        const url = href.startsWith('http') ? href : `https://geekhack.org${href}`;
        items.push({
          id: `geekhack-${title.slice(0, 30).replace(/[^a-z0-9]+/gi, '-')}-${i}`.slice(0, 80),
          name: title,
          type: title.toLowerCase().includes('[ic]') ? 'interest_check' : 'group_buy',
          platform: 'Geekhack',
          url,
          author: author || 'Unknown',
          replies: parseInt(replies) || 0,
          status: 'live',
          scrapedAt: new Date().toISOString(),
          source: 'geekhack'
        });
      }
    });
  } catch (e) { console.log(`   ⚠️ ${e.message.slice(0, 50)}`); }
  console.log(`   ✅ ${items.length} threads`);
  return items;
}

async function scrapeReddit() {
  console.log('🔍 Reddit r/mechmarket...');
  const items = [];
  try {
    const res = await axios.get('https://www.reddit.com/r/mechmarket/new.json?limit=25', {
      headers: { 'User-Agent': 'Switchyard/1.0' },
      timeout: 10000
    });
    const posts = res.data?.data?.children || [];
    posts.forEach(post => {
      const p = post.data;
      const match = p.title?.match(/\[(GB|IC)\]/i);
      if (match) {
        items.push({
          id: `reddit-${p.id}`,
          name: p.title,
          type: match[1].toUpperCase() === 'IC' ? 'interest_check' : 'group_buy',
          platform: 'Reddit r/mechmarket',
          url: `https://reddit.com${p.permalink}`,
          author: p.author,
          upvotes: p.ups || 0,
          comments: p.num_comments || 0,
          status: 'live',
          scrapedAt: new Date().toISOString(),
          source: 'reddit'
        });
      }
    });
  } catch (e) {
    if (e.response?.status === 403) {
      console.log('   ⚠️ Reddit rate limited');
    } else {
      console.log(`   ⚠️ ${e.message.slice(0, 50)}`);
    }
  }
  console.log(`   ✅ ${items.length} posts`);
  return items;
}

// Main
async function runScraper() {
  console.log('🚀 Starting Switchyard Scraper\n');
  const startTime = Date.now();
  const data = loadData();
  
  const existingUrls = new Set(data.items?.map(i => i.url) || []);
  const newItems = [];
  
  // Products
  console.log('📦 VENDOR PRODUCTS');
  const productScrapers = [scrapeKeychron, scrapeEpomaker, scrapeKBDfans, scrapeNovelKeys, scrapeDrop];
  
  for (const scraper of productScrapers) {
    try {
      const items = await scraper();
      items.forEach(item => {
        if (!existingUrls.has(item.url)) {
          newItems.push(item);
          existingUrls.add(item.url);
        }
      });
    } catch (e) {
      console.log(`   Error: ${e.message.slice(0, 50)}`);
    }
    await new Promise(r => setTimeout(r, 1000));
  }
  
  // Group Buys
  console.log('\n🎯 GROUP BUYS');
  const gbScrapers = [scrapeGeekhack, scrapeReddit];
  
  for (const scraper of gbScrapers) {
    try {
      const items = await scraper();
      items.forEach(item => {
        if (!existingUrls.has(item.url)) {
          newItems.push(item);
          existingUrls.add(item.url);
        }
      });
    } catch (e) {
      console.log(`   Error: ${e.message.slice(0, 50)}`);
    }
  }
  
  // Merge
  const allItems = [...(data.items || []), ...newItems];
  data.items = allItems;
  data.allProducts = allItems.filter(i => i.type === 'product');
  data.groupBuys = allItems.filter(i => i.type === 'group_buy' || i.type === 'interest_check');
  
  data.metadata = {
    scrapedAt: new Date().toISOString(),
    duration: ((Date.now() - startTime) / 1000).toFixed(2),
    totalItems: allItems.length,
    newItems: newItems.length,
    products: data.allProducts.length,
    groupBuys: data.groupBuys.length
  };
  
  saveData(data);
  
  console.log('\n📊 RESULTS');
  console.log(`   Total: ${allItems.length} (${newItems.length} new)`);
  console.log(`   Products: ${data.allProducts.length}`);
  console.log(`   Group Buys: ${data.groupBuys.filter(i => i.type === 'group_buy').length}`);
  console.log(`   Interest Checks: ${data.groupBuys.filter(i => i.type === 'interest_check').length}`);
  console.log(`   ⏱️  ${data.metadata.duration}s`);
  console.log(newItems.length > 0 ? '\n✅ New items found!' : '\n📊 No new items');
  
  return { changed: newItems.length > 0, count: newItems.length };
}

runScraper().then(() => process.exit(0)).catch(e => {
  console.error('Error:', e.message);
  process.exit(1);
});
