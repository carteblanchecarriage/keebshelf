const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(cors());
app.use(express.json());

// Load real data from scraper (including allProducts from enhanced scraper)
const DATA_FILE = path.join(__dirname, '..', 'data', 'keyboard-data.json');

function loadData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error loading data:', e.message);
  }
  return { groupBuys: [], interestChecks: [], vendors: [], allProducts: [], revenueProjection: {} };
}

// Initial data load
let db = loadData();

// Reload data every 5 minutes
setInterval(() => {
  db = loadData();
  console.log('🔄 Data reloaded at', new Date().toISOString());
}, 5 * 60 * 1000);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    version: '1.1.0',
    dataSource: 'live-scraper',
    lastUpdated: db.metadata?.scrapedAt || 'unknown',
    filters: {
      defaultExcludes: ['archived', 'sold_out', 'unavailable', 'discontinued'],
      note: 'By default, unavailable items are filtered out. Use ?includeUnavailable=true to show all.'
    }
  });
});

// Filter helper - removes archived/unavailable items by default
function filterAvailableItems(items, includeUnavailable = false) {
  if (includeUnavailable) return items;
  
  const excludedStatuses = ['archived', 'sold_out', 'unavailable', 'discontinued', 'ended', 'closed'];
  
  return items.filter(item => {
    // Check explicit status field
    if (item.status && excludedStatuses.includes(item.status.toLowerCase())) {
      return false;
    }
    
    // Check availability flag (NovelKeys, Shopify style)
    if (item.available === false) {
      return false;
    }
    
    // Check inventory (0 or negative inventory = unavailable)
    if (item.inventory !== undefined && item.inventory <= 0) {
      return false;
    }
    
    // Check for "sold out" or "archived" in name/description
    const nameDesc = `${item.name || ''} ${item.description || ''}`.toLowerCase();
    if (nameDesc.includes('[sold out]') || nameDesc.includes('(archived)') || 
        nameDesc.includes('[unavailable]') || nameDesc.includes('discontinued')) {
      return false;
    }
    
    return true;
  });
}

// Get all group buys (includes allProducts from enhanced scraper)
app.get('/api/groupbuys', (req, res) => {
  const { status, category, vendor, includeUnavailable } = req.query;
  
  // Use allProducts if available (from enhanced scraper) otherwise groupBuys
  let results = db.allProducts || db.groupBuys || [];
  
  // Filter out archived/unavailable items by default
  results = filterAvailableItems(results, includeUnavailable === 'true');
  
  if (status) {
    results = results.filter(gb => gb.status === status);
  }
  if (category) {
    results = results.filter(gb => gb.category === category);
  }
  if (vendor) {
    results = results.filter(gb => 
      gb.vendor?.toLowerCase().includes(vendor.toLowerCase())
    );
  }
  
  res.json({
    count: results.length,
    data: results,
    source: db.metadata?.sources ? 'enhanced-scraper' : 'legacy-scraper',
    lastUpdated: db.metadata?.scrapedAt,
    filters: {
      excludedStatuses: includeUnavailable ? [] : ['archived', 'sold_out', 'unavailable', 'discontinued'],
      activeStatuses: ['active', 'gathering_interest', 'pre_order', 'in_stock']
    }
  });
});

// Get specific group buy
app.get('/api/groupbuys/:id', (req, res) => {
  const groupBuy = db.groupBuys?.find(gb => gb.id === req.params.id);
  if (!groupBuy) {
    return res.status(404).json({ error: 'Group buy not found' });
  }
  res.json(groupBuy);
});

// Get interest checks
app.get('/api/interest-checks', (req, res) => {
  const { includeUnavailable } = req.query;
  let results = db.interestChecks || [];
  
  // Filter out archived/unavailable items by default
  results = filterAvailableItems(results, includeUnavailable === 'true');
  
  res.json({
    count: results.length,
    data: results,
    source: 'live-scraper'
  });
});

