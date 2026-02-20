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
    version: '1.0.0',
    dataSource: 'live-scraper',
    lastUpdated: db.metadata?.scrapedAt || 'unknown'
  });
});

// Get all group buys (includes allProducts from enhanced scraper)
app.get('/api/groupbuys', (req, res) => {
  const { status, category, vendor } = req.query;
  
  // Use allProducts if available (from enhanced scraper) otherwise groupBuys
  let results = db.allProducts || db.groupBuys || [];
  
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
    lastUpdated: db.metadata?.scrapedAt
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
  const results = db.interestChecks || [];
  res.json({
    count: results.length,
    data: results,
    source: 'live-scraper'
  });
});

// Search across everything
app.get('/api/search', (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ error: 'Query parameter required' });
  }
  
  const searchTerm = q.toLowerCase();
  
  const groupBuyResults = db.groupBuys?.filter(gb => 
    gb.name.toLowerCase().includes(searchTerm) ||
    gb.description?.toLowerCase().includes(searchTerm) ||
    gb.vendor.toLowerCase().includes(searchTerm)
  ) || [];
  
  const icResults = db.interestChecks?.filter(ic =>
    ic.name.toLowerCase().includes(searchTerm)
  ) || [];
  
  res.json({
    query: q,
    results: {
      groupBuys: groupBuyResults,
      interestChecks: icResults,
      total: groupBuyResults.length + icResults.length
    }
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
  console.log(`\n📈 Revenue Projection: $${db.revenueProjection?.totalMonthly || 0}/month`);
  console.log(`\nEndpoints:`);
  console.log(`   GET /health`);
  console.log(`   GET /api/groupbuys`);
  console.log(`   GET /api/groupbuys/:id`);
  console.log(`   GET /api/interest-checks`);
  console.log(`   GET /api/search?q=query`);
  console.log(`   GET /api/vendors`);
  console.log(`   GET /api/pricing`);
  console.log(`   GET /api/revenue`);
});
