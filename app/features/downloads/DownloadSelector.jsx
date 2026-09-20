'use client';

import { useEffect, useMemo, useState } from 'react';

const platforms = [
  ['windows', 'Windows'],
  ['macos', 'macOS'],
  ['linux', 'Linux'],
  ['other', 'Other files'],
];

function getPlatform(name) {
  const fileName = name.toLowerCase();
  if (fileName.includes('windows') || fileName.includes('win32') || fileName.includes('win64')) return 'windows';
  if (fileName.includes('macos') || fileName.includes('darwin') || fileName.includes('osx')) return 'macos';
  if (fileName.includes('linux')) return 'linux';
  if (fileName.endsWith('.exe') || fileName.endsWith('.msi')) return 'windows';
  if (fileName.endsWith('.dmg') || fileName.endsWith('.pkg') || fileName.endsWith('.app.zip')) return 'macos';
  if (fileName.endsWith('.deb') || fileName.endsWith('.rpm') || fileName.endsWith('.appimage')) return 'linux';
  return 'other';
}

function getAssetPriority(name) {
  const fileName = name.toLowerCase();
  if (fileName.endsWith('-setup.exe')) return 0;
  if (fileName.endsWith('.pkg') || fileName.endsWith('.deb')) return 1;
  if (fileName.endsWith('.dmg') || fileName.endsWith('.appimage') || fileName.endsWith('.app.zip')) return 2;
  if (fileName.endsWith('.zip')) return 3;
  return 4;
}

function formatFileSize(bytes) {
  if (!bytes) return 'Size unavailable';
  const units = ['B', 'KB', 'MB', 'GB'];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** index).toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
}

function detectPlatform() {
  const value = [navigator.userAgentData?.platform, navigator.platform, navigator.userAgent].filter(Boolean).join(' ');
  if (/android|iphone|ipad|ipod/i.test(value)) return 'other';
  if (/windows|win32|win64/i.test(value)) return 'windows';
  if (/macos|mac os|darwin|osx/i.test(value)) return 'macos';
  if (/linux/i.test(value)) return 'linux';
  return 'other';
}

export default function DownloadSelector({ assets }) {
  const groupedAssets = useMemo(() => [...assets]
    .sort((left, right) => getAssetPriority(left.name) - getAssetPriority(right.name))
    .reduce((groups, asset) => {
      const platform = getPlatform(asset.name);
      (groups[platform] ||= []).push(asset);
      return groups;
    }, {}), [assets]);
  const [selectedPlatform, setSelectedPlatform] = useState('windows');

  useEffect(() => {
    const detected = detectPlatform();
    if (groupedAssets[detected]?.length) setSelectedPlatform(detected);
    else if (detected === 'other') setSelectedPlatform('other');
  }, [groupedAssets]);

  return <section className="platform-downloads" aria-label="Download files by platform">
    <div className="platform-picker" role="tablist" aria-label="Choose your platform">
      {platforms.map(([id, label]) => <button key={id} type="button" className="platform-picker__button" aria-pressed={selectedPlatform === id} onClick={() => setSelectedPlatform(id)}>{label}</button>)}
    </div>
    <div className="download-list" aria-live="polite">
      {(groupedAssets[selectedPlatform] || []).length ? (groupedAssets[selectedPlatform] || []).map((asset) => <a key={asset.id} className="download-card" href={asset.browser_download_url} aria-label={`Download ${asset.name}`}><span className="download-card__name">{asset.name}</span><span className="download-card__meta">{formatFileSize(asset.size)}</span></a>) : <p className="download-empty">No files for this platform.</p>}
    </div>
  </section>;
}