// Search across everything
app.get('/api/search', (req, res) => {
  const { q, includeUnavailable } = req.query;
  if (!q) {
    return res.status(400).json({ error: 'Query parameter required' });
  }
  
  const searchTerm = q.toLowerCase();
  
  let groupBuyResults = db.groupBuys?.filter(gb => 
    gb.name.toLowerCase().includes(searchTerm) ||
    gb.description?.toLowerCase().includes(searchTerm) ||
    gb.vendor.toLowerCase().includes(searchTerm)
  ) || [];
  
  let icResults = db.interestChecks?.filter(ic =>
    ic.name.toLowerCase().includes(searchTerm)
  ) || [];
  
  // Filter out archived/unavailable by default
  groupBuyResults = filterAvailableItems(groupBuyResults, includeUnavailable === 'true');
  icResults = filterAvailableItems(icResults, includeUnavailable === 'true');
  
  res.json({
    query: q,
    results: {
      groupBuys: groupBuyResults,
      interestChecks: icResults,
      total: groupBuyResults.length + icResults.length
    },
    filters: includeUnavailable ? {} : { excluded: 'archived, sold_out, unavailable items' }
  });
});

// Get vendors with affiliate links
app.get('/api/vendors', (req, res) => {
  res.json({ 
    count: db.vendors?.length || 0, 
    data: db.vendors || [],
    revenueProjection: db.revenueProjection
  });
});

// Get pricing tiers
app.get('/api/pricing', (req, res) => {
  res.json({
    tiers: [
      {
        name: 'Free',
        price: 0,
        calls: 100,
        alerts: 0,
        features: ['Basic search', 'View group buys', 'Vendor listings']
      },
      {
        name: 'Hobbyist',
        price: 5,
        calls: 1000,
        alerts: 5,
        features: ['1000 API calls/day', 'Email alerts', '30-day history', 'Track 5 items']
      },
      {
        name: 'Builder',
        price: 15,
        calls: 10000,
        alerts: 20,
        features: ['10k API calls/day', 'Discord alerts', '1-year history', 'Track 20 items', 'WebSocket streams']
      },
      {
        name: 'Business',
        price: 50,
        calls: 'unlimited',
        alerts: 'unlimited',
        features: ['Unlimited calls', 'White-label feed', 'Priority support', 'Custom integrations']
      }
    ],
    revenueProjection: db.revenueProjection
  });
});

// Get revenue stats
app.get('/api/revenue', (req, res) => {
  res.json({
    projection: db.revenueProjection,
    breakdown: {
      affiliateCommission: '5-10%',
      avgKeyboardPrice: '$250',
      conversionRate: '20%',
      explanation: 'Based on 100 monthly visitors with 20% conversion rate'
    }
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🎹 Keyboard Tracker API running on port ${PORT}`);
  console.log(`📊 Real data from: ${DATA_FILE}`);
  console.log(`🔄 Auto-reload: Every 5 minutes`);
  console.log(`🚫 Default filter: Excludes archived, sold_out, unavailable items`);
  console.log(`📈 Revenue Projection: $${db.revenueProjection?.totalMonthly || 0}/month`);
  console.log(`\nEndpoints:`);
  console.log(`   GET /health`);
  console.log(`   GET /api/groupbuys`);
  console.log(`   GET /api/groupbuys/:id`);
  console.log(`   GET /api/interest-checks`);
  console.log(`   GET /api/search?q=query`);
  console.log(`   GET /api/vendors`);
  console.log(`   GET /api/pricing`);
  console.log(`   GET /api/revenue`);
  console.log(`\nQuery params:`);
  console.log(`   ?includeUnavailable=true - Show archived/sold out items`);
  console.log(`   ?status=active - Filter by status`);
  console.log(`   ?category=keyboard - Filter by category`);
  console.log(`   ?vendor=NovelKeys - Filter by vendor`);
});
