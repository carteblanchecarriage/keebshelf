const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data.json');

// ============ CONFIGURATION ============

const AFFILIATE_CODES = {
  'Epomaker': { param: 'ref', value: 'keyboardtracker' },
  'KBDfans': { param: 'ref', value: 'keyboardtracker' },
  'NovelKeys': { param: 'ref', value: 'keyboardtracker' },
  'Keychron': { param: 'ref', value: 'keyboardtracker' },
  'Drop': { param: 'referer', value: 'keyboardtracker' }
};

// ============ DATA STRUCTURE ============
// Standardized item structure:
// {
//   id: string (unique identifier),
//   name: string (product/group buy name),
//   type: 'product' | 'group_buy' | 'interest_check',
//   platform: string (Geekhack, Reddit, Keychron, etc),
//   vendor?: string (for products),
//   category?: string (keyboard, keycaps, switches, accessories),
//   url: string (original URL),
//   affiliateUrl?: string (with tracking),
//   price?: string,
//   image?: string,
//   status: 'active' | 'live' | 'interest_check' | 'ended',
//   author?: string (for group buys),
//   joins?: number (for group buys),
//   replies?: number,
//   views?: number,
//   upvotes?: number (for Reddit),
//   scrapedAt: ISO timestamp,
//   source: 'vendor' | 'geekhack' | 'reddit'
// }

