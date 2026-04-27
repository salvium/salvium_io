// build-blog-stubs.mjs — emit per-post entries under dist/blog/.
//
// Two outputs per post:
//
// 1. CANONICAL: dist/blog/<slug>/index.html — copy of the SPA shell.
//    Without this, GitHub Pages 404s on /blog/<slug> URLs and falls back
//    to 404.html. The SPA still routes correctly, but the HTTP status is
//    404 which hurts SEO indexing and confuses link-preview crawlers.
//    A real index.html means the URL returns 200.
//
// 2. LEGACY PERMALINK: dist/blog/YYYY/MM/DD/<slug>/index.html — meta-refresh
//    redirect to /blog/<slug>. The original Jekyll site used
//    `permalink: /blog/:year/:month/:day/:title/`, and those URLs are
//    linked from Twitter, AMAs, audit reports, and old blog posts. The
//    React app uses slug-only URLs now, so the dated permalinks would
//    404 without these redirects.
//
// (Per-post meta tags on the canonical page would be better SEO; that
// requires real prerendering and is filed for follow-up.)

import { readdir, mkdir, copyFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const POSTS_DIR = path.resolve('_posts')
const SHELL = path.resolve('dist/index.html')
const OUT_DIR = path.resolve('dist/blog')

const slugFromFilename = (n) => n.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\s*\.md$/i, '').trim()
const dateFromFilename = (n) => /^(\d{4})-(\d{2})-(\d{2})/.exec(n)

// Meta-refresh + JS redirect. Identical contract to build-redirects.mjs;
// duplicated here so each script remains independently runnable. Internal
// targets get qs/hash appended at runtime so any tracking parameters on the
// inbound link are preserved across the redirect.
function redirectHtml(target) {
  const safeTarget = target.replace(/"/g, '&quot;')
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0; URL=${safeTarget}">
  <link rel="canonical" href="${safeTarget}">
  <meta name="robots" content="noindex">
  <title>Redirecting&hellip;</title>
</head>
<body>
  <p>Redirecting to <a href="${safeTarget}">${safeTarget}</a>&hellip;</p>
  <script>
    (function () {
      var t = ${JSON.stringify(target)};
      var qs = window.location.search || '';
      var hash = window.location.hash || '';
      if (t.charAt(0) === '/') t = t + qs + hash;
      window.location.replace(t);
    }());
  </script>
</body>
</html>
`
}

let postFiles = []
try {
  postFiles = (await readdir(POSTS_DIR)).filter((f) => /\.md$/i.test(f))
} catch (e) {
  if (e.code === 'ENOENT') {
    console.log('build-blog-stubs: no _posts/ directory, skipping')
    process.exit(0)
  }
  throw e
}

let canonicalCount = 0
let legacyCount = 0
for (const f of postFiles) {
  const slug = slugFromFilename(f)
  if (!slug) continue
  const canonicalPath = `/blog/${slug}`

  // 1. Canonical SPA stub at /blog/<slug>/
  const modernDir = path.join(OUT_DIR, slug)
  await mkdir(modernDir, { recursive: true })
  await copyFile(SHELL, path.join(modernDir, 'index.html'))
  canonicalCount++

  // 2. Jekyll-style dated permalink redirect at /blog/YYYY/MM/DD/<slug>/
  const dm = dateFromFilename(f)
  if (dm) {
    const [, yyyy, mm, dd] = dm
    const legacyDir = path.join(OUT_DIR, yyyy, mm, dd, slug)
    await mkdir(legacyDir, { recursive: true })
    await writeFile(path.join(legacyDir, 'index.html'), redirectHtml(canonicalPath), 'utf8')
    legacyCount++
  }
}
console.log(`build-blog-stubs: wrote ${canonicalCount} canonical + ${legacyCount} legacy permalink stubs → dist/blog/`)
