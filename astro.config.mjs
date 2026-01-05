import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://noodpakketcenter.nl', // Update with actual domain
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false, // We use our custom global.css
    }),
    sitemap(),
    keystatic(), // Keystatic CMS integration
  ],
  output: 'server',
  adapter: vercel(),
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    resolve: {
      alias: {
        '@': new URL('./src', import.meta.url).pathname,
        '@components': new URL('./src/components', import.meta.url).pathname,
        '@layouts': new URL('./src/layouts', import.meta.url).pathname,
        '@lib': new URL('./src/lib', import.meta.url).pathname,
        '@content': new URL('./src/content', import.meta.url).pathname,
      },
    },
  },
});
