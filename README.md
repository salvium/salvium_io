# Salvium site (Astro)

Successor to [`salvium/salvium_io`](https://github.com/salvium/salvium_io). Astro
static-site generator with React islands for the interactive bits, deployed to
GitHub Pages.

**Why Astro:** the Jekyll site had the right architecture (static HTML, free
SEO, real permalinks, drop-a-markdown-file-to-publish) but a dated visual
identity. The React rewrite had the right design but had to bolt on five build
scripts to recreate Jekyll's built-in features and shipped a 522 KB JS bundle
to do mostly-static work. Astro gives us Jekyll's publishing model + React's
component ergonomics + a fraction of the JavaScript.

## Local development

```sh
npm install
npm run dev          # http://localhost:4321/salvium-site/
npm run build        # production build to ./dist/
npm run preview      # serve the built dist locally
```

## Publishing a blog post

1. Add a markdown file to `src/content/blog/` named `YYYY-MM-DD-slug.md`.
2. Add Jekyll-compatible frontmatter:
   ```yaml
   ---
   title: "Your post title"
   date: 2026-04-29
   excerpt: "One-paragraph summary that shows in /blog and as og:description."
   image: /images/blog/your-cover.webp
   category: Update
   ---
   ```
3. Body in normal markdown.
4. `git push`. The deploy workflow rebuilds and ships.

The dynamic route at `src/pages/blog/[...slug].astro` strips the date prefix
from the filename, so the URL is `/blog/<slug>/` even though the file is named
with a date.

## Project structure

```text
src/
├── components/   # Header, Footer, FormattedDate, BaseHead
├── content/
│   └── blog/     # Markdown posts (Jekyll-compatible frontmatter)
├── layouts/      # Layout.astro, BlogPost.astro
├── lib/          # posts.ts (collection helpers), href.ts (URL helper)
├── pages/        # File-based routes
│   ├── index.astro
│   ├── blog/
│   │   ├── index.astro
│   │   └── [...slug].astro
│   └── rss.xml.js
├── styles/global.css
└── consts.ts
```

## Two deploy targets

The Astro `site` and `base` come from environment variables so the same code
ships to both targets:

| Target     | `SITE_URL`                  | `SITE_BASE`     | Public URL                                  |
|------------|-----------------------------|-----------------|---------------------------------------------|
| Preview    | `https://zarcg.github.io`   | `/salvium-site` | https://zarcg.github.io/salvium-site/       |
| Production | `https://salvium.io`        | `/`             | https://salvium.io  (after CNAME cutover)   |

The deploy workflow (`.github/workflows/deploy.yml`) defaults to preview. To
cut over: trigger `workflow_dispatch` with the production values, drop a
`CNAME` file in `public/`, and switch DNS.

## Status

Phase 1 (this commit): scaffold + content migration + base layout + homepage
shell + blog. Secondary pages (about, donate, exchanges, faq, papers, pools,
tools) and the full home-page sections (stats, tokenomics, roadmap, products,
community) port across in subsequent commits.
