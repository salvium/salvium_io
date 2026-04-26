// Generates dist/sitemap.xml from the static SPA routes plus every blog post
// in _posts/. Runs in `postbuild` so it can write straight into the deploy.
import { readdir, writeFile, stat } from 'node:fs/promises'
import path from 'node:path'

const SITE = 'https://salvium.io'
const POSTS_DIR = path.resolve('_posts')
const OUT = path.resolve('dist/sitemap.xml')

const STATIC_ROUTES = [
  '/',
  '/about',
  '/blog',
  '/faq',
  '/papers',
  '/tools',
  '/exchanges',
  '/pools',
]

const slugFromFilename = (n) => n.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\s*\.md$/i, '').trim()
const dateFromFilename = (n) => (/^(\d{4}-\d{2}-\d{2})/.exec(n) || [])[1] || ''

async function main() {
  let postFiles = []
  try {
    postFiles = (await readdir(POSTS_DIR)).filter((f) => /\.md$/i.test(f))
  } catch (e) {
    if (e.code !== 'ENOENT') throw e
  }

  const today = new Date().toISOString().slice(0, 10)

  const urls = [
    ...STATIC_ROUTES.map((r) => ({ loc: SITE + r, lastmod: today })),
    ...postFiles.map((f) => ({
      loc: `${SITE}/blog#${slugFromFilename(f)}`,
      lastmod: dateFromFilename(f) || today,
    })),
  ]

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map(
        ({ loc, lastmod }) =>
          `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod></url>`,
      )
      .join('\n') +
    `\n</urlset>\n`

  await writeFile(OUT, xml, 'utf8')
  console.log(`build-sitemap: wrote ${urls.length} URLs → ${path.relative(process.cwd(), OUT)}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
