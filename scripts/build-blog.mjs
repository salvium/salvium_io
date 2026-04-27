// Build step: reads every .md file in ./_posts/ and writes
// src/data/blog-posts.js so the React app has the full archive at build time.
//
//   node scripts/build-blog.mjs
//
// Wired into `npm run build` via the "prebuild" script in package.json so
// every deploy automatically picks up new posts.
//
// To publish a post:
//   1. Add a new file to _posts/ named YYYY-MM-DD-slug.md
//   2. Add Jekyll-style frontmatter (title, date, categories, image, excerpt)
//   3. Commit & push. Done.

import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'

const POSTS_DIR = path.resolve('_posts')
const OUT       = path.resolve('src/data/blog-posts.js')
// Image paths in markdown stay relative (e.g. /images/blog/foo.webp) and
// resolve out of public/images/ once the site is hosted at salvium.io.

// ── frontmatter parser ───────────────────────────────────────────────────────
// Throws on malformed frontmatter so a bad post fails the build loudly
// instead of silently shipping a "post" with garbage meta and the raw `---`
// markers in its body.
//
// Supported: simple key: value pairs (single-line strings, optionally
// quoted). Multi-line YAML, lists, and block scalars (|, >) are explicitly
// rejected — the build will fail with the offending filename and line so the
// author can simplify or quote the value.
function parseFrontmatter(raw, filename) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw)
  if (!m) {
    throw new Error(
      `[build-blog] ${filename}: missing or malformed frontmatter (expected --- delimited block at top of file)`
    )
  }
  const meta = {}
  const lines = m[1].split(/\r?\n/)
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (!line.trim()) continue
    // Reject YAML constructs we don't support, with a clear pointer to the
    // exact line so the author can fix it instead of getting silent garbage.
    if (/^\s*-\s/.test(line)) {
      throw new Error(
        `[build-blog] ${filename}:${i + 1}: YAML lists not supported in frontmatter (line: ${line.trim()})`
      )
    }
    if (/[:]\s*[|>]\s*$/.test(line)) {
      throw new Error(
        `[build-blog] ${filename}:${i + 1}: YAML block scalars (|, >) not supported (line: ${line.trim()})`
      )
    }
    const km = /^([A-Za-z_][A-Za-z0-9_-]*)\s*:\s*(.*)$/.exec(line)
    if (!km) {
      throw new Error(
        `[build-blog] ${filename}:${i + 1}: malformed frontmatter line (expected "key: value", got "${line}")`
      )
    }
    let v = km[2].trim()
    if ((v.startsWith('"') && v.endsWith('"') && v.length >= 2) ||
        (v.startsWith("'") && v.endsWith("'") && v.length >= 2)) {
      v = v.slice(1, -1)
    }
    meta[km[1]] = v
  }
  return { meta, body: m[2].trim() }
}

const slugFromFilename = (n) => n.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\s*\.md$/i, '').trim()
const dateFromFilename = (n) => (/^(\d{4}-\d{2}-\d{2})/.exec(n) || [])[1] || ''

// Cover image: keep absolute external URLs as-is, otherwise leave relative
// so it resolves from the site's own /images/ directory.
const normaliseImage = (src) => {
  if (!src) return ''
  if (/^https?:\/\//.test(src)) return src
  return src.startsWith('/') ? src : '/' + src
}

// Body: leave relative paths alone — they resolve same-origin from public/.
const rewriteBody = (body) => body

function deriveExcerpt(body, fallback = '') {
  if (fallback) return fallback
  const firstPara = body
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .find((p) => p && !p.startsWith('#') && !p.startsWith('!') && !p.startsWith('>'))
  if (!firstPara) return ''
  const plain = firstPara.replace(/[*_`]/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
  return plain.length > 220 ? plain.slice(0, 217).trim() + '…' : plain
}

const jsTemplate = (s) =>
  '`' + String(s).replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${') + '`'

async function main() {
  // In production builds we want every problem to fail the build; in dev we
  // tolerate a missing _posts/ so a fresh clone can run `npm run dev` without
  // having pulled the content yet. The deploy workflow always sets NODE_ENV.
  const isProd = process.env.NODE_ENV === 'production' || process.argv.includes('--strict')
  let files
  try {
    files = (await readdir(POSTS_DIR)).filter((f) => /\.md$/i.test(f))
  } catch (e) {
    if (e.code === 'ENOENT') {
      const msg = `No _posts/ directory found at ${POSTS_DIR}`
      if (isProd) throw new Error(`[build-blog] ${msg} — refusing to ship an empty blog`)
      console.warn(`[build-blog] ${msg} — emitting empty archive (dev mode).`)
      files = []
    } else {
      throw e
    }
  }

  const posts = []
  for (const file of files) {
    const raw = await readFile(path.join(POSTS_DIR, file), 'utf8')
    const { meta, body } = parseFrontmatter(raw, file)
    if (!meta.title) {
      throw new Error(`[build-blog] ${file}: missing required frontmatter field "title"`)
    }

    posts.push({
      id:       slugFromFilename(file),
      title:    meta.title,
      date:     dateFromFilename(file) || (meta.date || '').slice(0, 10),
      category: ((meta.categories || meta.category || 'Update').split(/[\s,]+/)[0]) || 'Update',
      cover:    normaliseImage(meta.image || ''),
      excerpt:  deriveExcerpt(body, meta.excerpt || ''),
      body:     rewriteBody(body),
    })
  }

  if (isProd && posts.length === 0) {
    throw new Error('[build-blog] _posts/ exists but contains zero posts — refusing to ship an empty blog')
  }

  posts.sort((a, b) => (a.date < b.date ? 1 : -1))

  const items = posts.map((p) => [
    '  {',
    `    id: ${JSON.stringify(p.id)},`,
    `    title: ${JSON.stringify(p.title)},`,
    `    date: ${JSON.stringify(p.date)},`,
    `    category: ${JSON.stringify(p.category)},`,
    `    cover: ${JSON.stringify(p.cover)},`,
    `    excerpt: ${JSON.stringify(p.excerpt)},`,
    `    body: ${jsTemplate(p.body)},`,
    '  },',
  ].join('\n'))

  const out =
    `// AUTO-GENERATED by scripts/build-blog.mjs from /_posts/*.md\n` +
    `// Do not edit by hand — edit the markdown files in /_posts/ instead.\n\n` +
    `export const SEED_POSTS = [\n${items.join('\n')}\n]\n`

  await mkdir(path.dirname(OUT), { recursive: true })
  await writeFile(OUT, out, 'utf8')
  console.log(`build-blog: wrote ${posts.length} posts → ${path.relative(process.cwd(), OUT)}`)
}

main().catch((e) => { console.error(e); process.exit(1) })
