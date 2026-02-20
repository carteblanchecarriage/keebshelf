# Mechanical Keyboard Tracker

A tracker for mechanical keyboard group buys, interest checks, and vendor listings with affiliate revenue.

## Revenue Model

### Freemium + Affiliate Commission

**Why this works:**
- Keyboard enthusiasts buy EXPENSIVE stuff ($300-1000 per build)
- Vendors pay 5-10% affiliate commission
- Community is underserved with aggregation tools

### Pricing Tiers

**Free Tier:**
- API: 100 calls/day
- Web dashboard: View active group buys
- Basic search
- No alerts

**Hobbyist: $5/month**
- 1000 API calls/day
- Email alerts for 5 tracked items
- Historical price data (30 days)

**Builder: $15/month**
- 10k API calls/day
- Discord/webhook alerts
- REST + WebSocket streams
- API key authentication
- Historical data (1 year)

**Business: $50/month**
- Unlimited calls
- White-label data feed
- Priority support
- Custom integrations

### Affiliate Revenue (Main Income)

Every product link includes affiliate tags:
- **Drop.com**: 5% commission (formerly Massdrop)
- **Kono.store**: 10% commission
- **Shopify stores**: 8-12% commission
- **Amazon Associates**: 4% on keyboards/accessories

**Math:**
- 100 active users → 20 buy a $400 keyboard → 10% avg commission = $800
- API subscriptions: $1000/month
- **Total: $1800/month**

## Data Sources

1. **Geekhack** - Group buy forums (scraping)
2. **Drop.com** - API or scraping
3. **Kono.store** - API or scraping
4. **Reddit** - r/mechmarket, r/MechanicalKeyboards
5. **Shopify stores** - Various vendors

## Project Structure

```
keyboard-tracker/
├── api/              # Express API server
├── scraper/          # Data collection scripts
├── dashboard/        # Web dashboard (Next.js)
├── affiliates/       # Affiliate program docs
└── data/            # Local database (JSON for MVP)
```

## Quick Start

```bash
# Install dependencies
cd api && npm install
cd ../dashboard && npm install

# Start API
npm run dev

# Start dashboard
npm run dev
```

## API Endpoints

- `GET /api/groupbuys` - List active group buys
- `GET /api/interest-checks` - List interest checks
- `GET /api/vendors` - List vendors with affiliate links
- `GET /api/search?q=query` - Search keyboards
- `GET /api/track/:id` - Track specific item

## Roadmap

### MVP (Week 1)
- [x] Project structure
- [ ] Basic scraper for Geekhack
- [ ] Simple API with mock data
- [ ] Web dashboard
- [ ] Affiliate documentation

### Beta (Week 2)
- [ ] Add more data sources
- [ ] User accounts
- [ ] Stripe integration
- [ ] Alert system

### Launch (Week 3)
- [ ] Marketing
- [ ] Affiliate partnerships
- [ ] Scale to $200/month
