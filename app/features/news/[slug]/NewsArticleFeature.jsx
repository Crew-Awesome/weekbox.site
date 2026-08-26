'use client'

import Link from "next/link";
import { useTranslation } from 'react-i18next';
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

function formatDate(value) {
  return new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric" }).format(new Date(value));
}

export default function NewsArticleFeature({ post = {} }){
  const { t } = useTranslation();


  return <div className="layout-content-wrapper news-layout">
    <aside className="layout-sidebar news-article-aside">
      <section className="box">
        <div className="box__header">{t('news.article')}</div>
        <div className="box__content"><Link href="/features/news" className="news-back">← {t('news.allNews')}</Link></div>
      </section>
    </aside>
    <div className="layout-main">
      <section className="box news-article-panel">
        <div className="box__header">{t('news.article')}</div>
        <div className="box__content">
          <article className="news-article">
            <img src={post.coverUrl} alt={post.title} className="news-article__cover" />
            <p className="news-article__meta"><time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>{post.updatedAt !== post.publishedAt && <span>{t('news.updated')} {formatDate(post.updatedAt)}</span>}</p>
            <h1>{post.title}</h1>
            <p className="news-article__excerpt">{post.excerpt}</p>
            <div className="news-article__body"><Markdown remarkPlugins={[remarkGfm]} components={{ a: ({ href, children }) => <a href={href} target="_blank" rel="noreferrer">{children}</a> }}>{post.body}</Markdown></div>
          </article>
        </div>
      </section>
    </div>
  </div>;
}
