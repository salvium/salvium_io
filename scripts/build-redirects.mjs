// build-redirects.mjs — emit static meta-refresh stubs in dist/ for every
// legacy URL the Jekyll site exposed via jekyll-redirect-from. Without these,
// inbound links from search engines, blog posts, and old AMAs would 404 in
// the React SPA. We use real static HTML (200 OK) rather than relying on the
// 404.html SPA fallback so the redirect is fast, search-engine friendly, and
// works with JavaScript disabled.
//
// Each entry: [<old path under dist/>, <target URL>].
// Internal targets (start with '/') route inside the React app; absolute
// targets go to docs.salvium.io for the migrated knowledge base.

import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'

const REDIRECTS = [
  // Top-level legacy routes
  ['about-salvium', '/about'],
  ['road-map', '/roadmap'],
  ['exchanges', '/exchanges'],
  ['downloads', '/download'],
  ['papers', '/papers'],
  ['pools', '/pools'],
  ['engage', '/community'],
  ['brand-toolkit', '/tools'],

  // Knowledge base — root + every subpath the old site published. The docs
  // moved to docs.salvium.io with a different URL structure, so we land all
  // of these at the docs home rather than guessing per-page mappings.
  ['salvium-knowledge-base', 'https://docs.salvium.io/'],
  ['salvium-knowledge-base/about-privacy', 'https://docs.salvium.io/'],
  ['salvium-knowledge-base/asynchronous-transactions-at', 'https://docs.salvium.io/'],
  ['salvium-knowledge-base/audit-manual-validation-process', 'https://docs.salvium.io/'],
  ['salvium-knowledge-base/audits', 'https://docs.salvium.io/'],
  ['salvium-knowledge-base/calculating-current-yield', 'https://docs.salvium.io/'],
  ['salvium-knowledge-base/compliance-statement', 'https://docs.salvium.io/'],
  ['salvium-knowledge-base/daemon-rpc', 'https://docs.salvium.io/'],
  ['salvium-knowledge-base/desktop-wallet-user-guide', 'https://docs.salvium.io/'],
  ['salvium-knowledge-base/exchange-mode-in-salvium-cli-wallet', 'https://docs.salvium.io/'],
  ['salvium-knowledge-base/explorer', 'https://docs.salvium.io/'],
  ['salvium-knowledge-base/funding-and-token-allocation', 'https://docs.salvium.io/'],
  ['salvium-knowledge-base/get-started-with-salvium', 'https://docs.salvium.io/'],
  ['salvium-knowledge-base/how-to-get-involved', 'https://docs.salvium.io/'],
  ['salvium-knowledge-base/mining-and-emissions', 'https://docs.salvium.io/'],
  ['salvium-knowledge-base/project-roadmap', 'https://docs.salvium.io/'],
  ['salvium-knowledge-base/project-team-and-history', 'https://docs.salvium.io/'],
  ['salvium-knowledge-base/protocol_tx', 'https://docs.salvium.io/'],
  ['salvium-knowledge-base/salvium-litepaper', 'https://docs.salvium.io/'],
  ['salvium-knowledge-base/salvium-supply-audit', 'https://docs.salvium.io/'],
  ['salvium-knowledge-base/salvium-treasury-report-q3-2024', 'https://docs.salvium.io/'],
  ['salvium-knowledge-base/salvium-wallet-cli-user-guide', 'https://docs.salvium.io/'],
  ['salvium-knowledge-base/staking-and-yield', 'https://docs.salvium.io/'],
  ['salvium-knowledge-base/supply-and-market-cap', 'https://docs.salvium.io/'],
  ['salvium-knowledge-base/the-salvium-protocol-and-smart-contracts', 'https://docs.salvium.io/'],
  ['salvium-knowledge-base/wallet-rpc', 'https://docs.salvium.io/'],
  ['salvium-knowledge-base/what-is-salvium', 'https://docs.salvium.io/'],
]

// Build a single redirect HTML. The script preserves the query string and
// hash fragment so e.g. /downloads?utm=foo lands on /download?utm=foo.
function html(target) {
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
      // Only append qs/hash to internal targets — external docs URLs already
      // own their own query/fragment semantics and we don't want to leak them.
      if (t.charAt(0) === '/') t = t + qs + hash;
      window.location.replace(t);
    }());
  </script>
</body>
</html>
`
}

const distDir = process.argv[2] || 'dist'
let count = 0
for (const [oldPath, target] of REDIRECTS) {
  const file = join(distDir, oldPath, 'index.html')
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, html(target), 'utf-8')
  count++
}
console.log(`build-redirects: wrote ${count} redirect stubs → ${distDir}/`)
