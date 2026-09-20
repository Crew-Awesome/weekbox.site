'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { crewMembers } from '../../../lib/crew';
import { sitePath } from '../../../lib/site-path';

const asset = (path) => sitePath(`/assets/images/${path}`);

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

function Box({ title, children }) {
  const { t } = useTranslation();
  return <section className="box"><div className="box__header">{t(`home.${title}`)}</div><div className="box__content">{children}</div></section>;
}

export default function HomeFeature({ assets = [] }) {
  const { t } = useTranslation();
  const [platform, setPlatform] = useState('windows');
  const [crewPage, setCrewPage] = useState(0);
  const [crewPaused, setCrewPaused] = useState(false);

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
  const platformName = platform === 'macos' ? 'macOS' : platform === 'linux' ? 'Linux' : 'Windows';
  const features = [
    ['browseTitle', 'browseDesc', 'home.webp'],
    ['manageTitle', 'manageDesc', 'engine.manager.webp'],
    ['multiTitle', 'multiDesc', 'credits.webp'],
    ['smartTitle', 'smartDesc', 'download.webp'],
    ['oneclickTitle', 'oneclickDesc', 'mod.webp'],
    ['localizedTitle', 'localizedDesc', 'settings.webp'],
  ];
  const crewPageSize = 3;
  const crewPageCount = Math.ceil(crewMembers.length / crewPageSize);
  const visibleCrewMembers = crewMembers.slice(crewPage * crewPageSize, (crewPage + 1) * crewPageSize);

  useEffect(() => {
    if (crewPaused) return undefined;
    const timer = window.setInterval(() => setCrewPage((page) => (page + 1) % crewPageCount), 4000);
    return () => window.clearInterval(timer);
  }, [crewPageCount, crewPaused]);

  return (
    <div className="layout-content-wrapper home-layout">
      <aside className="layout-sidebar">
        <Box title="aboutWeekbox">
          <div className="box__content--center">
            <img src={asset('icon.webp')} alt="Weekbox Icon" width="100" draggable="false" />
            <p>{t('home.description')}</p>
            {primaryAsset ? (
              <a href={primaryAsset.browser_download_url} className="btn">{t('home.downloadFor')} {platformName}</a>
            ) : (
              <a href="https://github.com/Crew-Awesome/Weekbox/releases" target="_blank" rel="noreferrer" className="btn">{t('home.downloadNow')}</a>
            )}
          </div>
        </Box>

        <Box title="supportedEngines">
          <div className="engines-list">
            {[['psych.png', 'Psych Engine'], ['psychonline.png', 'Psych Online'], ['vslice.png', 'V-Slice'], ['codename.png', 'Codename Engine'], ['pslice.png', 'P-Slice'], ['exe.png', 'Executable Mods'], ['fpsplus.png', 'FPS Plus']].map(([file, name]) => (
              <img key={file} src={asset(`engines/${file}`)} alt={name} title={name} className="engines-list__img" draggable="false" />
            ))}
          </div>
        </Box>

        <Box title="weekboxCrew">
          <div className="team-carousel" onMouseEnter={() => setCrewPaused(true)} onMouseLeave={() => setCrewPaused(false)} onFocus={() => setCrewPaused(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setCrewPaused(false); }} aria-live="polite">
            <div className="team-carousel__members" key={crewPage}>
              {visibleCrewMembers.map((member) => (
                <a className="team-member team-member--featured" href={member.href || '/features/ccredits'} target={member.href ? '_blank' : undefined} rel={member.href ? 'noreferrer' : undefined} key={member.name}>
                  <img src={asset(`awesome-crew/${member.image}`)} alt={member.name} className="team-member__avatar" draggable="false" />
                  <span className="team-member__info"><span className="team-member__name">{member.name}</span><span className="team-member__role">{member.role}</span></span>
                </a>
              ))}
            </div>
            <div className="team-carousel__dots" role="tablist" aria-label="WeekBox Crew pages">
              {Array.from({ length: crewPageCount }, (_, page) => <button type="button" className={`team-carousel__dot${page === crewPage ? ' is-active' : ''}`} aria-label={`Show crew page ${page + 1}`} aria-selected={page === crewPage} role="tab" onClick={() => setCrewPage(page)} key={page} />)}
            </div>
          </div>
        </Box>
      </aside>

      <div className="layout-main">
        <Box title="welcomeToWeekbox">
          <h1>{t('home.title')}</h1>
          <p>{t('home.description')}</p>
          <h2>{t('home.whatItDoes')}</h2>
          <p>{t('home.whatItDoesDesc')}</p>
          <ul>
            {features.map(([titleKey, descriptionKey]) => <li key={titleKey}><strong>{t(`features.${titleKey}`)}:</strong> {t(`features.${descriptionKey}`)}</li>)}
          </ul>
        </Box>

        <Box title="screenshots">
          <div className="screenshots">
            {features.map(([titleKey, , image]) => {
              const title = t(`features.${titleKey}`);
              return <div className="screenshot-item" key={image}><img src={asset(`screenshots/${image}`)} alt={`${title} screen`} className="screenshot-item__img" draggable="false" /><p className="screenshot-item__text">{title}</p></div>;
            })}
          </div>
        </Box>
      </div>
    </div>
  );
}
