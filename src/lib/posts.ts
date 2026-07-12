// Helpers for working with the blog collection. Centralised so the slug-
// extraction and date-derivation logic is identical across the post pages,
// the index, the RSS feed, and the redirect generator.

import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import { href } from './href';

export interface ResolvedPost {
  /** Original collection entry (still needed by render()). */
  entry: CollectionEntry<'blog'>;
  /** URL slug WITHOUT the date prefix — e.g. "salvium-assets-hard-fork". */
  slug: string;
  /** Resolved publication date — frontmatter wins, falls back to filename. */
  date: Date;
  /** Single normalised category string. */
  category: string;
  /** Permalink path under the site root. */
  href: string;
  /** Optional Jekyll-style legacy permalink for backward compat. */
  legacyHref: string | null;
  /** Estimated reading time in minutes (200 wpm), minimum 1. */
  readingMinutes: number;
}

const FILENAME_DATE_RE = /^(\d{4})-(\d{2})-(\d{2})-(.+)$/;

export function resolvePost(entry: CollectionEntry<'blog'>): ResolvedPost {
  // entry.id is the path stem (e.g. "2026-03-24-salvium-assets-hard-fork").
  // The Jekyll filename convention encodes the publish date — use it to
  // derive the URL slug AND fall back as the post date if frontmatter
  // doesn't set one. Some files have a stray space before .md (already
  // present in two existing posts); the .trim() defensively handles that.
  const m = FILENAME_DATE_RE.exec(entry.id.trim());
  if (!m) {
    // Filename without a date prefix — fall back to today's date and the
    // raw filename as the slug. Should not happen for production posts.
    const today = new Date();
    const yyyy = String(today.getUTCFullYear());
    const mm = String(today.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(today.getUTCDate()).padStart(2, '0');
    return {
      entry,
      slug: entry.id,
      date: entry.data.date ?? today,
      category: pickCategory(entry),
      href: href(`/blog/${yyyy}/${mm}/${dd}/${entry.id}/`),
      legacyHref: null,
      readingMinutes: readingMinutes(entry),
    };
  }
  const [, yyyy, mm, dd, slug] = m;
  const fallbackDate = new Date(`${yyyy}-${mm}-${dd}T12:00:00Z`);
  // Canonical URL is Jekyll-style (matches the existing live site so
  // Twitter / AMA / external links stay valid). The legacy slug-only form
  // (`/blog/<slug>/`) is no longer emitted — Phase 1 used it briefly but
  // we never published the preview as canonical, so no redirect needed.
  return {
    entry,
    slug,
    date: entry.data.date ?? fallbackDate,
    category: pickCategory(entry),
    href: href(`/blog/${yyyy}/${mm}/${dd}/${slug}/`),
    legacyHref: null,
    readingMinutes: readingMinutes(entry),
  };
}

function pickCategory(entry: CollectionEntry<'blog'>): string {
  // Some posts use `category`, others `categories` (often space-separated).
  // Take the first token of whichever exists, default to "Update".
  const raw = entry.data.category || entry.data.categories || '';
  return raw.split(/[\s,]+/).filter(Boolean)[0] || 'Update';
}

function readingMinutes(entry: CollectionEntry<'blog'>): number {
  // 200 wpm is the conventional read-time estimate for prose. The
  // collection's body is the raw markdown including frontmatter-stripped
  // content; that's close enough to a word count for a marketing site.
  // Astro content entries expose the raw body via .body.
  const text = (entry.body ?? '').replace(/[#*_`>!\-\[\]\(\)]/g, ' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export async function getResolvedPosts(): Promise<ResolvedPost[]> {
  const entries = await getCollection('blog');
  return entries
    .map(resolvePost)
    .sort((a, b) => b.date.valueOf() - a.date.valueOf());
}
