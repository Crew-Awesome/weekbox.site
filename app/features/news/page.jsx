import Link from "next/link";
import { getNewsPosts } from "../../../lib/news";

export const metadata = {
  title: "News | Weekbox",
  description: "WeekBox release notes, project updates, and community news.",
};

export const revalidate = 300;

function formatDate(value) {
  return new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric" }).format(new Date(value));
}

function NewsCard({ post, featured = false }) {
  return <article className={`news-card${featured ? " news-card--featured" : ""}`}>
    <Link href={`/features/news/${post.slug}`} className="news-card__link">
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

  return <div className="site-page news-page">
    <section className="box news-panel">
      <div className="box__header">Latest news</div>
      <div className="box__content">
        {featured ? <div className="news-list"><NewsCard post={featured} featured />{rest.map((post) => <NewsCard key={post.slug} post={post} />)}</div> : <div className="news-empty" role="status"><h2>No news yet</h2><p>Check back soon for WeekBox updates.</p></div>}
      </div>
    </section>
  </div>;
}
