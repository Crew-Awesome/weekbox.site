'use client';

import { useEffect, useMemo, useState } from 'react';

const platforms = [
  { id: 'windows', label: 'Windows', Icon: WindowsIcon },
  { id: 'macos', label: 'macOS', Icon: AppleIcon },
  { id: 'linux', label: 'Linux', Icon: LinuxIcon },
  { id: 'other', label: 'Other files', Icon: ArchiveIcon },
];

function getPlatform(name) {
  const fileName = name.toLowerCase();
  if (fileName.includes('windows') || fileName.includes('win32') || fileName.includes('win64')) return 'windows';
  if (fileName.includes('macos') || fileName.includes('darwin') || fileName.includes('osx')) return 'macos';
  if (fileName.includes('linux')) return 'linux';
  return 'other';
}

function getAssetPriority(name) {
  const fileName = name.toLowerCase();
  if (fileName.endsWith('-setup.exe')) return 0;
  if (fileName.endsWith('.pkg') || fileName.endsWith('.deb')) return 1;
  if (fileName.endsWith('.dmg') || fileName.endsWith('.appimage')) return 2;
  if (fileName.endsWith('.zip')) return 3;
  return 4;
}

function getAssetLabel(name) {
  const fileName = name.toLowerCase();
  if (fileName.endsWith('-setup.exe')) return 'Recommended installer';
  if (fileName.endsWith('.pkg')) return 'macOS installer';
  if (fileName.endsWith('.deb')) return 'Debian/Ubuntu installer';
  if (fileName.endsWith('.dmg')) return 'macOS app';
  if (fileName.endsWith('.appimage')) return 'Linux portable app';
  if (fileName.endsWith('.zip')) return 'Portable archive';
  return 'Additional file';
}

function formatFileSize(bytes) {
  if (!bytes) return 'Size unavailable';
  const units = ['B', 'KB', 'MB', 'GB'];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** index).toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
}

function defaultPlatform() {
  const value = navigator.userAgentData?.platform || navigator.platform || navigator.userAgent;
  if (/mac/i.test(value)) return 'macos';
  if (/linux/i.test(value)) return 'linux';
  return 'windows';
}

export default function DownloadSelector({ assets }) {
  const groupedAssets = useMemo(() => assets.filter((asset) => !asset.name.toLowerCase().endsWith('resources.neu')).sort((a, b) => getAssetPriority(a.name) - getAssetPriority(b.name)).reduce((groups, asset) => {
    const platform = getPlatform(asset.name);
    (groups[platform] ||= []).push(asset);
    return groups;
  }, {}), [assets]);
  const availablePlatforms = platforms.filter(({ id }) => groupedAssets[id]?.length);
  const [selectedPlatform, setSelectedPlatform] = useState(availablePlatforms[0]?.id || 'other');

  useEffect(() => {
    const detectedPlatform = defaultPlatform();
    if (groupedAssets[detectedPlatform]?.length) setSelectedPlatform(detectedPlatform);
  }, [groupedAssets]);

  const selectedAssets = groupedAssets[selectedPlatform] || [];

  return <section className="platform-downloads" aria-label="Download files by platform">
    <div className="platform-picker">{availablePlatforms.map(({ id, label, Icon }) => <button key={id} type="button" className="platform-picker__button" aria-pressed={selectedPlatform === id} onClick={() => setSelectedPlatform(id)}><Icon /><span>{label}</span></button>)}</div>
    <div className="download-list" aria-live="polite">{selectedAssets.map((asset) => <a key={asset.id} href={asset.browser_download_url} className="download-card" aria-label={`Download ${asset.name}`}><span className="download-card__name">{getAssetLabel(asset.name)}</span><span className="download-card__meta">{asset.name} · {formatFileSize(asset.size)}</span></a>)}</div>
  </section>;
}

function WindowsIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5.5 10.5 4v7H3V5.5Zm8.5-1.7L21 2v9h-9.5V3.8ZM3 13h7.5v7L3 18.5V13Zm8.5 0H21v9l-9.5-1.8V13Z" fill="currentColor" /></svg>; }
function AppleIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16.7 12.7c0-2.4 2-3.5 2.1-3.6-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.6.9-.8 0-1.9-.9-3.1-.9-1.6 0-3.1.9-3.9 2.4-1.7 2.9-.4 7.2 1.2 9.4.8 1 1.7 2.1 3 2.1 1.2 0 1.7-.8 3.2-.8 1.5 0 1.9.8 3.2.8 1.3 0 2.2-1.2 3-2.2.9-1.3 1.3-2.6 1.3-2.7-.1 0-2.9-1.1-2.9-4.5ZM14.3 5.6c.7-.9 1.1-2.1 1-3.3-1 .1-2.3.7-3 1.6-.6.7-1.2 1.9-1 3.1 1.2.1 2.3-.6 3-1.4Z" fill="currentColor" /></svg>; }
function LinuxIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2c-2 0-3.4 1.7-3.4 4.3 0 1.6.5 2.5.3 3.7-.2 1.4-1.8 2.8-2.5 4.5-.5 1.2-.9 2.7-.6 4.1.3 1.6 1.6 2.1 3.2 1.6.8-.2 1.6-.7 2.1-1.1.2-.1.5-.1.7 0 .6.4 1.3.9 2.1 1.1 1.6.5 2.9 0 3.2-1.6.3-1.4-.1-2.9-.6-4.1-.7-1.7-2.3-3.1-2.5-4.5-.2-1.2.3-2.1.3-3.7C15.4 3.7 14 2 12 2Zm-1.3 5.2c.5 0 .8.3.8.8s-.3.8-.8.8-.8-.3-.8-.8.3-.8.8-.8Zm2.6 0c.5 0 .8.3.8.8s-.3.8-.8.8-.8-.3-.8-.8.3-.8.8-.8Zm-3.6 5.1c.6.4 1.5.6 2.3.6s1.7-.2 2.3-.6c.2.6.1 1.3-.3 1.9-.5.8-1.1 1.2-2 1.2s-1.5-.4-2-1.2c-.4-.6-.5-1.3-.3-1.9Z" fill="currentColor" /></svg>; }
function ArchiveIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 3h16v4H4V3Zm1 6h14v12H5V9Zm5 3v2h4v-2h-4Zm0 4v2h4v-2h-4Z" fill="currentColor" /></svg>; }
