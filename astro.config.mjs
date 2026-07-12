// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// Salvium official site. Static-site generator with React islands for the
// interactive bits (canvas effects, copy-to-clipboard, blog search). Deploys
// to GitHub Pages — same model the Jekyll site used, no Vercel needed.
//
// Two deploy targets:
//   - Preview (default): https://zarcg.github.io/salvium-site/
//   - Production:        https://salvium.io  (set SITE_URL + SITE_BASE in CI
//                        when ready to cut over)
//
// The deploy.yml workflow flips between them by setting env vars before the
// build step, so the same config produces both bundles unchanged.
const SITE = process.env.SITE_URL ?? 'https://zarcg.github.io';
const BASE = process.env.SITE_BASE ?? '/salvium-site';

export default defineConfig({
  site: SITE,
  base: BASE,
  // Trailing slash matches Jekyll's `permalink: pretty` behaviour. URLs like
  // /blog/foo/ should resolve identically to /blog/foo so old links keep
  // working without per-page redirects.
  trailingSlash: 'ignore',
  build: {
    // Each route becomes a directory with index.html so URL semantics match
    // Jekyll exactly — /about/ and /about both serve the same page.
    format: 'directory',
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/draft/'),
    }),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
