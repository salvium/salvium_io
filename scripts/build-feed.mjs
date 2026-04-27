// build-feed.mjs — emit dist/feed.xml (RSS 2.0).
//
// The Jekyll site shipped jekyll-feed which auto-generated /feed.xml. RSS
// subscribers (and tools like Feedly, Inoreader) had that URL bookmarked.
// Without a replacement, those readers all break silently.
//
// Mirrors the post list from _posts/ and reuses the same slug/date logic
// as build-sitemap.mjs so the feed never drifts from the site.

import { readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const SITE = 'https://salvium.io'
const POSTS_DIR = path.resolve('_posts')
const OUT = path.resolve('dist/feed.xml')

const slugFromFilename = (n) => n.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\s*\.md$/i, '').trim()
const dateFromFilename = (n) => (/^(\d{4}-\d{2}-\d{2})/.exec(n) || [])[1] || ''

// XML-escape just enough for the four characters that matter inside an
// element's text content. Attribute escaping isn't needed here because we
// build URLs and dates ourselves and don't accept attribute-side input.
function xmlEscape(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function frontmatterField(raw, key) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw)
  if (!m) return ''
  const re = new RegExp(`^${key}\\s*:\\s*(.*)$`, 'm')
  const km = re.exec(m[1])
  if (!km) return ''
  let v = km[1].trim()
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    v = v.slice(1, -1)
  }
  return v
}

function rfc822(dateStr) {
  // Posts only carry ISO YYYY-MM-DD; pin them to noon UTC so feeds in any
  // timezone show the right calendar day.
  const d = dateStr ? new Date(`${dateStr}T12:00:00Z`) : new Date()
  return d.toUTCString()
}

let postFiles = []
try {
  postFiles = (await readdir(POSTS_DIR)).filter((f) => /\.md$/i.test(f))
} catch (e) {
  if (e.code === 'ENOENT') {
    console.log('build-feed: no _posts/ — skipping')
    process.exit(0)
  }
  throw e
}

postFiles.sort().reverse() // newest first

const items = []
for (const f of postFiles.slice(0, 20)) { // cap at most-recent 20, conventional for RSS
  const raw = await readFile(path.join(POSTS_DIR, f), 'utf8')
  const slug = slugFromFilename(f)
  const date = dateFromFilename(f)
  const title = frontmatterField(raw, 'title') || slug
  const excerpt = frontmatterField(raw, 'excerpt') || ''
  items.push(
    `  <item>\n` +
    `    <title>${xmlEscape(title)}</title>\n` +
    `    <link>${SITE}/blog/${slug}</link>\n` +
    `    <guid isPermaLink="true">${SITE}/blog/${slug}</guid>\n` +
    `    <pubDate>${rfc822(date)}</pubDate>\n` +
    (excerpt ? `    <description>${xmlEscape(excerpt)}</description>\n` : '') +
    `  </item>`
  )
}

const lastBuild = rfc822(new Date().toISOString().slice(0, 10))
const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n` +
  `<channel>\n` +
  `  <title>Salvium</title>\n` +
  `  <link>${SITE}/blog</link>\n` +
  `  <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml"/>\n` +
  `  <description>Releases, cryptography, compliance, and field notes from the Salvium team.</description>\n` +
  `  <language>en</language>\n` +
  `  <lastBuildDate>${lastBuild}</lastBuildDate>\n` +
  items.join('\n') + '\n' +
  `</channel>\n` +
  `</rss>\n`

await writeFile(OUT, xml, 'utf8')
console.log(`build-feed: wrote ${items.length} items → ${path.relative(process.cwd(), OUT)}`)
