// One-shot helper for LOCAL DEV ONLY.
//
// Scans every .md in _posts/ for image paths (frontmatter `image:` and any
// `/images/...` references in the body), then downloads those files from
// https://salvium.io into ./public/images/ so local dev preview matches
// production.
//
// In the real salvium/salvium_io repo, the images already exist at
// `images/` and the migration script copies them into `public/images/`,
// so this script is unnecessary there.
//
//   node scripts/seed-images-from-upstream.mjs

import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'

const SITE     = 'https://salvium.io'
const POSTS    = path.resolve('_posts')
const PUB      = path.resolve('public')

function parseFrontmatter(raw) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw)
  if (!m) return { meta: {}, body: raw }
  const meta = {}
  for (const line of m[1].split(/\r?\n/)) {
    const km = /^([A-Za-z_][A-Za-z0-9_-]*)\s*:\s*(.*)$/.exec(line)
    if (!km) continue
    let v = km[2].trim()
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1)
    }
    meta[km[1]] = v
  }
  return { meta, body: m[2] }
}

const refs = new Set()

async function collect() {
  const files = (await readdir(POSTS)).filter((f) => /\.md$/i.test(f))
  for (const f of files) {
    const raw = await readFile(path.join(POSTS, f), 'utf8')
    const { meta, body } = parseFrontmatter(raw)
    if (meta.image && meta.image.startsWith('/')) refs.add(meta.image)
    // Markdown image refs:  ![alt](/images/...)
    for (const m of body.matchAll(/!\[[^\]]*\]\((\/images\/[^)\s]+)\)/g)) refs.add(m[1])
    // Markdown link refs that look like images:
    for (const m of body.matchAll(/\]\((\/images\/[^)\s]+\.(?:png|jpe?g|gif|webp|svg))\)/gi)) refs.add(m[1])
  }
}

async function download(rel) {
  const url = SITE + rel
  const out = path.join(PUB, rel.replace(/^\//, ''))
  try {
    const r = await fetch(url, { headers: { 'User-Agent': 'salvium-img-seed' } })
    if (!r.ok) {
      console.warn(`  ✗ ${rel}  (HTTP ${r.status})`)
      return false
    }
    const buf = Buffer.from(await r.arrayBuffer())
    await mkdir(path.dirname(out), { recursive: true })
    await writeFile(out, buf)
    console.log(`  ✓ ${rel}  (${(buf.length / 1024).toFixed(1)} KB)`)
    return true
  } catch (e) {
    console.warn(`  ✗ ${rel}  (${e.message})`)
    return false
  }
}

async function main() {
  await collect()
  console.log(`Found ${refs.size} unique image refs across _posts/`)
  let ok = 0, fail = 0
  for (const rel of refs) {
    if (await download(rel)) ok++; else fail++
  }
  console.log(`\nDone — ${ok} downloaded, ${fail} failed.`)
}

main().catch((e) => { console.error(e); process.exit(1) })
