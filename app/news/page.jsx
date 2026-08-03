import Link from "next/link";
import { getNewsPosts } from "../../lib/news";

export const metadata = {
  title: "News | Weekbox",
  description: "WeekBox release notes, project updates, and community news.",
};

export const revalidate = 300;

function formatDate(value) {
  return new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric" }).format(new Date(value));
}

function Box({ title, children }) {
  return <section className="box"><div className="box__header">{title}</div><div className="box__content">{children}</div></section>;
}

function NewsCard({ post, featured = false }) {
  return <article className={`news-card${featured ? " news-card--featured" : ""}`}>
    <Link href={`/news/${post.slug}`} className="news-card__link">
      <img src={post.coverUrl} alt="" className="news-card__image" />
      <div className="news-card__body">
        <div className="news-card__meta"><time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>{post.tags[0] && <span>{post.tags[0]}</span>}</div>
        <h2>{post.title}</h2>
        <p>{post.excerpt}</p>
        <span className="news-card__read">Read article <span aria-hidden="true">→</span></span>
      </div>
    </Link>
  </article>;
}

export default async function NewsPage() {
  const posts = await getNewsPosts();
  const [featured, ...rest] = posts;

  return <div className="layout-container">
    <header className="layout-header"><img src="/assets/images/banner.webp" alt="Weekbox Banner" className="layout-header__logo" draggable="false" /></header>
    <nav className="layout-nav" aria-label="Main navigation">
      <Link href="/" className="layout-nav__link">Home</Link> | <Link href="/news" className="layout-nav__link" aria-current="page">News</Link> | <Link href="/downloads" className="layout-nav__link">Downloads</Link> | <a href="https://github.com/Crew-Awesome/Weekbox" target="_blank" rel="noreferrer" className="layout-nav__link">GitHub</a> | <a href="https://discord.gg/xQTtYF2Cfn" target="_blank" rel="noreferrer" className="layout-nav__link">Discord</a>
    </nav>
    <main className="layout-content-wrapper news-layout">
      <div className="layout-main">
        <Box title="Latest news">
          {featured ? <div className="news-list"><NewsCard post={featured} featured />{rest.map((post) => <NewsCard key={post.slug} post={post} />)}</div> : <div className="news-empty" role="status"><h1>No news yet</h1><p>Check back soon for WeekBox updates.</p></div>}
        </Box>
      </div>
    </main>
    <footer className="layout-footer"><p className="layout-footer__text">Copyright © 2024 Awesome Crew. All rights reserved.</p><p className="layout-footer__disclaimer">Weekbox is not related to or affiliated with Funkin&apos; Crew Inc. or the official Friday Night Funkin&apos; game.</p></footer>
  </div>;
}