function loadData() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch {
    return { 
      items: [],           // Unified list of all items
      products: [],        // Vendor products
      groupBuys: [],       // Group buys only
      metadata: {} 
    };
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

// ============ PRODUCT SCRAPERS ============

async function scrapeKeychron() {
  console.log('🔍 Keychron...');
  const items = [];
  try {
    const res = await axios.get('https://keychron.com/collections/all-keyboards', {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 10000
    });
    const $ = cheerio.load(res.data);
    $('.product-item, .product-card').each((i, el) => {
      const name = $(el).find('.product-title, h3').first().text().trim();
      const href = $(el).find('a[href*="/products/"]').attr('href');
      const price = $(el).find('.product-price').first().text().trim();
      const img = $(el).find('img').attr('src') || $(el).find('img').attr('data-src');
      
      if (name && href) {
        const url = href.startsWith('http') ? href : `https://keychron.com${href}`;
        items.push({
          id: `keychron-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40)}`,
          name,
          type: 'product',
          platform: 'Keychron',
          vendor: 'Keychron',
          category: 'keyboard',
          url,
          affiliateUrl: addAffiliateLink(url, 'Keychron'),
          price: price || 'See site',
          image: img || '',
          status: 'active',
          scrapedAt: new Date().toISOString(),
          source: 'vendor'
        });
      }
    });
  } catch (e) { console.log(`   ⚠️ ${e.message.slice(0, 40)}`); }
  console.log(`   ✅ ${items.length}`);
  return items;
}

async function scrapeEpomaker() {
  console.log('🔍 Epomaker...');
  const items = [];
  try {
    const res = await axios.get('https://epomaker.com/collections/all', {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 10000
    });
    const $ = cheerio.load(res.data);
    $('.product-item').each((i, el) => {
      const name = $(el).find('.product-title').text().trim();
      const href = $(el).find('a').attr('href');
      const price = $(el).find('.price').first().text().trim();
      const img = $(el).find('img').attr('src') || '';
      
      if (name && href) {
        const url = href.startsWith('http') ? href : `https://epomaker.com${href}`;
        items.push({
          id: `epo-${Date.now()}-${i}`,
          name,
          type: 'product',
          platform: 'Epomaker',
          vendor: 'Epomaker',
          category: href.includes('keycap') ? 'keycaps' : 
                   href.includes('switch') ? 'switches' : 'keyboard',
          url,
          affiliateUrl: addAffiliateLink(url, 'Epomaker'),
          price,
          image: img,
          status: 'active',
          scrapedAt: new Date().toISOString(),
          source: 'vendor'
        });
      }
    });
  } catch (e) { console.log(`   ⚠️ ${e.message.slice(0, 40)}`); }
  console.log(`   ✅ ${items.length}`);
  return items;
}

async function scrapeKBDfans() {
  console.log('🔍 KBDfans...');
  const items = [];
  try {
    const res = await axios.get('https://kbdfans.com/collections/keyboard', {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 10000
    });
    const $ = cheerio.load(res.data);
    $('.product-card, .grid__item').each((i, el) => {
      const name = $(el).find('.product-card__name, h3').first().text().trim();
      const href = $(el).find('a').attr('href');
      const price = $(el).find('.price').text().trim();
      
      if (name && href) {
        const url = href.startsWith('http') ? href : `https://kbdfans.com${href}`;
        items.push({
          id: `kbdfans-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 30)}`,
          name,
          type: 'product',
          platform: 'KBDfans',
          vendor: 'KBDfans',
          category: 'keyboard',
          url,
          affiliateUrl: addAffiliateLink(url, 'KBDfans'),
          price,
          status: 'active',
          scrapedAt: new Date().toISOString(),
          source: 'vendor'
        });
      }
    });
  } catch (e) { console.log(`   ⚠️ ${e.message.slice(0, 40)}`); }
  console.log(`   ✅ ${items.length}`);
  return items;
}

async function scrapeNovelKeys() {
  console.log('🔍 NovelKeys...');
  const items = [];
  try {
    const res = await axios.get('https://novelkeys.com/collections/keyboards', {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 10000
    });
    const $ = cheerio.load(res.data);
    $('.product-item').each((i, el) => {
      const name = $(el).find('.product-title').text().trim();
      const href = $(el).find('a[href*="/products/"]').attr('href');
      const price = $(el).find('.product-price').text().trim();
      
      if (name && href) {
        const url = href.startsWith('http') ? href : `https://novelkeys.com${href}`;
        items.push({
          id: `nk-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 30)}`,
          name,
          type: 'product',
          platform: 'NovelKeys',
          vendor: 'NovelKeys',
          category: 'keyboard',
          url,
          affiliateUrl: addAffiliateLink(url, 'NovelKeys'),
          price,
          status: 'active',
          scrapedAt: new Date().toISOString(),
          source: 'vendor'
        });
      }
    });
  } catch (e) { console.log(`   ⚠️ ${e.message.slice(0, 40)}`); }
  console.log(`   ✅ ${items.length}`);
  return items;
}

async function scrapeDrop() {
  console.log('🔍 Drop...');
  const items = [];
  try {
    const res = await axios.get('https://drop.com/mechanical-keyboards', {
      headers: { 'User-Agent': 'Mozilla/5.0' },
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
  } catch (e) { console.log(`   ⚠️ ${e.message.slice(0, 40)}`); }
  console.log(`   ✅ ${items.length}`);
  return items;
}

// ============ GROUP BUY SCRAPERS ============

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
        const id = `geekhack-${title.slice(0, 30).replace(/[^a-z0-9]+/gi, '-')}`;
        items.push({
          id,
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
  } catch (e) { console.log(`   ⚠️ ${e.message.slice(0, 40)}`); }
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
      console.log('   ⚠️ Reddit rate limited (expected)');
    } else {
      console.log(`   ⚠️ ${e.message.slice(0, 40)}`);
    }
  }
  console.log(`   ✅ ${items.length} posts`);
  return items;
}

// ============ MAIN ============

async function runScraper() {
  console.log('🚀 Starting Switchyard Scraper\n');
  const startTime = Date.now();
  const data = loadData();
  
  // Track existing items by URL
  const existingUrls = new Set(data.items?.map(i => i.url) || []);
  const newItems = [];
  
  // ===== PRODUCTS =====
  console.log('📦 VENDOR PRODUCTS');
  const productScrapers = [
    scrapeKeychron,
    scrapeEpomaker, 
    scrapeKBDfans,
    scrapeNovelKeys,
    scrapeDrop
  ];
  
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
    await new Promise(r => setTimeout(r, 500));
  }
  
  // ===== GROUP BUYS =====
  console.log('\n🎯 GROUP BUYS & INTEREST CHECKS');
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
  
  // Separate into categories
  data.items = allItems;
  data.products = allItems.filter(i => i.type === 'product');
  data.groupBuys = allItems.filter(i => i.type === 'group_buy' || i.type === 'interest_check');
  
  // Stats
  data.metadata = {
    scrapedAt: new Date().toISOString(),
    duration: ((Date.now() - startTime) / 1000).toFixed(2),
    totalItems: allItems.length,
    newItemsAdded: newItems.length,
    products: data.products.length,
    groupBuys: data.groupBuys.length,
    byType: {
      products: data.products.length,
      groupBuys: data.groupBuys.filter(i => i.type === 'group_buy').length,
      interestChecks: data.groupBuys.filter(i => i.type === 'interest_check').length
    }
  };
  
  saveData(data);
  
  console.log('\n📊 RESULTS');
  console.log(`   Total: ${allItems.length} items (${newItems.length} new)`);
  console.log(`   Products: ${data.products.length}`);
  console.log(`   Group Buys: ${data.groupBuys.filter(i => i.type === 'group_buy').length}`);
  console.log(`   Interest Checks: ${data.groupBuys.filter(i => i.type === 'interest_check').length}`);
  console.log(`   ⏱️  ${data.metadata.duration}s`);
  console.log(newItems.length > 0 ? '\n✅ New data found!' : '\n📊 No new items');
  
  return { changed: newItems.length > 0, count: newItems.length };
}

runScraper().then(r => process.exit(0)).catch(e => {
  console.error('Error:', e.message);
  process.exit(1);
});
