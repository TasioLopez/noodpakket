# Keystatic CMS Migration Guide

This guide helps you migrate existing content from static `.astro` files to Keystatic CMS collections.

## Overview

The migration process involves:
1. Accessing the Keystatic admin interface
2. Creating new content entries for each existing page
3. Copying content from `.astro` files to Keystatic
4. Verifying content renders correctly
5. Removing old static `.astro` files

## Step 1: Access Admin Interface

1. Install dependencies (if not done):
   ```bash
   npm install @keystatic/core @keystatic/astro
   ```

2. Setup authentication:
   - Copy `.env.local.example` to `.env.local`
   - Generate a secret: `openssl rand -base64 32`
   - Add to `.env.local`: `KEYSTATIC_SECRET=your-secret-here`

3. Start dev server:
   ```bash
   npm run dev
   ```

4. Navigate to: `http://localhost:4321/keystatic`

## Step 2: Migrate Content by Collection

### Noodpakketten Collection

**Files to migrate:**
- `src/pages/noodpakketten/huis.astro`
- `src/pages/noodpakketten/gezin.astro`
- `src/pages/noodpakketten/kinderen.astro`
- `src/pages/noodpakketten/auto.astro`
- `src/pages/noodpakketten/go-bag.astro`
- `src/pages/noodpakketten/hoeveel-eten.astro`
- `src/pages/noodpakketten/hoeveel-water.astro`
- ... (all files in `src/pages/noodpakketten/` except `index.astro`)

**Migration steps:**
1. Open Keystatic admin → Collections → Noodpakketten
2. Click "Create entry"
3. Fill in:
   - **Title**: From the `.astro` file's title prop
   - **Description**: From description prop
   - **Content**: Copy HTML content from `content` variable (convert to MDX)
   - **Checklist**: Copy array from `checklist` variable
   - **Tips**: Copy array from `tips` variable
   - **FAQs**: Copy array from `faqs` variable
   - **Keywords**: Copy from `keywords` prop
   - **SEO Title**: From `seoTitle` prop
   - **SEO Description**: From `seoDescription` prop
4. Save entry
5. Verify the page renders at `/{silo}/{slug}`

### Situaties Collection

**Files to migrate:**
- `src/pages/situaties/stroomuitval.astro`
- `src/pages/situaties/evacuatie.astro`
- `src/pages/situaties/nl-alert.astro`
- ... (all files in `src/pages/situaties/` except `index.astro`)

**Migration steps:** Same as Noodpakketten

### Gidsen Collection

**Files to migrate:**
- `src/pages/gidsen/noodpakket-samenstellen.astro`
- `src/pages/gidsen/water-voorraad.astro`
- ... (all files in `src/pages/gidsen/` except `index.astro`)

**Special handling for Steps:**
- Copy `steps` array from the `.astro` file
- Each step should have: title, content, and optional image
- Images need to be uploaded via Keystatic's image field

### Tools Collection

**Files to migrate:**
- `src/pages/tools/water-calculator.astro`
- `src/pages/tools/voedsel-calculator.astro`
- `src/pages/tools/72-uur-calculator.astro`
- ... (all files in `src/pages/tools/` except `index.astro`)

**Special handling:**
- Select the correct **Tool Component** from dropdown
- The component name must match exactly (e.g., `WaterCalculator`, `FoodCalculator`)
- FAQs and other metadata can be added normally

### Vergelijking Collection

**Files to migrate:**
- Any comparison pages in `src/pages/vergelijking/` (except `index.astro`)

**Special handling for Products:**
- Copy `products` array
- Each product needs: name, brand, description, pros, cons, price, rating, image
- Upload product images via Keystatic

### Kennisbank Collection

**Files to migrate:**
- `src/pages/kennisbank/72-uur-regel.astro`
- `src/pages/kennisbank/go-bag.astro`
- `src/pages/kennisbank/nl-alert.astro`
- `src/pages/kennisbank/noodpakket.astro`
- ... (all files in `src/pages/kennisbank/` except `index.astro`)

**Special handling:**
- Add **Definition** field for glossary terms
- Content can be MDX

## Step 3: Migrate Pillar Pages

1. Open Keystatic admin → Singletons
2. Edit each pillar page:
   - `noodpakkettenPillar`
   - `situatiesPillar`
   - `gidsenPillar`
   - `toolsPillar`
   - `vergelijkingPillar`
   - `kennisbankPillar`

3. Copy content from the corresponding `index.astro` files:
   - Title, description
   - `introContent` (convert HTML to MDX)
   - `whatYoullFind` array
   - FAQs array
   - SEO fields

## Step 4: Content Conversion Tips

### HTML to MDX
- Convert HTML strings to MDX format
- Use Markdown syntax where possible
- For complex HTML, you can use raw HTML in MDX

### Images
- Upload images via Keystatic's image fields
- Images will be stored in `public/images/{collection}/`
- Reference them in content using the path provided by Keystatic

### Arrays
- Checklists, tips, FAQs: Copy as-is (arrays of strings or objects)
- Steps: Ensure each step has title, content, optional image

## Step 5: Verify Migration

1. Check all dynamic routes render correctly:
   - Visit `/{silo}/{slug}` for each migrated page
   - Verify content displays correctly
   - Check images load
   - Verify FAQs, checklists, tips render

2. Test pillar pages:
   - Visit `/{silo}` for each silo
   - Verify content from singletons displays

3. Test tool pages:
   - Verify React components render
   - Test tool functionality

## Step 6: Remove Old Files

**⚠️ IMPORTANT: Only remove files after verifying migration!**

After confirming all content works:

1. **Backup first** (optional but recommended):
   ```bash
   git add .
   git commit -m "Backup before removing old static pages"
   ```

2. **Remove conflicting files:**
   ```bash
   # Remove noodpakketten pages (except index.astro)
   rm src/pages/noodpakketten/huis.astro
   rm src/pages/noodpakketten/gezin.astro
   # ... repeat for all pages
   
   # Or use a script to remove all except index.astro
   ```

3. **Files that MUST be removed** (they conflict with dynamic routes):
   - All `.astro` files in `src/pages/noodpakketten/` except `index.astro`
   - All `.astro` files in `src/pages/situaties/` except `index.astro`
   - All `.astro` files in `src/pages/gidsen/` except `index.astro`
   - All `.astro` files in `src/pages/tools/` except `index.astro`
   - All `.astro` files in `src/pages/vergelijking/` except `index.astro`
   - All `.astro` files in `src/pages/kennisbank/` except `index.astro`

## Troubleshooting

### Content not appearing
- Check that content files exist in `src/content/{collection}/`
- Verify slug matches the URL
- Check browser console for errors

### Images not loading
- Verify images were uploaded via Keystatic
- Check image paths in content
- Ensure images are in `public/images/` directories

### Tool components not rendering
- Verify tool component name matches exactly
- Check component is imported in `src/pages/tools/[slug].astro`
- Verify component registry includes the tool

### Build errors
- Check that all required fields are filled in Keystatic
- Verify MDX syntax is correct
- Check for TypeScript errors in dynamic routes

## Next Steps

After migration:
1. Update internal linking system (if needed)
2. Test all routes
3. Update any hardcoded page lists
4. Create user documentation for content editors



