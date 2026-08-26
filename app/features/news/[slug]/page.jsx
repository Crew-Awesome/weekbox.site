import { notFound } from "next/navigation";
import { getNewsPost, getNewsPosts } from "../../../../lib/news";
import NewsArticleFeature from "./NewsArticleFeature";

export const revalidate = 300;

export async function generateStaticParams() {
  return (await getNewsPosts()).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getNewsPost(slug);
  return post ? { title: `${post.title} | Weekbox`, description: post.excerpt } : { title: "News | Weekbox" };
}

export default async function NewsArticlePage({ params }) {
  const { slug } = await params;
  const post = await getNewsPost(slug);
  if (!post) notFound();
  return <NewsArticleFeature post={post} />;
}
