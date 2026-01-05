# Page Generation Guide

This guide explains how to create the remaining pages for the Noodpakket Expert platform.

## Page Types

### 1. Pillar Pages (Silo Root Pages)
Located at: `src/pages/{silo}/index.astro`

Example: `src/pages/noodpakketten/index.astro`

Template structure:
```astro
---
import PillarPage from '../../components/templates/PillarPage.astro';
---

<PillarPage
  title="Silo Title"
  description="Description of this silo"
  silo="noodpakketten"
  keywords={['keyword1', 'keyword2']}
  faqs={[...]}
  seoTitle="SEO Title | Noodpakket Expert"
  seoDescription="SEO description"
/>
```

### 2. Subpages
Located at: `src/pages/{silo}/{page-slug}.astro`

Example: `src/pages/noodpakketten/huis.astro`

Use the Subpage template with content, checklist, tips, and FAQs.

### 3. Tool Pages
Located at: `src/pages/tools/{tool-slug}.astro`

Example: `src/pages/tools/water-calculator.astro`

Each tool needs:
- A React component in `src/components/tools/{ToolName}.tsx`
- A tool page using the ToolPage template

### 4. Comparison Pages
Use ComparisonPage template (create template if needed)

### 5. Guide Pages
Use GuidePage template (create template if needed)

## Required Pages by Silo

### SILO 1: Noodpakketten (18 pages)
- ✅ index.astro (pillar)
- ✅ huis.astro
- [ ] gezin.astro
- [ ] kinderen.astro
- [ ] baby.astro
- [ ] auto.astro
- [ ] bedrijf.astro
- [ ] huisdieren.astro
- [ ] overheid.astro
- [ ] ehbo.astro
- [ ] 72-uur-kit.astro
- [ ] go-bag.astro
- [ ] winter.astro
- [ ] budget.astro
- [ ] voorraad.astro
- [ ] wat-zit-er-in.astro
- [ ] hoeveel-contant-geld.astro
- [ ] hoeveel-eten.astro
- [ ] hoeveel-water.astro
- [ ] waar-kopen.astro
- [ ] checklist.astro

### SILO 2: Situaties (21 pages)
- [ ] index.astro (pillar)
- [ ] stroomuitval.astro
- [ ] wateruitval.astro
- ... (see plan.md for full list)

### SILO 3: Tools (11 pages)
- [ ] index.astro (pillar)
- ✅ water-calculator.astro
- [ ] noodpakket-checklist.astro
- ... (see plan.md for full list)

### SILO 4: Gidsen (33 pages)
- [ ] index.astro (pillar)
- ... (see plan.md for full list)

### SILO 5: Vergelijking (12 pages)
- [ ] index.astro (pillar)
- ... (see plan.md for full list)

### SILO 6: Kennisbank (17 pages)
- [ ] index.astro (pillar)
- ... (see plan.md for full list)

## Content Guidelines

- Use simple Dutch (B1 level)
- Trustworthy, calm, professional tone
- Avoid sensationalism
- Focus on safety and responsibility
- Include checklists where relevant
- Add FAQs for SEO
- Use internal links to related pages

## Next Steps

1. Create remaining pillar pages for each silo
2. Create subpages following the examples
3. Build React tool components
4. Create comparison and guide page templates
5. Add content to each page
6. Test internal linking
7. Verify SEO on all pages


