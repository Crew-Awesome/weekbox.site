"use client";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useTranslation } from "react-i18next";
import DownloadSelector from "./download-selector";

function formatDate(value, lang) {
  return new Intl.DateTimeFormat(lang, {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export default function DownloadsFeature({ release }) {
  const { t, i18n } = useTranslation();
  const assets = release?.assets ?? [];

  return (
      <div className="downloads-main">
        <section className="box">
          <div className="box__header">{t('downloads.latestRelease')}</div>
          <div className="box__content">
            {release ? <>
            <h2>{release.name || release.tag_name}</h2>
                <p className="release-meta">{t('downloads.released')} {formatDate(release.published_at, i18n.language)} · <a href={release.html_url} target="_blank" rel="noreferrer">{t('downloads.viewReleaseGithub')}</a></p>
                <p className="download-intro">{t('downloads.description')}</p>
                {assets.length > 0 ? <DownloadSelector assets={assets} /> : <div className="release-empty" role="status"><p>{t('downloads.noFilesYet')}</p><a href={release.html_url} target="_blank" rel="noreferrer" className="btn">{t('downloads.viewReleaseGithub')}</a></div>}
                {release.body && <div className="release-notes"><h2>{t('downloads.releaseNotes')}</h2><div className="release-notes__body"><Markdown remarkPlugins={[remarkGfm]} components={{ a: ({ href, children }) => <a href={href} target="_blank" rel="noreferrer">{children}</a>}}>{release.body}</Markdown></div></div>}
              </> : <div className="release-empty" role="status">
                <h2>{t('downloads.unavailableTitle')}</h2>
                <p>{t('downloads.unavailableDesc')}</p>
                <a href="https://github.com/Crew-Awesome/Weekbox/releases" target="_blank" rel="noreferrer" className="btn">{t('downloads.viewReleasesGithub')}</a>
          </div>}
          </div>
        </section>
      </div>
     );
}
