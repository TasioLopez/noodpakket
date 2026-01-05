# Files That Conflict with Dynamic Routes

This document lists all static `.astro` page files that will conflict with the new dynamic routes created for Keystatic CMS.

## ⚠️ Important

These files **MUST be removed** after migrating content to Keystatic, as they will conflict with the dynamic `[slug].astro` routes.

## Files to Remove (After Migration)

### Noodpakketten Collection

**Location**: `src/pages/noodpakketten/`

**Files to remove:**
- `huis.astro` → Will be handled by `[slug].astro` (slug: `huis`)
- `gezin.astro` → Will be handled by `[slug].astro` (slug: `gezin`)
- `kinderen.astro` → Will be handled by `[slug].astro` (slug: `kinderen`)
- `auto.astro` → Will be handled by `[slug].astro` (slug: `auto`)
- `go-bag.astro` → Will be handled by `[slug].astro` (slug: `go-bag`)
- `hoeveel-eten.astro` → Will be handled by `[slug].astro` (slug: `hoeveel-eten`)
- `hoeveel-water.astro` → Will be handled by `[slug].astro` (slug: `hoeveel-water`)

**Keep:**
- `index.astro` (pillar page - now uses Keystatic singleton)

### Situaties Collection

**Location**: `src/pages/situaties/`

**Files to remove:**
- `stroomuitval.astro` → Will be handled by `[slug].astro` (slug: `stroomuitval`)
- `evacuatie.astro` → Will be handled by `[slug].astro` (slug: `evacuatie`)
- `nl-alert.astro` → Will be handled by `[slug].astro` (slug: `nl-alert`)

**Keep:**
- `index.astro` (pillar page - now uses Keystatic singleton)

### Gidsen Collection

**Location**: `src/pages/gidsen/`

**Files to remove:**
- `noodpakket-samenstellen.astro` → Will be handled by `[slug].astro` (slug: `noodpakket-samenstellen`)
- `water-voorraad.astro` → Will be handled by `[slug].astro` (slug: `water-voorraad`)

**Keep:**
- `index.astro` (pillar page - now uses Keystatic singleton)

### Tools Collection

**Location**: `src/pages/tools/`

**Files to remove:**
- `water-calculator.astro` → Will be handled by `[slug].astro` (slug: `water-calculator`)
- `voedsel-calculator.astro` → Will be handled by `[slug].astro` (slug: `voedsel-calculator`)
- `72-uur-calculator.astro` → Will be handled by `[slug].astro` (slug: `72-uur-calculator`)
- `noodpakket-calculator.astro` → Will be handled by `[slug].astro` (slug: `noodpakket-calculator`)
- `noodplan-generator.astro` → Will be handled by `[slug].astro` (slug: `noodplan-generator`)
- `noodpakket-checklist.astro` → Will be handled by `[slug].astro` (slug: `noodpakket-checklist`)
- `evacuatieplan.astro` → Will be handled by `[slug].astro` (slug: `evacuatieplan`)
- `go-bag-builder.astro` → Will be handled by `[slug].astro` (slug: `go-bag-builder`)
- `risico-meter.astro` → Will be handled by `[slug].astro` (slug: `risico-meter`)
- `maaltijdplanner-nood.astro` → Will be handled by `[slug].astro` (slug: `maaltijdplanner-nood`)
- `voorraadchecker.astro` → Will be handled by `[slug].astro` (slug: `voorraadchecker`)

**Keep:**
- `index.astro` (pillar page - now uses Keystatic singleton)

### Vergelijking Collection

**Location**: `src/pages/vergelijking/`

**Files to remove:**
- Any `.astro` files in this directory (if any exist)

**Keep:**
- `index.astro` (pillar page - now uses Keystatic singleton)

### Kennisbank Collection

**Location**: `src/pages/kennisbank/`

**Files to remove:**
- `72-uur-regel.astro` → Will be handled by `[slug].astro` (slug: `72-uur-regel`)
- `go-bag.astro` → Will be handled by `[slug].astro` (slug: `go-bag`)
- `nl-alert.astro` → Will be handled by `[slug].astro` (slug: `nl-alert`)
- `noodpakket.astro` → Will be handled by `[slug].astro` (slug: `noodpakket`)

