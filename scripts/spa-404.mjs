// Copies dist/index.html → dist/404.html so GitHub Pages serves the SPA
// shell for unknown routes (/blog, /about, etc.). Without this, refreshing
// any non-root route would 404.
import { copyFile } from 'node:fs/promises'
import path from 'node:path'

const src = path.resolve('dist/index.html')
const dst = path.resolve('dist/404.html')
await copyFile(src, dst)
console.log(`spa-404: copied ${path.relative(process.cwd(), src)} → ${path.relative(process.cwd(), dst)}`)
