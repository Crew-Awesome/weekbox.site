'use client';

import { useTranslation } from 'react-i18next';
import DownloadSelector from './DownloadSelector';

function formatDate(value, language) {
  return new Intl.DateTimeFormat(language, { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(value));
}

export default function DownloadsFeature({ release }) {
  const { t, i18n } = useTranslation();
  const assets = (release?.assets || []).filter((asset) => !asset.name.toLowerCase().endsWith('resources.neu'));

  return <div className="downloads-main">
    <section className="box">
      <div className="box__header">{t('downloads.latestRelease')}</div>
      <div className="box__content">
        {release ? <>
          <h1>{release.name || release.tag_name}</h1>
          <p className="release-meta">{t('downloads.released')} {formatDate(release.published_at, i18n.language)} · <a href={release.html_url} target="_blank" rel="noreferrer">{t('downloads.viewReleaseGithub')}</a></p>
          <p className="download-intro">{t('downloads.description')}</p>
          {assets.length ? <DownloadSelector assets={assets} /> : <p>{t('downloads.noFilesYet')}</p>}
        </> : <div className="release-empty" role="status"><h2>{t('downloads.unavailableTitle')}</h2><p>{t('downloads.unavailableDesc')}</p><a href="https://github.com/Crew-Awesome/Weekbox/releases" target="_blank" rel="noreferrer" className="btn">{t('downloads.viewReleasesGithub')}</a></div>}
      </div>
    </section>
  </div>;
}