**Keep:**
- `index.astro` (pillar page - now uses Keystatic singleton)

## Migration Checklist

Before removing files:

- [ ] All content migrated to Keystatic collections
- [ ] All pages render correctly at `/{silo}/{slug}` URLs
- [ ] All images uploaded and display correctly
- [ ] All tool components work correctly
- [ ] All pillar pages render correctly
- [ ] Internal links work correctly
- [ ] SEO metadata is correct
- [ ] Build completes without errors

## Removal Script (After Verification)

You can use this PowerShell script to remove all conflicting files (BACKUP FIRST!):

```powershell
# Backup first!
git add .
git commit -m "Backup before removing old static pages"

# Remove conflicting files
Remove-Item "src/pages/noodpakketten/huis.astro" -ErrorAction SilentlyContinue
Remove-Item "src/pages/noodpakketten/gezin.astro" -ErrorAction SilentlyContinue
Remove-Item "src/pages/noodpakketten/kinderen.astro" -ErrorAction SilentlyContinue
Remove-Item "src/pages/noodpakketten/auto.astro" -ErrorAction SilentlyContinue
Remove-Item "src/pages/noodpakketten/go-bag.astro" -ErrorAction SilentlyContinue
Remove-Item "src/pages/noodpakketten/hoeveel-eten.astro" -ErrorAction SilentlyContinue
Remove-Item "src/pages/noodpakketten/hoeveel-water.astro" -ErrorAction SilentlyContinue

Remove-Item "src/pages/situaties/stroomuitval.astro" -ErrorAction SilentlyContinue
Remove-Item "src/pages/situaties/evacuatie.astro" -ErrorAction SilentlyContinue
Remove-Item "src/pages/situaties/nl-alert.astro" -ErrorAction SilentlyContinue

Remove-Item "src/pages/gidsen/noodpakket-samenstellen.astro" -ErrorAction SilentlyContinue
Remove-Item "src/pages/gidsen/water-voorraad.astro" -ErrorAction SilentlyContinue

Remove-Item "src/pages/tools/water-calculator.astro" -ErrorAction SilentlyContinue
Remove-Item "src/pages/tools/voedsel-calculator.astro" -ErrorAction SilentlyContinue
Remove-Item "src/pages/tools/72-uur-calculator.astro" -ErrorAction SilentlyContinue
Remove-Item "src/pages/tools/noodpakket-calculator.astro" -ErrorAction SilentlyContinue
Remove-Item "src/pages/tools/noodplan-generator.astro" -ErrorAction SilentlyContinue
Remove-Item "src/pages/tools/noodpakket-checklist.astro" -ErrorAction SilentlyContinue
Remove-Item "src/pages/tools/evacuatieplan.astro" -ErrorAction SilentlyContinue
Remove-Item "src/pages/tools/go-bag-builder.astro" -ErrorAction SilentlyContinue
Remove-Item "src/pages/tools/risico-meter.astro" -ErrorAction SilentlyContinue
Remove-Item "src/pages/tools/maaltijdplanner-nood.astro" -ErrorAction SilentlyContinue
Remove-Item "src/pages/tools/voorraadchecker.astro" -ErrorAction SilentlyContinue

Remove-Item "src/pages/kennisbank/72-uur-regel.astro" -ErrorAction SilentlyContinue
Remove-Item "src/pages/kennisbank/go-bag.astro" -ErrorAction SilentlyContinue
Remove-Item "src/pages/kennisbank/nl-alert.astro" -ErrorAction SilentlyContinue
Remove-Item "src/pages/kennisbank/noodpakket.astro" -ErrorAction SilentlyContinue
```

## Notes

- Keep `index.astro` files - they're now pillar pages using Keystatic singletons
- The dynamic `[slug].astro` routes will handle all content pages
- Content is now managed via Keystatic admin interface
- Old files can be kept as backup/reference until migration is verified



