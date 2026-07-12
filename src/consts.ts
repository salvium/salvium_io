// Site-wide constants imported anywhere via `import { SITE_TITLE } from '~/consts'`.
// Keep this file tiny — it's loaded everywhere, including in <head>.

export const SITE_TITLE = 'Salvium';
export const SITE_TAGLINE = 'The Future of Private DeFi';
export const SITE_DESCRIPTION =
  "Salvium is the industry's first Layer 1 PoW privacy blockchain that balances enhanced privacy, regulatory compatibility, and private DeFi.";
export const SITE_URL = 'https://salvium.io';

// Brand colours used by the site. Mirrored in tailwind theme tokens (global.css)
// so JS-side code (charts, canvas, etc.) can read the same values.
export const BRAND = {
  teal: '#00bfa5',
  tealLight: '#40E0D0',
  bgDark: '#1e1e1e',
  bgDarker: '#0B272C',
} as const;
