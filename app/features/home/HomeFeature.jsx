'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faWindows, faApple, faLinux } from '@fortawesome/free-brands-svg-icons';
import { 
  faDownload, 
  faCompass, 
  faCogs, 
  faLaptopCode, 
  faBolt, 
  faRocket, 
  faLanguage 
} from '@fortawesome/free-solid-svg-icons';

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
    else setPlatform('windows');
  }, []);

  const groupedAssets = useMemo(() => assets
    .filter((asset) => !asset.name.toLowerCase().endsWith('resources.neu'))
    .sort((a, b) => getAssetPriority(a.name) - getAssetPriority(b.name))
    .reduce((groups, asset) => {
      const p = getPlatform(asset.name);
      (groups[p] ||= []).push(asset);
      return groups;
    }, {}), [assets]);

  const platformAssets = groupedAssets[platform] || [];
  const primaryAsset = platformAssets[0];

  const PlatformIcon = platform === 'macos' ? faApple : (platform === 'linux' ? faLinux : faWindows);
  const platformName = platform === 'macos' ? 'macOS' : (platform === 'linux' ? 'Linux' : 'Windows');

  return (
    <div className="w-full flex flex-col pt-[100px] md:pt-[160px] pb-20 px-6">
      
      {/* Hero Section */}
      <section className="max-w-[1000px] w-full mx-auto flex flex-col items-center text-center gap-6 md:gap-8 mb-24">
        
        <img 
          src={asset('icon.webp')} 
          alt="Weekbox Icon" 
          className="w-[120px] md:w-[160px] h-auto drop-shadow-2xl mb-2" 
          draggable="false" 
        />
        
        <h1 
          className="!text-5xl md:!text-7xl font-black text-white leading-tight tracking-tighter font-sans !border-none !pb-0 !mb-0 !mt-0"
          style={{ fontFamily: 'var(--wb-font-primary)' }}
        >
          {t('home.title')}
        </h1>
        
        <p className="!text-xl md:!text-2xl font-medium text-[var(--wb-on-surface)] leading-relaxed max-w-[800px] mt-4">
          {t('home.description')}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
          {primaryAsset ? (
            <a 
              href={primaryAsset.browser_download_url} 
              className="flex items-center justify-center gap-3 bg-[var(--wb-surface-dim)] border-2 border-[var(--wb-primary)] !text-[var(--wb-primary)] text-lg md:text-xl font-extrabold px-10 py-4 rounded-full hover:bg-[var(--wb-primary)] hover:border-[var(--wb-primary)] hover:!text-[var(--wb-surface-dim)] transition-all duration-300 !no-underline"
            >
              <FontAwesomeIcon icon={PlatformIcon} className="w-6 h-6" />
              {t('home.downloadFor')} {platformName}
            </a>
          ) : (
            <Link 
              href="/features/downloads" 
              className="flex items-center justify-center gap-3 bg-[var(--wb-surface-dim)] border-2 border-[var(--wb-primary)] !text-[var(--wb-primary)] text-lg md:text-xl font-extrabold px-10 py-4 rounded-full hover:bg-[var(--wb-primary)] hover:border-[var(--wb-primary)] hover:!text-[var(--wb-surface-dim)] transition-all duration-300 !no-underline"
            >
              <FontAwesomeIcon icon={faDownload} className="w-5 h-5" />
              {t('home.downloadNow')}
            </Link>
          )}

          <a 
            href="https://github.com/Crew-Awesome/Weekbox" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center justify-center gap-3 bg-[var(--wb-surface-dim)] border-2 border-[var(--wb-outline-variant)] !text-[var(--wb-on-surface)] text-lg md:text-xl font-bold px-10 py-4 rounded-full hover:bg-[var(--wb-on-surface)] hover:border-[var(--wb-on-surface)] hover:!text-[var(--wb-surface-dim)] transition-all duration-300 !no-underline"
          >
            <FontAwesomeIcon icon={faGithub} className="w-6 h-6" />
            {t('home.viewGithub')}
          </a>
        </div>
      </section>

      {/* Details Section */}
      <section className="max-w-[1200px] w-full mx-auto flex flex-col gap-16 border-t border-[var(--wb-outline-variant)] pt-16">
        
        {/* Section Intro */}
        <div className="flex flex-col items-center text-center gap-6 max-w-[800px] mx-auto">
          <h2 
            className="!text-4xl md:!text-5xl font-bold text-white tracking-tight !border-none !pb-0 !mb-0 !mt-0"
            style={{ fontFamily: 'var(--wb-font-primary)' }}
          >
            {t('home.whatItDoes')}
          </h2>
          <p className="!text-lg text-[var(--wb-on-surface-variant)] leading-relaxed">
            {t('home.whatItDoesDesc')}
          </p>
        </div>
        
        {/* Feature Cards List */}
        <div className="flex flex-col gap-12 mt-10 w-full">
          
          {[
            {
              title: t('features.browseTitle'),
              desc: t('features.browseDesc'),
              img: "home.webp"
            },
            {
              title: t('features.manageTitle'),
              desc: t('features.manageDesc'),
              img: "engine.manager.webp"
            },
            {
              title: t('features.multiTitle'),
              desc: t('features.multiDesc'),
              img: "credits.webp"
            },
            {
              title: t('features.smartTitle'),
              desc: t('features.smartDesc'),
              img: "download.webp"
            },
            {
              title: t('features.oneclickTitle'),
              desc: t('features.oneclickDesc'),
              img: "mod.webp"
            },
            {
              title: t('features.localizedTitle'),
              desc: t('features.localizedDesc'),
              img: "settings.webp"
            }
          ].map((feature, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div 
                key={idx} 
                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-16 p-6 md:p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl hover:bg-white/10 hover:border-white/20 hover:-translate-y-2 transition-all duration-500 group shadow-2xl relative overflow-hidden`}
              >
                
                {/* Optional subtle light flare for the glass effect */}
                <div className={`absolute top-[-50%] ${isEven ? 'left-[-50%]' : 'right-[-50%]'} w-[200px] h-[200px] bg-[var(--wb-primary)] rounded-full blur-[100px] opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity duration-500`} />

                {/* Text Side */}
                <div className={`flex-1 flex flex-col gap-4 text-justify ${isEven ? 'md:text-left' : 'md:text-right'} items-center ${isEven ? 'md:items-start' : 'md:items-end'} z-10 w-full`}>
                  <h3 
                    className={`!text-3xl md:!text-4xl font-bold text-white text-center ${isEven ? 'md:text-left' : 'md:text-right'} !border-none !pb-0 !mb-0 !mt-0 tracking-tight`}
                    style={{ fontFamily: 'var(--wb-font-primary)' }}
                  >
                    {feature.title}
                  </h3>
                  <p className="!text-lg md:!text-xl text-[var(--wb-on-surface-variant)] leading-relaxed w-full">
                    {feature.desc}
                  </p>
                </div>

                {/* Image Side */}
                <div className="flex-[1.2] w-full z-10">
                  <div className="w-full rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.6)] border border-white/10 bg-black/40">
                    <img 
                      src={asset(`screenshots/${feature.img}`)} 
                      alt={feature.title} 
                      className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700 ease-out"
                      draggable="false"
                    />
                  </div>
                </div>

              </div>
            );
          })}

        </div>

        {/* Final CTA */}
        <div className="flex justify-center mt-12 mb-8">
          <h2 
            className="!text-3xl md:!text-5xl font-black text-white uppercase tracking-wider text-center !border-none !pb-0 !mb-0 !mt-0 drop-shadow-2xl"
            style={{ fontFamily: 'var(--wb-font-primary)' }}
          >
            {t('home.finalCta')}
            {t('home.finalCtaWord').split('').map((letter, i) => {
              const fnfColors = ['#c24b99', '#00ffff', '#12fa05', '#f9393f'];
              return (
                <span key={i} style={{ color: fnfColors[i % fnfColors.length] }}>
                  {letter}
                </span>
              );
            })}
            <span className="text-white">!</span>
          </h2>
        </div>

      </section>
      
    </div>
  );
}