# Blog Content Workflow - Switchyard

## Overview
Rapid content production system for capturing search traffic and driving affiliate revenue.

## The Complete Workflow

### Step 1: Research (5-10 min)
**Goal:** Find what people are actually searching for

**Sources to check:**
1. **Reddit** - r/MechanicalKeyboards hot posts
2. **GeekHack** - Active threads and ICs (Interest Checks)
3. **Trending products** in your data.json
4. **Competitor sites** - What's getting traffic?
5. **YouTube search suggestions** - Type "best mechanical keyboard" and see autocomplete

**Key signals:**
- High engagement posts (100+ comments)
- "Should I buy..." questions
- Comparison requests ("X vs Y")
- Hot gaming topics (rapid trigger, low latency)
- New product releases (MX2A, new Keychron models)

**Example research:**
- Search: "hall effect keyboard" → See people asking "is rapid trigger cheating?"
- Search: "keychron" → See "are Keychron keyboards worth it?"
- Search: "cherry mx" → See confusion about "new Cherry vs old Cherry"

### Step 2: Topic Selection (2 min)
**Prioritize based on:**
1. **Search volume** - High intent queries
2. **Product availability** - Do you have affiliate products?
3. **Competition** - Can you rank? (Check current results)
4. **Commission potential** - High-ticket items? ($150+ keyboards)

**Good topics:**
- ✅ Specific product questions ("Is X worth it?")
- ✅ Comparisons ("X vs Y")
- ✅ "How to" / guides ("How to choose...")
- ✅ Trending gaming tech (low latency, hall effect)
- ✅ Brand deep-dives (405 Keychron products in stock)

**Bad topics:**
- ❌ Too broad ("Mechanical keyboards explained")
- ❌ No affiliate angle (pure educational)
- ❌ Saturated ("Top 10 keyboards 2026")

### Step 3: Write the Post (15-30 min)
**Target:** 1,500-2,500 words
**Structure:**
1. **Hook paragraph** - Address pain point/question
2. **TL;DR box** - Quick answer for scanners
3. **Deep dive** - Real analysis, not fluff
4. **Comparison table** - Side-by-side specs
5. **Product cards** - 3-5 keyboards with affiliate links
6. **Final verdict** - Clear recommendation
7. **Related articles** - Internal links

