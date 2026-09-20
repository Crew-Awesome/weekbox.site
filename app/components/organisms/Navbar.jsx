'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  ['en', 'English'],
  ['es', 'Español'],
  ['fr', 'Français'],
  ['zh', '中文'],
  ['tr', 'Türkçe'],
  ['it', 'Italiano'],
  ['pt', 'Português'],
  ['de', 'Deutsch'],
  ['id', 'Indonesia'],
  ['ru', 'Русский'],
];

export function Navbar() {
  const pathname = usePathname();
  const { i18n, t } = useTranslation();
  const language = i18n.language?.split('-')[0] || 'en';
  const link = (href, label) => (
    <Link href={href} className="layout-nav__link" aria-current={pathname === href ? 'page' : undefined}>
      {t(`nav.${label}`)}
    </Link>
  );

  return (
    <nav className="layout-nav" aria-label="Main navigation">
      {link('/', 'home')} {' | '}
      {link('/features/news', 'news')} {' | '}
      {link('/features/downloads', 'downloads')} {' | '}
      {link('/features/ccredits', 'credits')} {' | '}
      <a href="https://github.com/Crew-Awesome/Weekbox" target="_blank" rel="noreferrer" className="layout-nav__link">GitHub</a> {' | '}
      <a href="https://discord.gg/xQTtYF2Cfn" target="_blank" rel="noreferrer" className="layout-nav__link">Discord</a> {' | '}
      <label className="lang-switcher">
        <span className="sr-only">{t('nav.language')}</span>
        <select value={language} onChange={(event) => i18n.changeLanguage(event.target.value)} aria-label="Language">
          {LANGUAGES.map(([code, name]) => <option value={code} key={code}>{name}</option>)}
        </select>
      </label>
    </nav>
  );
}
