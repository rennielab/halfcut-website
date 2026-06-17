import { defineConfig } from 'astro/config';

// Note: the public site reads Sanity at build time via @sanity/client (see src/lib/sanity.ts).
// Sanity Studio runs as its own workspace under /studio (see studio/sanity.config.ts) and is
// deployed separately to halfcut.sanity.studio. No need to mount the Studio app inside Astro.

export default defineConfig({
  site: 'https://halfcut-website.vercel.app',
  image: {
    domains: ['cdn.sanity.io'],
  },
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      cssMinify: 'lightningcss',
    },
  },
});
