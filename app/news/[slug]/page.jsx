import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getNewsPost, getNewsPosts } from "../../../lib/news";

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

function Box({ title, children }) {
  return <section className="box"><div className="box__header">{title}</div><div className="box__content">{children}</div></section>;
}

export default async function NewsArticlePage({ params }) {
  const { slug } = await params;
  const post = await getNewsPost(slug);
  if (!post) notFound();

  return <div className="layout-container">
    <header className="layout-header"><img src="/assets/images/banner.webp" alt="Weekbox Banner" className="layout-header__logo" draggable="false" /></header>
    <nav className="layout-nav" aria-label="Main navigation">
      <Link href="/" className="layout-nav__link">Home</Link> | <Link href="/news" className="layout-nav__link" aria-current="page">News</Link> | <Link href="/downloads" className="layout-nav__link">Downloads</Link> | <Link href="/credits" className="layout-nav__link">Credits</Link> | <a href="https://github.com/Crew-Awesome/Weekbox" target="_blank" rel="noreferrer" className="layout-nav__link">GitHub</a> | <a href="https://discord.gg/xQTtYF2Cfn" target="_blank" rel="noreferrer" className="layout-nav__link">Discord</a>
    </nav>
    <main className="layout-content-wrapper news-layout">
      <aside className="layout-sidebar news-article-aside">
        <Box title="News"><Link href="/news" className="news-back">← All news</Link></Box>
      </aside>
      <div className="layout-main">
        <Box title="Article">
          <article className="news-article">
            <img src={post.coverUrl} alt="" className="news-article__cover" />
            <p className="news-article__meta"><time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>{post.updatedAt !== post.publishedAt && <span>Updated {formatDate(post.updatedAt)}</span>}</p>
            <h1>{post.title}</h1>
            <p className="news-article__excerpt">{post.excerpt}</p>
            <div className="news-article__body"><Markdown remarkPlugins={[remarkGfm]} components={{ a: ({ href, children }) => <a href={href} target="_blank" rel="noreferrer">{children}</a> }}>{post.body}</Markdown></div>
          </article>
        </Box>
      </div>
    </main>
    <footer className="layout-footer"><p className="layout-footer__text">Copyright © 2024 Awesome Crew. All rights reserved.</p><p className="layout-footer__disclaimer">Weekbox is not related to or affiliated with Funkin&apos; Crew Inc. or the official Friday Night Funkin&apos; game.</p></footer>
  </div>;
}
