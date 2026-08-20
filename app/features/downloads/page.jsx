import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import DownloadSelector from './download-selector';
import { getLatestRelease } from '../../../lib/weekbox-release';

export const metadata = {
  title: 'Downloads | Weekbox',
  description: 'A Re-Imagined Original FNF Mod Launcher',
};

function formatDate(value) {
  return new Intl.DateTimeFormat('en', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(value));
}

export default async function DownloadsPage() {
  const release = await getLatestRelease();
  const assets = release?.assets ?? [];

  return (
    <div className="site-page downloads-page">
      <header className="page-heading">
        <p className="page-heading__eyebrow">WeekBox / downloads</p>
        <h1>Downloads</h1>
        <p>Choose the build that matches your platform.</p>
      </header>
      <div className="downloads-main">
        <section className="box">
          <div className="box__header">Latest release</div>
          <div className="box__content">
            {release ? <>
              <h2>{release.name || release.tag_name}</h2>
              <p className="release-meta">Released {formatDate(release.published_at)} · <a href={release.html_url} target="_blank" rel="noreferrer">View release on GitHub</a></p>
              <p className="download-intro">Choose the installer or portable build for your platform.</p>
              {assets.length > 0 ? <DownloadSelector assets={assets} /> : <div className="release-empty" role="status"><p>No release files are available yet.</p><a href={release.html_url} target="_blank" rel="noreferrer" className="btn">View release on GitHub</a></div>}
              {release.body && <div className="release-notes"><h2>Release notes</h2><div className="release-notes__body"><Markdown remarkPlugins={[remarkGfm]} components={{ a: ({ href, children }) => <a href={href} target="_blank" rel="noreferrer">{children}</a> }}>{release.body}</Markdown></div></div>}
            </> : <div className="release-empty" role="status"><h2>Downloads are temporarily unavailable</h2><p>Unable to load the latest release. Open the GitHub releases page and try again shortly.</p><a href="https://github.com/Crew-Awesome/Weekbox/releases" target="_blank" rel="noreferrer" className="btn">View releases on GitHub</a></div>}
          </div>
        </section>
      </div>
    </div>
  );
}
