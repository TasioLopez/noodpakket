# Keystatic CMS Setup & Usage Guide

## Quick Start

### 1. Installation

```bash
npm install @keystatic/core @keystatic/astro
```

### 2. Authentication Setup

Create `.env.local` file:

```bash
# Generate a secret key
openssl rand -base64 32

# Add to .env.local
KEYSTATIC_SECRET=your-generated-secret-here
```

### 3. Access Admin Interface

1. Start dev server: `npm run dev`
2. Navigate to: `http://localhost:4321/keystatic`
3. You'll be prompted to set a password (first time only)

## Content Collections

### Available Collections

1. **Noodpakketten** - Emergency kit pages
2. **Situaties** - Emergency situation guides
3. **Gidsen** - Step-by-step guides
4. **Tools** - Interactive tool pages
5. **Vergelijking** - Product comparison pages
6. **Kennisbank** - Glossary and knowledge base

### Available Singletons (Pillar Pages)

1. **Noodpakketten Pillar** - Main noodpakketten page
2. **Situaties Pillar** - Main situaties page
3. **Gidsen Pillar** - Main gidsen page
4. **Tools Pillar** - Main tools page
5. **Vergelijking Pillar** - Main vergelijking page
6. **Kennisbank Pillar** - Main kennisbank page

## Creating Content

### Creating a New Page

1. Go to Collections → Select collection (e.g., "Noodpakketten")
2. Click "Create entry"
3. Fill in required fields:
   - **Title**: Page title (used for URL slug)
   - **Description**: Short description
   - **Content**: Main content (MDX format)
4. Fill optional fields:
   - **Checklist**: Array of checklist items
   - **Tips**: Array of tips
   - **FAQs**: Array of FAQ objects (question + answer)
   - **Keywords**: Array of keywords for SEO
   - **SEO Title**: Custom SEO title
   - **SEO Description**: Custom SEO description
   - **Featured Image**: Upload an image
5. Click "Save"
6. Page will be available at `/{collection}/{slug}`

### Creating a Tool Page

1. Go to Collections → Tools
2. Click "Create entry"
3. Fill in title and description
4. **Important**: Select **Tool Component** from dropdown:
   - Water Calculator
   - Food Calculator
   - 72-Uur Calculator
   - etc.
5. Add FAQs and other metadata
6. Save
7. The selected React component will render on the page

### Creating a Guide Page

1. Go to Collections → Gidsen
2. Create entry
3. Add content
4. **Add Steps**:
   - Click "Add Step"
   - Enter step title
   - Enter step content
   - Optionally upload step image
5. Add tips, FAQs, etc.
6. Save

### Creating a Comparison Page

1. Go to Collections → Vergelijking
2. Create entry
3. Add content
4. **Add Products**:
   - Click "Add Product"
   - Fill in: name, brand, description
   - Add pros (array)
   - Add cons (array)
   - Add price, rating (1-5)
   - Upload product image
5. Optionally add comparison table:
   - Add table headers
   - Add table rows (arrays of cells)
6. Save

## Editing Content

1. Go to Collections → Select collection
2. Click on the entry you want to edit
3. Make changes
4. Click "Save"
5. Changes are immediately available (in dev mode)

## Managing Images

### Uploading Images

1. When editing content, find image fields
2. Click "Choose image" or "Upload"
3. Select or upload image
4. Image is stored in `public/images/{collection}/`
5. Reference in content using the provided path

### Image Organization

- Images are organized by collection:
  - `public/images/noodpakketten/`
  - `public/images/situaties/`
  - `public/images/gidsen/steps/`
  - `public/images/vergelijking/`
  - etc.

## Editing Pillar Pages

1. Go to Singletons
2. Select pillar page (e.g., "Noodpakketten Pillar Page")
3. Edit:
   - Title, description
   - Introduction content (MDX)
   - "What You'll Find" items
   - FAQs
   - SEO fields
4. Save
5. Changes appear on `/{silo}` page

## Content Structure

### Common Fields

- **Title**: Used for URL slug and page title
- **Description**: Short description (used in cards, meta)
- **Content**: Main content (MDX format)
- **Keywords**: For SEO and internal linking
- **SEO Title**: Custom SEO title (optional)
- **SEO Description**: Custom SEO description (optional)
- **Date Published**: Publication date
- **Date Modified**: Last modification date
- **Author**: Content author (defaults to "Noodpakket Center")

### Collection-Specific Fields

**Noodpakketten & Situaties:**
- Checklist (array of strings)
- Tips (array of strings)
- FAQs (array of objects)

**Gidsen:**
- Steps (array of objects with title, content, image)

**Tools:**
- Tool Component (dropdown selection)
- Tool Configuration (optional)

**Vergelijking:**
- Products (array of product objects)
- Table Headers (optional)
- Table Rows (optional)

**Kennisbank:**
- Definition (short definition text)

## MDX Content Tips

### Basic Markdown

```mdx
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*

- List item 1
- List item 2

1. Numbered item 1
2. Numbered item 2

[Link text](https://example.com)
```

### HTML in MDX

You can use HTML directly:

```html
<div class="custom-class">
  <p>Custom HTML content</p>
</div>
```

### Images

```mdx
![Alt text](/images/path/to/image.jpg)
```

## Best Practices

1. **Use descriptive titles**: Titles become URL slugs
2. **Fill SEO fields**: Improves search visibility
3. **Add keywords**: Helps with internal linking
4. **Use featured images**: Improves visual appeal
5. **Keep content organized**: Use proper headings
6. **Test after saving**: Verify page renders correctly

## Troubleshooting

### Can't access admin
- Check `.env.local` exists with `KEYSTATIC_SECRET`
- Restart dev server after creating `.env.local`
- Clear browser cache

### Content not saving
- Check browser console for errors
- Verify all required fields are filled
- Check network tab for API errors

### Images not uploading
- Check disk space
- Verify image directory permissions
- Check file size limits

### Pages not rendering
- Verify content files exist in `src/content/`
- Check slug matches URL
- Verify collection name matches route
- Check browser console for errors

## Production Deployment

### Environment Variables

Set in your hosting platform:
- `KEYSTATIC_SECRET`: Your secret key

### GitHub OAuth (Optional)

For GitHub-based storage:
1. Create GitHub OAuth app
2. Add to `.env.local`:
   ```
   KEYSTATIC_GITHUB_CLIENT_ID=your-client-id
   KEYSTATIC_GITHUB_CLIENT_SECRET=your-client-secret
   ```
3. Update `keystatic.config.ts` to use GitHub storage

### Build Process

Keystatic works with static builds:
- Content is generated at build time
- Admin interface requires server (use Vercel/Netlify serverless functions)
- Or use local storage for static builds

## Support

For issues:
1. Check Keystatic documentation: https://keystatic.com
2. Check Astro documentation: https://astro.build
3. Review error messages in browser console
4. Check build logs



