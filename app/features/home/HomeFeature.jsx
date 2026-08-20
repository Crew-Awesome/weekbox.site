'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple, faGithub, faLinux, faWindows } from '@fortawesome/free-brands-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

const asset = (path) => `/assets/images/${path}`;

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
  if (fileName.endsWith('.dmg') || fileName.endsWith('.appimage') || fileName.endsWith('.app.zip')) return 2;
  if (fileName.endsWith('.zip')) return 3;
  return 4;
}

export default function HomeFeature({ assets = [] }) {
  const { t } = useTranslation();
  const [platform, setPlatform] = useState('windows');

  useEffect(() => {
    const value = navigator.userAgentData?.platform || navigator.platform || navigator.userAgent;
    if (/mac/i.test(value)) setPlatform('macos');
    else if (/linux/i.test(value)) setPlatform('linux');
  }, []);

  const groupedAssets = useMemo(() => assets
    .filter((releaseAsset) => !releaseAsset.name.toLowerCase().endsWith('resources.neu'))
    .sort((left, right) => getAssetPriority(left.name) - getAssetPriority(right.name))
    .reduce((groups, releaseAsset) => {
      const key = getPlatform(releaseAsset.name);
      (groups[key] ||= []).push(releaseAsset);
      return groups;
    }, {}), [assets]);

  const primaryAsset = groupedAssets[platform]?.[0];
  const platformIcon = platform === 'macos' ? faApple : platform === 'linux' ? faLinux : faWindows;
  const platformName = platform === 'macos' ? 'macOS' : platform === 'linux' ? 'Linux' : 'Windows';
  const features = [
    ['browseTitle', 'browseDesc', 'home.webp'],
    ['manageTitle', 'manageDesc', 'engine.manager.webp'],
    ['multiTitle', 'multiDesc', 'credits.webp'],
    ['smartTitle', 'smartDesc', 'download.webp'],
    ['oneclickTitle', 'oneclickDesc', 'mod.webp'],
    ['localizedTitle', 'localizedDesc', 'settings.webp'],
  ];

  return (
    <div className="home-page">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero__content">
          <h1 id="home-title" className="home-hero__title">{t('home.title')}</h1>
          <p className="home-hero__description">{t('home.description')}</p>
          <div className="home-actions">
            {primaryAsset ? (
              <a href={primaryAsset.browser_download_url} className="home-action home-action--primary">
                <FontAwesomeIcon icon={platformIcon} aria-hidden="true" />
                {t('home.downloadFor')} {platformName}
              </a>
            ) : (
              <Link href="/features/downloads" className="home-action home-action--primary">
                <FontAwesomeIcon icon={faDownload} aria-hidden="true" />
                {t('home.downloadNow')}
              </Link>
            )}
            <a href="https://github.com/Crew-Awesome/Weekbox" target="_blank" rel="noreferrer" className="home-action home-action--secondary">
              <FontAwesomeIcon icon={faGithub} aria-hidden="true" />
              {t('home.viewGithub')}
            </a>
          </div>
        </div>
        <figure className="home-hero__visual">
          <img src={asset('screenshots/home.webp')} alt="WeekBox home screen" draggable="false" />
        </figure>
      </section>

      <section className="home-section" aria-labelledby="home-features-title">
        <header className="home-section__heading">
          <p className="home-eyebrow">Inside the launcher</p>
          <h2 id="home-features-title">{t('home.whatItDoes')}</h2>
          <p>{t('home.whatItDoesDesc')}</p>
        </header>
        <div className="home-features">
          {features.map(([titleKey, descriptionKey, image]) => (
            <article className="home-feature" key={titleKey}>
              <img src={asset(`screenshots/${image}`)} alt={`${t(`features.${titleKey}`)} screen`} className="home-feature__image" draggable="false" />
              <div className="home-feature__body">
                <h3>{t(`features.${titleKey}`)}</h3>
                <p>{t(`features.${descriptionKey}`)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-cta" aria-labelledby="home-cta-title">
        <h2 id="home-cta-title">{t('home.finalCta')}{t('home.finalCtaWord')}.</h2>
      </section>
    </div>
  );
}
