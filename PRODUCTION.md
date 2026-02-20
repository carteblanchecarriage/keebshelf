# Keebshelf Production Guide

## Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   SCRAPER   │────▶│   STATIC    │────▶│   GITHUB    │
│  (Weekly)   │     │    DATA     │     │    PAGES    │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │                    │
       ▼                   ▼                    ▼
Reddit/Geekhack      products.json       User sees live
Vendor APIs                               site instantly
```

## How It Works

### Current Setup (Static MVP)
- ✅ Data embedded in HTML → No server needed
- ✅ GitHub Pages hosts for free
- ✅ Instant load time
- ✅ Links go direct to vendors
- ⚠️ Manual updates required

### Production Setup (Full System)
```
1. SCRAPER runs weekly (cron job)
   ↓
2. Fetches from Reddit, Geekhack, vendor APIs
   ↓
3. Saves to products.json
   ↓
4. Rebuilds dashboard with new data
   ↓
5. Auto-pushes to GitHub
   ↓
6. Site updates automatically
```

## Health Monitoring

- **Weekly auto-check**: Mondays 9am ET
- **Script**: `scripts/health-check.js`
- **Report**: `health-report.json`
- **Alerts**: Telegram notification if broken links found

## Updating Products

### Option 1: Manual (Now)
1. Edit `dashboard/index.html`
2. Update product URLs
3. `git add . && git commit -m "Update products" && git push`
4. Live in 2 minutes

### Option 2: Auto (Later)
Set up scraper to auto-update weekly

## Link Strategy

### Working Link Patterns:
- ✅ `https://drop.com/[category]/[product-name]`
- ✅ `https://keychron.com/products/[product]`
- ✅ `https://novelkeys.com/products/[product]`
- ✅ `https://kbdfans.com/collections/[category]/products/[product]`
- ✅ `https://kono.store/collections/[category]`

### Broken Patterns to Avoid:
- ❌ `/buy/[product]` (Drop ended group buys)
- ❌ Direct `/products/[name]` (Shopify 404s)
- ❌ Guessed URLs (always verify first)

## Revenue Model

### Affiliate Links
1. Apply to vendor programs:
   - Drop: `https://drop.com/partners`
   - Kono: Email support@kono.store
   - NovelKeys: `https://novelkeys.com/pages/affiliate`
   - KBDfans: `https://kbdfans.com/pages/affiliate`
   - Keychron: `https://keychron.com/pages/affiliate`

2. Replace URLs:
   ```
   Before: https://drop.com/mechanical-keyboards/drop-ctrl
   After:  https://drop.com/mechanical-keyboards/drop-ctrl?referer=keebshelf
   ```

3. Track commissions via vendor dashboards

## Next Steps

1. [ ] Verify all current links work (manual click-test)
2. [ ] Apply to affiliate programs
3. [ ] Set up auto-scraper for weekly updates
4. [ ] Add analytics (Google Analytics/Plausible)
5. [ ] Custom domain (keeb.shelf or similar)

## Cost Breakdown

| Item | Cost |
|------|------|
| GitHub Pages | FREE |
| Domain (optional) | ~$12/year |
| Analytics (Plausible) | $9/month |
| **Total** | **$0-21/month** |
