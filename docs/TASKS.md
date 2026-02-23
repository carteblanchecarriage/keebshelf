# Site Improvement Tasks - For Sub-Agent

## Current State
- React app is live but minimal
- Missing: Wizard, Footer, Product Modal, proper filtering
- Has: Basic header, product grid, filter chips (UI only)

## Required Components

### Task 1: Footer Component (15 min)
**File:** `src/components/Footer.tsx`
**Requirements:**
- 4 sections: Discover, Learn, Contact, Legal
- Links: Home, Keyboards, Switches, Privacy, Terms, Contact
- Styled with CSS (match header colors)

### Task 2: Product Modal (20 min)
**File:** `src/components/ProductModal.tsx`
**Requirements:**
- Props: product (Product type), onClose function
- Display: Large image, name, vendor, price, description
- Buttons: "Buy Now" (opens vendor URL), "Close"
- Click outside to close

### Task 3: Wizard Component (25 min)
**File:** `src/components/Wizard.tsx`
**Requirements:**
- Floating action button (FAB) bottom-right
- 5-step wizard: Use Case, Workspace, Size, Hot-swap, Budget
- Update product count badge on FAB
- Filter grid based on selections
- Match logic from old HTML version

### Task 4: Working Category Filter (15 min)
**File:** Modify `src/App.tsx`
**Requirements:**
- Make filter chips actually filter the grid
- Use category property from data
- Show count for each category

### Task 5: Missing Pages (20 min)
**Files:** `src/pages/Privacy.tsx`, `src/pages/Terms.tsx`, `src/pages/Contact.tsx`
**Requirements:**
- Basic content pages
- Link from footer
- Use react-router or simple conditional rendering

## Acceptance Criteria
- All components render without errors
- No TypeScript errors
- Build succeeds (`npm run build`)
- Site looks like old HTML version

## Cron Schedule
- Run every 15 minutes
- Check remaining tasks
- Commit every hour
- Push to new-master
