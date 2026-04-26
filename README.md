# Salvium — Publishing Blog Posts

Blog posts on this site are plain markdown files in [`_posts/`](./_posts).
At build time, [`scripts/build-blog.mjs`](./scripts/build-blog.mjs) parses
every `.md` file in that folder and writes `src/data/blog-posts.js`, which
the React app reads.

There is **no admin login** and no database. Publishing = committing a new
markdown file to this repo. Whoever has push access can publish.

## To publish a new post

1. Create a new file in `_posts/` named `YYYY-MM-DD-slug.md`
   (e.g. `2026-05-01-new-feature.md`).
2. Add Jekyll-style frontmatter at the top, then your markdown body:

   ```markdown
   ---
   layout: post
   title: "Your post title"
   date: 2026-05-01 10:00:00 +0200
   categories: Updates
   image: /images/blog/your-cover.webp
   excerpt: "Short summary that appears on cards and previews."
   ---

   Your markdown body goes here.

   ## Subheading

   - bullet
   - bullet
   ```

   Frontmatter fields:

   | Field        | Required | Notes                                                      |
   | ------------ | -------- | ---------------------------------------------------------- |
   | `title`      | yes      | Shown on cards and at the top of the post                  |
   | `date`       | yes      | `YYYY-MM-DD` — also taken from the filename if omitted     |
   | `categories` | no       | Single word; used for the sidebar filter (e.g. `Updates`)  |
   | `image`      | no       | Cover image path; absolute URLs work too                   |
   | `excerpt`    | no       | If omitted, the first paragraph is used                    |

3. Commit and push. GitHub Actions rebuilds the site and the post goes live.

## To edit or delete a post

Edit or delete the corresponding `.md` file in `_posts/`, commit, push.

## Local preview

```powershell
npm install
npm run dev
```

Then open <http://localhost:5173>. The dev server regenerates `blog-posts.js`
on start, so any edits to `_posts/*.md` are picked up after a refresh.
