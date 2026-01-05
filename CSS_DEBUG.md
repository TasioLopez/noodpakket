# CSS Debugging Guide

## What to Check in Browser DevTools

### Network Tab
1. Open DevTools (F12)
2. Go to **Network** tab
3. Filter by **CSS** (click the CSS filter)
4. Refresh the page
5. Look for CSS files being loaded

**You should see:**
- A CSS file with a name like `_..._.css` or `index.css` or similar
- Status should be **200** (success)
- The file should be from `localhost:4321`

**If you DON'T see a CSS file:**
- The CSS might be inlined (check the HTML source)
- Or CSS isn't loading at all

### Elements Tab
1. Inspect any element on the page
2. Look at the **Computed** styles
3. Check if Tailwind classes are being applied

**You should see:**
- Colors like `rgb(0, 115, 230)` for primary-600
- Spacing classes working
- Typography classes working

### Console Tab
1. Check for any CSS errors
2. Look for PostCSS or Tailwind errors

## Expected CSS Behavior

When CSS is working correctly:
- ✅ Header should have white background (`bg-white`)
- ✅ Buttons should be blue (`bg-primary-600`)
- ✅ Cards should have shadows and borders
- ✅ Text should have proper spacing and typography
- ✅ Colors from our custom palette should be visible

## Quick Test

Add this to any page to test if CSS is working:
```html
<div style="background: red; padding: 20px; color: white;">
  If you see this styled, CSS is loading
</div>
```

If inline styles work but Tailwind classes don't, then Tailwind isn't processing correctly.


