import { sitePath } from './site-path';

const NEWS_RAW_BASE = 'https://raw.githubusercontent.com/Crew-Awesome/weekbox.news/main/content/news';

async function getJson(url) {
  const response = await fetch(url, { cache: 'force-cache' });
  return response.ok ? response.json() : null;
}

async function getText(url) {
  const response = await fetch(url, { cache: 'force-cache' });
  return response.ok ? response.text() : '';
}

function postUrl(slug, file) {
  const suffix = file ? `/${file.replace(/^\/+|\/+$/g, '')}` : '';
  return `${NEWS_RAW_BASE}/posts/${slug}${suffix}`;
}

function assetUrl(slug, path) {
  if (!path) return sitePath('/assets/images/banner.webp');
  return new URL(path.replace(/^\.\//, ''), `${postUrl(slug)}/`).toString();
}

function isPublished(value) {
  const time = Date.parse(value || '');
  return Number.isFinite(time) && time <= Date.now();
}

export async function getNewsPosts() {
  const index = await getJson(`${NEWS_RAW_BASE}/index.json`).catch(() => null);
  if (!Array.isArray(index?.posts)) return [];

  const posts = await Promise.all(index.posts.map(async (entry) => {
    const slug = typeof entry?.slug === 'string' ? entry.slug.trim().toLowerCase() : '';
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || !isPublished(entry.publishedAt)) return null;

    const [metadata, body] = await Promise.all([
      getJson(postUrl(slug, 'post.json')).catch(() => null),
      getText(postUrl(slug, 'body.md')).catch(() => ''),
    ]);
    if (!metadata?.title) return null;

    return {
      slug,
      title: metadata.title.trim(),
      excerpt: typeof metadata.excerpt === 'string' ? metadata.excerpt.trim() : '',
      publishedAt: entry.publishedAt,
      updatedAt: entry.updatedAt || entry.publishedAt,
      tags: Array.isArray(entry.tags) ? entry.tags.filter((tag) => typeof tag === 'string') : [],
      coverUrl: assetUrl(slug, metadata.coverUrl),
      body: body.replaceAll('./assets/', `${postUrl(slug, 'assets')}/`),
    };
  }));

  return posts.filter(Boolean).sort((left, right) => Date.parse(right.publishedAt) - Date.parse(left.publishedAt));
}

export async function getNewsPost(slug) {
  return (await getNewsPosts()).find((post) => post.slug === slug) || null;
}
