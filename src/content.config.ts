import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Schema accepts the existing Jekyll-style frontmatter so we can drop the
// _posts/*.md files in here unchanged. Filenames follow YYYY-MM-DD-slug.md;
// the date is derived from the filename so authors don't need to repeat it
// in the frontmatter.
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    // Optional; falls back to filename date. Accept the various date forms
    // Jekyll wrote over the years (ISO dates, "MMM DD YYYY", with/without
    // time). z.coerce.date() handles all of them.
    date: z.coerce.date().optional(),
    excerpt: z.string().optional(),
    // Image is a runtime path string (e.g. "/images/blog/foo.webp"), NOT an
    // imported asset. Astro's image() helper would expect a relative import;
    // these posts use absolute paths served from public/.
    image: z.string().optional(),
    // Some posts use `category`, others `categories`. Accept either; the
    // dynamic route normalises to a single category.
    category: z.string().optional(),
    categories: z.string().optional(),
    // Jekyll boilerplate we ignore but tolerate so existing files don't fail
    // schema validation.
    layout: z.string().optional(),
    redirect_from: z.array(z.string()).optional(),
  }),
});

export const collections = { blog };
