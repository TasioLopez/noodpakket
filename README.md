# Noodpakket Center / Crisis Voorbereiding Platform

De meest autoritaire, complete, SEO-geoptimaliseerde en betrouwbare website in Nederland over noodpakketten en crisisvoorbereiding.

## Tech Stack

- **Framework:** Astro 5.x with TypeScript
- **Content:** Keystatic CMS with Markdown/MDX
- **Styling:** Tailwind CSS
- **Interactive Components:** React (via Astro Islands Architecture)
- **Deployment:** Vercel (Server-Side Rendering)
- **Analytics:** Google Analytics 4 & Microsoft Clarity

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

- `/src/pages/` - Route files (file-based routing)
- `/src/content/` - Content Collections (managed via Keystatic CMS)
- `/src/components/` - Reusable components
- `/src/components/layout/` - Page layouts
- `/src/lib/` - Utilities and helpers
- `/public/` - Static assets
- `/keystatic.config.ts` - Keystatic CMS configuration

## Content Management

This project uses **Keystatic CMS** for content management. See `CMS_SETUP.md` for detailed instructions on accessing and using the admin dashboard.

## Site Structure

The site follows a clean SILO architecture with 6 main silos:

1. **Noodpakketten** - Emergency kits by type
2. **Situaties** - Emergency situations
3. **Tools** - Interactive calculators and tools
4. **Gidsen** - Comprehensive guides
5. **Vergelijking** - Product comparisons
6. **Kennisbank** - Glossary and FAQ

## License

All rights reserved.


