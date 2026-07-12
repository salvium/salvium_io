// RSS feed at /rss.xml. Mirrors the post list with clean URLs and resolved
// dates so subscribers see the same data as the on-site blog.
import rss from '@astrojs/rss';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';
import { getResolvedPosts } from '../lib/posts';

export async function GET(context) {
  const posts = await getResolvedPosts();
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      title: post.entry.data.title,
      description: post.entry.data.excerpt ?? '',
      pubDate: post.date,
      link: post.href,
      categories: [post.category],
    })),
  });
}
