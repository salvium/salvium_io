// build-blog-stubs.mjs — emit dist/blog/<slug>/index.html for every post.
//
// Without these, GitHub Pages would 404 on /blog/<slug> URLs and fall back
// to 404.html (the SPA shell). The SPA still routes correctly, but the HTTP
// response code is 404, which (a) hurts SEO indexing of individual posts and
// (b) confuses some link-preview crawlers that won't fetch the body of a 404.
//
// Each stub is a copy of the freshly-built dist/index.html — i.e. the SPA
// shell — so the SPA loads, reads the URL, and renders the post. The HTTP
// status is now 200 because the file exists.
//
// (Per-post meta tags would be better SEO; that requires real prerendering
// which is a bigger change. Filed for follow-up.)

import { readdir, mkdir, copyFile } from 'node:fs/promises'
import path from 'node:path'

const POSTS_DIR = path.resolve('_posts')
const SHELL = path.resolve('dist/index.html')
const OUT_DIR = path.resolve('dist/blog')

const slugFromFilename = (n) => n.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\s*\.md$/i, '').trim()

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

let count = 0
for (const f of postFiles) {
  const slug = slugFromFilename(f)
  if (!slug) continue
  const dir = path.join(OUT_DIR, slug)
  await mkdir(dir, { recursive: true })
  await copyFile(SHELL, path.join(dir, 'index.html'))
  count++
}
console.log(`build-blog-stubs: wrote ${count} blog post stubs → dist/blog/`)
