// fetch-releases.mjs — pull the latest release manifest from
// salvium/salvium-gui and salvium/salvium at build time and write it to
// src/data/releases.json. This replaces the React rewrite's runtime
// useLatestRelease hook, which silently failed under GitHub's
// 60-req/hr/IP unauthenticated rate limit and ended up caching the
// fallback "open releases page" URL — the root cause of the Discord
// "broken downloads" complaints.
//
// Build-time fetch runs once per deploy (not per visitor), so:
//   - Rate limits are effectively impossible.
//   - Per-asset SHA256 digests come straight from the API and end up in
//     the rendered HTML, no client-side fetch.
//   - If the API DOES fail (network blip, 5xx), we keep the previous
//     releases.json so the build doesn't break or silently regress.

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const OUT = path.resolve('src/data/releases.json');

// Filename patterns per OS, in priority order — first match wins. Carries
// the same priority logic from the React rewrite audit so a Linux ARM64
// or Mac x86_64 user gets a real binary instead of the releases page.
const WALLET_PATTERNS = {
  windows: [/windows-x64.*\.zip$/i, /win.*\.zip$/i],
  macos:   [/\.dmg$/i, /macos.*\.zip$/i],
  linux:   [/linux-x64.*\.zip$/i, /linux-x86_64.*\.zip$/i, /linux.*\.zip$/i],
};
const CLI_PATTERNS = {
  windows: [/win64.*\.zip$/i],
  macos:   [/macos-(aarch64|arm64).*\.zip$/i, /macos-x86_64.*\.zip$/i],
  linux:   [/linux-x86_64.*\.zip$/i, /linux-aarch64.*\.zip$/i],
};

const REPOS = [
  { key: 'wallet', owner: 'salvium', repo: 'salvium-gui', patterns: WALLET_PATTERNS, fallbackUrl: 'https://github.com/salvium/salvium-gui/releases/latest' },
  { key: 'cli',    owner: 'salvium', repo: 'salvium',     patterns: CLI_PATTERNS,    fallbackUrl: 'https://github.com/salvium/salvium/releases/latest' },
];

async function fetchRelease(owner, repo) {
  const url = `https://api.github.com/repos/${owner}/${repo}/releases/latest`;
  const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'salvium-site-build' };
  // GitHub gives 5000 req/hr authenticated, 60 unauthenticated — even one
  // GH_TOKEN bumps us into the safe band. Workflows already set this for
  // their own gh CLI; reusing it costs nothing.
  if (process.env.GH_TOKEN || process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GH_TOKEN || process.env.GITHUB_TOKEN}`;
  }
  const r = await fetch(url, { headers });
  if (!r.ok) throw new Error(`GitHub API ${r.status} ${r.statusText} for ${owner}/${repo}`);
  return r.json();
}

function pickAsset(assets, patterns) {
  // Returns the first asset whose name matches any of the patterns in
  // priority order. The asset's digest comes back as "sha256:<hex>" from
  // the API; we strip the prefix so callers can render "SHA256: <hex>"
  // alongside the download link without parsing.
  for (const re of patterns) {
    const hit = assets.find((a) => re.test(a.name));
    if (hit) {
      const sha = (hit.digest || '').replace(/^sha256:/i, '');
      return {
        name: hit.name,
        url: hit.browser_download_url,
        sha256: sha || null,
        size: hit.size,
      };
    }
  }
  return null;
}

async function loadExisting() {
  // If the network fetch fails we want to fall back to whatever is already
  // committed so the build still produces a working site. Return an empty
  // object if there's no prior file.
  try {
    return JSON.parse(await readFile(OUT, 'utf8'));
  } catch (e) {
    if (e.code === 'ENOENT') return {};
    throw e;
  }
}

const existing = await loadExisting();
const result = { generatedAt: new Date().toISOString(), products: {} };

let anyFailed = false;
for (const { key, owner, repo, patterns, fallbackUrl } of REPOS) {
  try {
    const release = await fetchRelease(owner, repo);
    const product = {
      version: release.tag_name,
      releasedAt: release.published_at,
      releaseUrl: release.html_url || fallbackUrl,
      platforms: {},
    };
    for (const os of Object.keys(patterns)) {
      product.platforms[os] = pickAsset(release.assets || [], patterns[os]);
    }
    result.products[key] = product;
    console.log(`fetch-releases: ${owner}/${repo} → ${release.tag_name} (${Object.keys(product.platforms).filter((k) => product.platforms[k]).length} platforms resolved)`);
  } catch (err) {
    anyFailed = true;
    console.warn(`fetch-releases: ${owner}/${repo} failed: ${err.message}`);
    if (existing.products?.[key]) {
      console.warn(`fetch-releases: ${owner}/${repo} reusing previous release data from disk`);
      result.products[key] = existing.products[key];
    } else {
      console.warn(`fetch-releases: ${owner}/${repo} no prior data, emitting fallback link only`);
      result.products[key] = {
        version: null,
        releasedAt: null,
        releaseUrl: fallbackUrl,
        platforms: { windows: null, macos: null, linux: null },
      };
    }
  }
}

await mkdir(path.dirname(OUT), { recursive: true });
await writeFile(OUT, JSON.stringify(result, null, 2) + '\n', 'utf8');
console.log(`fetch-releases: wrote → ${path.relative(process.cwd(), OUT)}`);

// Don't fail the build on partial fetch failure — fallback data lets the
// site still ship; CI smoke check will catch a fully empty manifest.
if (anyFailed) process.exitCode = 0;
