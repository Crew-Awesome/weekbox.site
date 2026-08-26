'use client'

import Link from "next/link";
import { useTranslation } from 'react-i18next';

function formatDate(value) {
  return new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric" }).format(new Date(value));
}

function NewsCard({ post, featured = false }) {
  const { t } = useTranslation();
  return <article className={`news-card${featured ? " news-card--featured" : ""}`}>
    <Link href={`/features/news/${post.slug}`} className="news-card__link">
      <img src={post.coverUrl} alt="" className="news-card__image" />
      <div className="news-card__body">
        <div className="news-card__meta"><time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>{post.tags[0] && <span>{post.tags[0]}</span>}</div>
        <h2>{post.title}</h2>
        <p>{post.excerpt}</p>
        <span className="news-card__read">{t('news.readArticle')} <span aria-hidden="true">→</span></span>
      </div>
    </Link>
  </article>;
}

export default function NewsFeature({ posts = [] }) {
  const { t } = useTranslation();
  const [featured, ...rest] = posts;

  return <div className="layout-content-wrapper news-layout">
    <div className="layout-main">
      <section className="box news-panel">
        <div className="box__header">{t('news.latestNews')}</div>
        <div className="box__content">
          {featured ? <div className="news-list"><NewsCard post={featured} featured />{rest.map((post) => <NewsCard key={post.slug} post={post} />)}</div> : <div className="news-empty" role="status"><h2>{t('news.unavailableTitle')}</h2><p>{t('news.unavailableDesc')}</p></div>}
        </div>
      </section>
    </div>
  </div>;
}
