# CSS Styling Debug Guide

## Quick Check in Browser

### Step 1: Check Network Tab for CSS
1. Open DevTools (F12)
2. Go to **Network** tab
3. Clear the network log (🚫 icon)
4. Filter by **CSS** 
5. Refresh the page (Ctrl+R or F5)

**What to look for:**
- CSS files from `localhost:4321` (not Chrome DevTools files)
- Files should have status **200**
- Names like `index.css`, `_..._.css`, or similar
- The file size should be > 0 KB

**Note:** With Astro, CSS might be:
- Inlined in the HTML (check `<style>` tags in Elements tab)
- Or loaded as a separate `.css` file

### Step 2: Check Elements Tab
1. Right-click on any element (like a button or card)
2. Select "Inspect"
3. In the **Elements** tab, check the **Styles** panel on the right
4. Look for:
   - Tailwind utility classes (like `bg-primary-600`, `text-white`)
   - Custom classes (like `.btn-primary`, `.card`)
   - Computed styles showing actual colors/spacing

### Step 3: Check Console for Errors
1. Go to **Console** tab in DevTools
2. Look for:
   - CSS loading errors
   - PostCSS errors
   - Tailwind errors
   - Any red error messages

### Step 4: Verify CSS is Processing
In the browser console, run this JavaScript:
```javascript
// Check if Tailwind classes exist
const testEl = document.createElement('div');
testEl.className = 'bg-primary-600 text-white p-4';
document.body.appendChild(testEl);
// If you see a blue box with white text, Tailwind is working!
```

## Common Issues

### Issue 1: CSS Not Loading
**Symptoms:** Page is completely unstyled, no colors, default browser styles

**Fix:**
- Hard refresh: Ctrl + Shift + R
- Restart dev server
- Check terminal for CSS errors

### Issue 2: Tailwind Classes Not Working
**Symptoms:** Some styles work, but Tailwind utilities don't

**Fix:**
- Verify `tailwind.config.mjs` has correct `content` paths
- Check if classes are in the content paths
- Restart dev server after config changes

### Issue 3: Custom Classes Not Working
**Symptoms:** Tailwind utilities work, but `.btn-primary`, `.card` don't

**Fix:**
- Check if classes are defined in `global.css`
- Verify CSS is importing correctly
- Hard refresh browser

## Expected Visual Result

When CSS is working correctly, you should see:
- ✅ Blue buttons (primary-600 background)
- ✅ Gray buttons (neutral-200 background)  
- ✅ White cards with shadows
- ✅ Blue header/navigation
- ✅ Proper spacing between elements
- ✅ Responsive layout (changes on mobile/desktop)

## Still Not Working?

1. Check terminal output for errors
2. Verify `src/styles/global.css` exists
3. Verify Tailwind config has correct content paths
4. Try adding a simple inline style to test if CSS works at all
5. Check if other pages have the same issue


