# Keebshelf Keyboard Finder Wizard - Specification

## User Story
Help visitors find their perfect mechanical keyboard through a simple, guided wizard instead of browsing 382+ products blindly.

## Why This Matters
- **Reduces choice paralysis** — Users don't know what they want
- **Educates beginners** — Explains switches, layouts, features
- **Increases conversions** — Relevant recommendations = more clicks
- **Keeps users on site** — No need to leave to research

---

## Wizard Flow (5 Steps)

### Step 1: What's Your Primary Use?
**Question:** "What will you use this keyboard for?"
**Options:**
- 🎮 Gaming — Fast response, anti-ghosting, RGB
- 💼 Office/Programming — Comfort, quiet, ergonomic  
- 🎨 Creative Work —_macros, precision, media controls
- 🏠 General Use — Versatile, entry-level

**Logic:** Filters by category + recommends relevant features

---

### Step 2: How Much Noise Can You Handle?
**Question:** "What's your workspace environment?"
**Options:**
- 🔇 Shared/Office — NEED quiet switches (linear, dampened)
- 🔉 Home office — SOME noise OK (tactile)
- 🔊 Private space — CLICKY! (clicky tactile)
- 🤷 Don't know — Show comparison video/animation

**Logic:** Maps to switch types (linear vs tactile vs clicky)

---

### Step 3: What Size Works for You?
**Question:** "What's your desk space like?"
**Options with visual diagram:**
- ⌨️ Compact (60-65%) — Small desk, minimal, travel-friendly
- 🎹 Balanced (75-80%) — Function keys, arrows, most popular
- 🖥️ Full-size (100%) — Numpad, desktop use, data entry
- 🤷 Not sure — Show size comparison

**Logic:** Filters by layout/size

---

### Step 4: Hot-swap or Nah?
**Question:** "Want to customize switches later?"
**Options:**
- 🔧 Yes! — Hot-swap PCB, modular, future-proof
- ⚙️ Maybe — Explain hot-swap benefit
- ✓ No — Soldered is fine, cheaper
- 🤷 What's that? — Show diagram

**Logic:** Toggle hot-swap filter

---

### Step 5: Budget Range
**Question:** "What's your budget?"
**Slider/options:**
- 💰 Under $100 — Entry level, great value
- 💰💰 $100-200 — Sweet spot, quality builds
- 💰💰💰 $200-300 — Premium, enthusiast grade
- 💎 $300+ — Group buys, custom, luxury

**Logic:** Filter by price range

---

## Results Page

### Matching Products
- Show top 5-8 matching keyboards
- Sort by: relevance score > user rating > price
- Each card shows: WHY it matched

### Match Badges
- ✓ Your use case
- ✓ Quiet enough
- ✓ Right size  
- ✓ Hot-swap ready
- ✓ In budget

### Education Sidebar
- "Not sure? Read our guides:"
- Switch guide link
- Layout guide link
- Beginner guide link

---

## Technical Implementation

### Data Structure
```javascript
const wizardData = {
  useCase: 'gaming' | 'office' | 'creative' | 'general',
  noise: 'quiet' | 'medium' | 'loud' | 'unsure',
  size: 'compact' | 'balanced' | 'fullsize' | 'unsure',
  hotSwap: 'yes' | 'maybe' | 'no' | 'unsure',
  budget: 'under100' | '100to200' | '200to300' | 'over300'
};
```

### Scoring Algorithm
Each keyboard gets a score 0-100:
- Use case match: +30 points
- Switch type match: +25 points  
- Size match: +20 points
- Hot-swap match: +15 points
- Budget match: +10 points

### LocalStorage
- Save progress if user leaves
- Remember preferences for return visits

---

## UI Design

### Layout
- Full-screen modal or dedicated page
- Step indicator (1/5, 2/5, etc.)
- Back button always available
- Progress bar at top

### Styling
- Large, tappable options
- Visual icons for each choice
- Smooth transitions between steps
- Dark mode compatible

### Accessibility
- Keyboard navigation (Tab, Enter, Space)
- Screen reader friendly
- Skip option available
- "Learn more" tooltips

---

## Small Tasks for Sub-Agent

### Task 1: Create Wizard HTML Structure (5 min)
- Create wizard section in index.html
- Step 1-5 containers
- Next/Back buttons
- Progress indicator

### Task 2: Add Styling (5 min)
- Wizard container styles
- Option card styles (large, tappable)
- Progress bar styling
- Animation transitions

### Task 3: Step 1 Implementation (5 min)
- Use case question UI
- Four option cards
- Store selection in JS

### Task 4: Step 2 Implementation (5 min)
- Noise/workspace question
- Switch type education
- Store selection

### Task 5: Step 3-5 Implementation (10 min)
- Size selector with visual
- Hot-swap question
- Budget slider

### Task 6: Results Logic (10 min)
- Scoring algorithm
- Filter products
- Display matches with badges

### Task 7: LocalStorage (5 min)
- Save wizard state
- Resume from where left off

---

## Success Metrics

- Completion rate: 60%+
- Click-through rate to products: 40%+
- Reduced bounce rate: 20%+
- User feedback: Positive

---

## Future Enhancements

- Share results (URL with params)
- Email results to self
- Compare multiple keyboards
- "Show me alternatives" button
- Advanced filters (wireless, RGB, etc.)

---

*Wizard Spec v1.0 - Focus: Help users find the right keyboard quickly*
