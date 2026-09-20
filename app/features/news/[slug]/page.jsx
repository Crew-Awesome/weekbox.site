import { notFound } from 'next/navigation';
import NewsArticleFeature from './NewsArticleFeature';
import { getNewsPost, getNewsPosts } from '../../../../lib/news';

export async function generateStaticParams() {
  return (await getNewsPosts()).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const post = await getNewsPost((await params).slug);
  return post ? { title: `${post.title} | Weekbox`, description: post.excerpt } : { title: 'News | Weekbox' };
}

export default async function NewsArticlePage({ params }) {
  const post = await getNewsPost((await params).slug);
  if (!post) notFound();
  return <NewsArticleFeature post={post} />;
}
