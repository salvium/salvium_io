// Internal-link helper. Astro doesn't automatically rewrite <a href="/foo">
// to include the configured `base`, so links written as raw absolute paths
// would 404 on a preview deploy at /salvium-site/. Routing through href()
// keeps the same source working for both /salvium-site/foo (preview) and
// /foo (production with CNAME).
//
// External URLs and anchor-only hrefs pass through unchanged.

const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

export function href(path: string): string {
  if (!path) return path;
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('//')) {
    return path;
  }
  if (path.startsWith('#')) return path;
  if (!path.startsWith('/')) return path;
  return BASE + path;
}
