// One-shot migration helper. Replaces the contents of a clone of
// `salvium/salvium_io` (the existing Jekyll site) with this Vite/React
// project, while preserving the existing _posts/, images/, and CNAME so
// blog history and asset URLs survive the cutover.
//
// Usage (from the root of THIS repo):
//
//   node scripts/migrate-into-salvium-repo.mjs <path-to-salvium_io-clone>
//   node scripts/migrate-into-salvium-repo.mjs <path-to-salvium_io-clone> --dry-run
//   node scripts/migrate-into-salvium-repo.mjs <path-to-salvium_io-clone> --yes
//
// Recommended workflow:
//
//   git clone git@github.com:salvium/salvium_io.git ../salvium_io
//   cd ../salvium_io
//   git checkout -b feature/react-rewrite
//   cd ../newsalviumsite     # this repo
//   node scripts/migrate-into-salvium-repo.mjs ../salvium_io --dry-run   # preview
//   node scripts/migrate-into-salvium-repo.mjs ../salvium_io --yes       # commit
//   cd ../salvium_io
//   npm install && npm run build       # verify
//   git add -A && git commit -m "Replace Jekyll site with Vite/React SPA"
//   git push -u origin feature/react-rewrite
//   # then open a PR against salvium/salvium_io main

import { existsSync } from 'node:fs'
import { mkdir, readdir, rm, copyFile, stat, cp, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import readline from 'node:readline/promises'

const SOURCE = path.resolve('.')                            // this repo
const args   = process.argv.slice(2)
const dry    = args.includes('--dry-run')
const yes    = args.includes('--yes')
const target = args.find((a) => !a.startsWith('--'))

if (!target) {
  console.error('Usage: node scripts/migrate-into-salvium-repo.mjs <path-to-salvium_io-clone> [--dry-run|--yes]')
  process.exit(2)
}

const TARGET = path.resolve(target)

// ── safety checks ────────────────────────────────────────────────────────────
if (TARGET === SOURCE) {
  console.error('Refusing to run: target path is this same repository.')
  process.exit(2)
}
if (!existsSync(TARGET)) {
  console.error(`Target directory does not exist: ${TARGET}`)
  process.exit(2)
}
if (!existsSync(path.join(TARGET, '.git'))) {
  console.error(`Target does not look like a git checkout (no .git directory): ${TARGET}`)
  process.exit(2)
}
// Sanity-check this really is salvium_io (Jekyll markers).
const jekyllMarkers = ['_config.yml', '_layouts', 'Gemfile']
const looksJekyll = jekyllMarkers.some((m) => existsSync(path.join(TARGET, m)))
if (!looksJekyll) {
  console.warn(`Warning: target ${TARGET} does not look like the Jekyll salvium_io repo (no _config.yml, _layouts, or Gemfile found).`)
}

// ── what to preserve from the target before wiping ───────────────────────────
const PRESERVE = ['_posts', 'images', 'docs', 'CNAME', 'LICENSE', 'README.md', '.git', '.gitignore']

// ── what NOT to copy from this source repo ───────────────────────────────────
const SOURCE_EXCLUDE = new Set(['node_modules', 'dist', '.git', '.vite', '_migration_staging'])

const STAGE = path.join(TARGET, '_migration_staging')

async function exists(p) { try { await stat(p); return true } catch { return false } }

function logStep(msg) { console.log(`\n› ${msg}`) }
function logAction(verb, p) { console.log(`  ${dry ? '[dry] ' : ''}${verb}  ${p}`) }

async function confirm() {
  if (yes || dry) return true
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  const a = await rl.question(`\nThis will REWRITE the contents of:\n  ${TARGET}\n\nProceed? (type "yes"): `)
  rl.close()
  return a.trim().toLowerCase() === 'yes'
}

async function copyDirFiltered(src, dst) {
  const entries = await readdir(src, { withFileTypes: true })
  for (const entry of entries) {
    if (SOURCE_EXCLUDE.has(entry.name)) continue
    const s = path.join(src, entry.name)
    const d = path.join(dst, entry.name)
    if (dry) { logAction('copy', path.relative(TARGET, d)); continue }
    await cp(s, d, { recursive: true, force: true })
    logAction('copy', path.relative(TARGET, d))
  }
}

async function main() {
  console.log(`\nMigration plan`)
  console.log(`  source: ${SOURCE}`)
  console.log(`  target: ${TARGET}`)
  console.log(`  mode:   ${dry ? 'DRY RUN' : 'LIVE'}\n`)

  if (!(await confirm())) { console.log('Aborted.'); return }

  // 1. Preserve content from the target into a staging dir.
  logStep(`Staging preserved content`)
  if (!dry) await mkdir(STAGE, { recursive: true })
  for (const item of PRESERVE) {
    const src = path.join(TARGET, item)
    if (!(await exists(src))) continue
    if (item === '.git' || item === '.gitignore') continue   // stays in place
    const dst = path.join(STAGE, item)
    if (dry) { logAction('stage', item); continue }
    await cp(src, dst, { recursive: true, force: true })
    logAction('stage', item)
  }

  // 2. Wipe target root EXCEPT .git and _migration_staging.
  logStep(`Wiping target root`)
  const rootEntries = await readdir(TARGET, { withFileTypes: true })
  for (const entry of rootEntries) {
    if (entry.name === '.git' || entry.name === '_migration_staging') continue
    const p = path.join(TARGET, entry.name)
    if (dry) { logAction('delete', entry.name); continue }
    await rm(p, { recursive: true, force: true })
    logAction('delete', entry.name)
  }

  // 3. Copy this React project into the target (excluding node_modules, dist, .git).
  logStep(`Copying React project from ${SOURCE}`)
  await copyDirFiltered(SOURCE, TARGET)

  // 4. Restore preserved content into the right paths.
  logStep(`Restoring preserved content into the new structure`)
  // _posts → _posts (overwrite the small seed copy from this repo with the
  //                  authoritative live one, in case they've diverged)
  if (await exists(path.join(STAGE, '_posts'))) {
    if (dry) { logAction('restore', '_posts/') } else {
      await rm(path.join(TARGET, '_posts'), { recursive: true, force: true })
      await cp(path.join(STAGE, '_posts'), path.join(TARGET, '_posts'), { recursive: true })
      logAction('restore', '_posts/')
    }
  }
  // images → public/images (so /images/foo.png URLs in markdown still resolve)
  if (await exists(path.join(STAGE, 'images'))) {
    const dst = path.join(TARGET, 'public', 'images')
    if (dry) { logAction('restore', 'public/images/ (from images/)') } else {
      await mkdir(path.dirname(dst), { recursive: true })
      await cp(path.join(STAGE, 'images'), dst, { recursive: true })
      logAction('restore', 'public/images/ (from images/)')
    }
  }
  // docs → public/docs (PDFs referenced by /papers and old absolute links)
  if (await exists(path.join(STAGE, 'docs'))) {
    const dst = path.join(TARGET, 'public', 'docs')
    if (dry) { logAction('restore', 'public/docs/ (from docs/)') } else {
      await mkdir(path.dirname(dst), { recursive: true })
      await cp(path.join(STAGE, 'docs'), dst, { recursive: true })
      logAction('restore', 'public/docs/ (from docs/)')
    }
  }
  // CNAME → public/CNAME (Vite static-copies it on build)
  if (await exists(path.join(STAGE, 'CNAME'))) {
    const dst = path.join(TARGET, 'public', 'CNAME')
    if (dry) { logAction('restore', 'public/CNAME') } else {
      await mkdir(path.dirname(dst), { recursive: true })
      await copyFile(path.join(STAGE, 'CNAME'), dst)
      logAction('restore', 'public/CNAME')
    }
  }
  // LICENSE → root (preserve attribution)
  if (await exists(path.join(STAGE, 'LICENSE'))) {
    if (dry) { logAction('restore', 'LICENSE') } else {
      await copyFile(path.join(STAGE, 'LICENSE'), path.join(TARGET, 'LICENSE'))
      logAction('restore', 'LICENSE')
    }
  }

  // 5. Tear down staging.
  logStep(`Cleaning up staging directory`)
  if (dry) logAction('rm', '_migration_staging/')
  else { await rm(STAGE, { recursive: true, force: true }); logAction('rm', '_migration_staging/') }

  // 6. Drop a migration note for the human reviewer.
  if (!dry) {
    const note = [
      '# Migration to Vite/React SPA',
      '',
      'The Jekyll site was replaced by a Vite + React 18 single-page app.',
      'The publishing workflow is unchanged: posts live in `_posts/*.md`',
      'with the same Jekyll-style frontmatter. See README.md for details.',
      '',
      `Generated: ${new Date().toISOString()}`,
      '',
    ].join('\n')
    await writeFile(path.join(TARGET, 'MIGRATION_NOTES.md'), note, 'utf8')
    logAction('write', 'MIGRATION_NOTES.md')
  }

  console.log(`\n✔ Migration ${dry ? 'preview ' : ''}complete.`)
  if (!dry) {
    console.log(`\nNext steps in ${TARGET}:`)
    console.log('  npm install')
    console.log('  npm run build      # verify dist/ looks right')
    console.log('  git add -A')
    console.log('  git commit -m "Replace Jekyll site with Vite/React SPA"')
    console.log('  git push -u origin feature/react-rewrite')
  }
}

main().catch((e) => { console.error(e); process.exit(1) })
