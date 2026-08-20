import Link from 'next/link';
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

function Box({ title, children }) {
  return <section className="box"><div className="box__header">{title}</div><div className="box__content">{children}</div></section>;
}

export default async function DownloadsPage() {
  const release = await getLatestRelease();
  const assets = release?.assets ?? [];

  return (
    <div className="layout-container">
      <header className="layout-header"><img src="/assets/images/banner.webp" alt="Weekbox Banner" className="layout-header__logo" draggable="false" /></header>
      <main id="main-content" className="downloads-main">
        <Box title="Downloads">
          {release ? <>
            <h1>{release.name || release.tag_name}</h1>
            <p className="release-meta">Released {formatDate(release.published_at)} · <a href={release.html_url} target="_blank" rel="noreferrer">View release on GitHub</a></p>
            <p className="download-intro">Choose the installer or portable build for your platform.</p>
            {assets.length > 0 ? <DownloadSelector assets={assets} /> : <div className="release-empty" role="status"><p>No release files are available yet.</p><a href={release.html_url} target="_blank" rel="noreferrer" className="btn">View release on GitHub</a></div>}
            {release.body && <div className="release-notes"><h2>Release notes</h2><div className="release-notes__body"><Markdown remarkPlugins={[remarkGfm]} components={{ a: ({ href, children }) => <a href={href} target="_blank" rel="noreferrer">{children}</a> }}>{release.body}</Markdown></div></div>}
          </> : <div className="release-empty" role="status"><h1>Downloads are temporarily unavailable</h1><p>Unable to load the latest release. Open the GitHub releases page and try again shortly.</p><a href="https://github.com/Crew-Awesome/Weekbox/releases" target="_blank" rel="noreferrer" className="btn">View releases on GitHub</a></div>}
        </Box>
      </main>
      <footer className="layout-footer"><p className="layout-footer__text">Copyright © 2024 Awesome Crew. All rights reserved.</p><p className="layout-footer__disclaimer">Weekbox is not related to or affiliated with Funkin&apos; Crew Inc. or the official Friday Night Funkin&apos; game.</p></footer>
    </div>
  );
}
