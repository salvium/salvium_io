// One-shot migration: pulls every .md file from
// https://github.com/salvium/salvium_io/tree/main/_posts and writes them
// verbatim into ./_posts/ so they live in *this* repo from now on.
//
//   node scripts/seed-posts-from-upstream.mjs
//
// After this runs once, you don't need it again. Editing posts = editing
// the .md files in this repo.

import { writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'

const REPO_API = 'https://api.github.com/repos/salvium/salvium_io/contents/_posts'
const RAW_BASE = 'https://raw.githubusercontent.com/salvium/salvium_io/main/_posts/'
const OUT_DIR = path.resolve('_posts')

async function fetchJSON(url) {
  const r = await fetch(url, { headers: { 'User-Agent': 'salvium-seed' } })
  if (!r.ok) throw new Error(`${url} → ${r.status}`)
  return r.json()
}
async function fetchText(url) {
  const r = await fetch(url, { headers: { 'User-Agent': 'salvium-seed' } })
  if (!r.ok) throw new Error(`${url} → ${r.status}`)
  return r.text()
}

await mkdir(OUT_DIR, { recursive: true })
const list = await fetchJSON(REPO_API)
console.log(`Found ${list.length} posts in upstream repo.`)

for (const file of list) {
  if (!/\.md\s*$/i.test(file.name)) continue
  const safeName = file.name.replace(/\s+\.md$/i, '.md').trim()
  const raw = await fetchText(RAW_BASE + encodeURIComponent(file.name))
  await writeFile(path.join(OUT_DIR, safeName), raw, 'utf8')
  console.log(`  · ${safeName}`)
}

console.log(`\nWrote ${list.length} files into ${path.relative(process.cwd(), OUT_DIR)}`)
