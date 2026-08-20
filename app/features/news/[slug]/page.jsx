import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getNewsPost, getNewsPosts } from "../../../../lib/news";

export const revalidate = 300;

function formatDate(value) {
  return new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric" }).format(new Date(value));
}

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

  return <div className="site-page news-article-page">
    <Link href="/features/news" className="news-back">← Back to news</Link>
    <section className="box news-article-panel">
      <div className="box__header">Article</div>
      <div className="box__content">
        <article className="news-article">
          <img src={post.coverUrl} alt={post.title} className="news-article__cover" />
          <p className="news-article__meta"><time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>{post.updatedAt !== post.publishedAt && <span>Updated {formatDate(post.updatedAt)}</span>}</p>
          <h1>{post.title}</h1>
          <p className="news-article__excerpt">{post.excerpt}</p>
          <div className="news-article__body"><Markdown remarkPlugins={[remarkGfm]} components={{ a: ({ href, children }) => <a href={href} target="_blank" rel="noreferrer">{children}</a> }}>{post.body}</Markdown></div>
        </article>
      </div>
    </section>
  </div>;
}
