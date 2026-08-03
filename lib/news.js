import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const NEWS_DIRECTORY = path.join(process.cwd(), "content", "news", "posts");

function isPublished(post) {
  const time = Date.parse(post.publishedAt || "");
  return Number.isFinite(time) && time <= Date.now();
}

function normalizePost(post) {
  if (!post || typeof post !== "object") return null;
  const slug = typeof post.slug === "string" ? post.slug.trim().toLowerCase() : "";
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;
  if (typeof post.title !== "string" || !post.title.trim()) return null;
  return {
    slug,
    title: post.title.trim(),
    excerpt: typeof post.excerpt === "string" ? post.excerpt.trim() : "",
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt || post.publishedAt,
    coverUrl: typeof post.coverUrl === "string" ? post.coverUrl : "/assets/images/banner.webp",
    tags: Array.isArray(post.tags) ? post.tags.filter((tag) => typeof tag === "string").slice(0, 8) : [],
    featured: post.featured === true,
    body: typeof post.body === "string" ? post.body : "",
  };
}

export async function getNewsPosts() {
  let entries;
  try {
    entries = await readdir(NEWS_DIRECTORY, { withFileTypes: true });
  } catch (error) {
    if (error?.code === "ENOENT") return [];
    throw error;
  }
  const posts = await Promise.all(
    entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
      .map(async (entry) => JSON.parse(await readFile(path.join(NEWS_DIRECTORY, entry.name), "utf8"))),
  );
  return posts
    .map(normalizePost)
    .filter((post) => post && isPublished(post))
    .sort((left, right) => Date.parse(right.publishedAt) - Date.parse(left.publishedAt));
}

export async function getNewsPost(slug) {
  return (await getNewsPosts()).find((candidate) => candidate.slug === slug) || null;
}

export function toPublicPost(post) {
  const { body, ...publicPost } = post;
  return publicPost;
}