**Writing rules:**
- Be brutally honest (builds trust)
- Include actual complaints from Reddit/reviews
- Grade products honestly (don't recommend everything)
- Use affiliate links on EVERY product mention

### Step 4: Product Linking (Critical)
**Every product recommendation MUST include:**
```html
<a href="/?keyboard=[product-name]" class="cta-button">Compare Prices</a>
```

**Or direct affiliate:**
```html
<a href="[affiliate-url]" class="cta-button">View on [Vendor]</a>
```

**Affiliate link format by vendor:**
- **Keychron:** `https://keychron.com?ref=switchyard`
- **Epomaker:** `https://epomaker.com?ref=switchyard`
- **Qwerkywriter:** `https://qwerkywriter.com?sca_ref=10713146.AiDf5cQpby`
- **KBDfans:** Use direct product links with tracking

**Product card template:**
```html
<div class="keyboard-card-inline">
    <img src="https://assets.switchyard.club/keyboards/[product].jpg" alt="[Name]">
    <div class="keyboard-card-info">
        <h4>[Product Name]</h4>
        <div class="price">$XXX</div>
        <div class="features">
            ✅ [Feature 1]<br>
            ✅ [Feature 2]<br>
            ❌ [Drawback]
        </div>
        <a href="/?keyboard=[product-slug]" class="cta-button">Compare Prices</a>
    </div>
</div>
```

### Step 5: SEO Optimization
**Every post needs:**
- [ ] Title under 60 chars with target keyword
- [ ] Meta description 150-160 chars
- [ ] H1 matches title
- [ ] H2s with related keywords
- [ ] Keyword in first 100 words
- [ ] Internal links (3-5 per post)
- [ ] Image alt tags
- [ ] Schema markup (Article)

**Keyword placement:**
- Primary keyword in: Title, H1, first paragraph, one H2
- Secondary keywords in: Other H2s, body text
- Long-tail: Natural questions in content

### Step 6: File Structure (Critical)
**Create post in BOTH locations:**

1. **Source:** `/blog/[post-name].html`
2. **Public:** `/public/blog/[post-name].html` ← This gets deployed!

**Why two locations?**
- `/blog/` = Git tracking and editing
- `/public/blog/` = Actually served on the site

**Update these files:**
1. `/blog/index.html` - Add post card to blog grid
2. `/public/blog/index.html` - Copy above
3. `/src/pages/learn/index.tsx` - Add to "Latest from Blog" section
4. (Optional) `sitemap.xml` - Add URL for SEO

**Directory structure:**
```
/blog/                          # Git source
├── index.html                  # Blog hub
├── hall-effect-keyboards-2026.html
├── are-keychron-keyboards-worth-it.html
└── ...

/public/blog/                   # Deployed (build copies these)
├── index.html                  # Same as above
├── hall-effect-keyboards-2026.html
└── ...
```

### Step 7: Build & Test (5 min)
**Commands:**
```bash
cd ~/Desktop/keyboard-tracker
npm run build                    # Compile React app
```

**Verify:**
- Check `build/blog/` has all HTML files
- Check `build/index.html` exists
- No build errors

**If build fails:**
- Check for missing imports in `App.tsx`
- Check TypeScript errors
- Ensure all referenced components exist

### Step 8: Commit & Push (2 min)
**Commit message format:**
```
Add blog post: [Title]

- [Word count] words on [topic]
- Target keywords: [keyword1], [keyword2]
- [X] affiliate product links
- Adds to blog index and learn page
- SEO optimized with meta tags
```

**Commands:**
```bash
git add -A
git commit -m "Add blog post: Cherry MX2A vs Original

- 2000 words on switch comparison
- Target keywords: cherry mx2a review, cherry vs mx2a, gateron vs cherry
- 4 affiliate product links
- Adds to blog index and learn page
- SEO optimized with meta tags"
git push
```

### Step 9: Deploy (Manual or Auto)
**Current deployment:** Cloudflare Pages

**Manual deploy:**
1. Log in to Cloudflare dashboard
2. Go to Pages → switchyard
3. Upload `build/` folder
4. Confirm live

**Auto-deploy (if enabled):**
- Git push triggers build
- Wait 2-5 minutes
- Verify at `https://switchyard.club/blog/[post-name].html`

**Verify live:**
- Check blog post loads
- Check affiliate links redirect correctly
- Check mobile view
- Verify Learn page shows new post

### Step 10: Track Performance
**Metrics to watch:**
- Search impressions (Google Search Console)
- Page views (analytics)
- Click-through rate on affiliate links
- Conversion rate (purchases from clicks)

**When to update:**
- New products released (update comparisons)
- Prices change
- New info becomes available
- Post ranks but not in top 3 (optimize further)

## Content Calendar Template

| Week | Post Type | Topic | Products Featured | Est. Traffic |
|------|-----------|-------|-------------------|--------------|
| 1 | Comparison | Hall Effect vs Mechanical | Wooting 60HE, Keychron C4 HE | High |
| 1 | Brand Review | Keychron Worth It? | K8, C2, Q1, alternatives | Med |
| 2 | Switch Guide | Cherry MX2A Explained | Cherry MX2A, Gateron Yellow | High |
| 2 | Recommendation | Best 60% Under $100 | 3-4 budget options | Med |
| 3 | Trend | New Release Coverage | Latest Drop/GMK | Low |
| 3 | Guide | How to Choose Switches | Switch sampler packs | Med |

## Quick Reference: Affiliate Links

### Linking Patterns

**Product page (recommended):**
```html
<a href="/?keyboard=[slug]">[Product Name]</a>
```

**Direct vendor with ref code:**
```html
<a href="https://keychron.com/products/[product]?ref=switchyard">Buy on Keychron</a>
```

**Category browse:**
```html
<a href="/?category=keyboards&vendor=Keychron">Browse Keychron</a>
```

### Product Slug Format
- Lowercase
- Hyphens for spaces
- Model numbers included

Examples:
- `keychron-k8` → `/?keyboard=keychron-k8`
- `wooting-60he` → `/?keyboard=wooting-60he`
- `corsair-k70-rgb-pro` → `/?keyboard=corsair-k70-rgb-pro`

## Post Template

See: `/blog/TEMPLATE.html` (create this)

```html
<!-- TEMPLATE -->
<!DOCTYPE html>
...
<!-- Use existing post as starting point -->
<!-- Copy from hall-effect-keyboards-2026.html -->
```

## Common Mistakes to Avoid

1. ❌ Forgetting `/public/blog/` copy
   ✅ Always update BOTH `/blog/` and `/public/blog/`

2. ❌ Generic product links without ref code
   ✅ Every vendor link gets `?ref=switchyard`

3. ❌ Recommending everything as "great"
   ✅ Be honest - say which to skip

4. ❌ No clear CTA
   ✅ Every product card has "Compare Prices" button

5. ❌ Post not in Learn page
   ✅ Add to `src/pages/learn/index.tsx` Latest from Blog section

6. ❌ Forgetting to build
   ✅ `npm run build` is required for React changes

## Tools Used

- **Write:** VS Code / Cursor (create HTML files)
- **Build:** `npm run build`
- **Commit:** `git commit` with descriptive message
- **Deploy:** Cloudflare Pages (manual upload)
- **Verify:** Browser check + web_fetch tool

---

**Document updated:** Feb 27, 2026
**Next review:** Check what content is ranking in 2 weeks
