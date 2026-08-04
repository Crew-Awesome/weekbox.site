'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { crewMembers } from '../lib/crew';

const asset = (path) => `/assets/images/${path}`;

function Box({ title, children }) {
  return <section className="box"><div className="box__header">{title}</div><div className="box__content">{children}</div></section>;
}

export default function Home() {
  const [language, setLanguage] = useState('ENG');
  const [crewPage, setCrewPage] = useState(0);
  const [crewPaused, setCrewPaused] = useState(false);
  const isEnglish = language === 'ENG';
  const toggleLanguage = () => setLanguage(isEnglish ? 'ESP' : 'ENG');
  const crewPageSize = 3;
  const crewPageCount = Math.ceil(crewMembers.length / crewPageSize);
  const visibleCrewMembers = crewMembers.slice(crewPage * crewPageSize, (crewPage + 1) * crewPageSize);

  useEffect(() => {
    if (crewPaused) return undefined;
    const timer = window.setInterval(() => {
      setCrewPage((page) => (page + 1) % crewPageCount);
    }, 4000);
    return () => window.clearInterval(timer);
  }, [crewPageCount, crewPaused]);

  return (
    <div className="layout-container">
      <header className="layout-header"><img src={asset('banner.webp')} alt="Weekbox Banner" className="layout-header__logo" draggable="false" /></header>
      <nav className="layout-nav" aria-label="Main navigation">
        <Link href="/" className="layout-nav__link">Home</Link> | <Link href="/news" className="layout-nav__link">News</Link> | <Link href="/downloads" className="layout-nav__link">Downloads</Link> | <Link href="/credits" className="layout-nav__link">Credits</Link> | <a href="https://github.com/Crew-Awesome/Weekbox" target="_blank" rel="noreferrer" className="layout-nav__link">GitHub</a> | <a href="https://discord.gg/xQTtYF2Cfn" target="_blank" rel="noreferrer" className="layout-nav__link">Discord</a> | <button type="button" onClick={toggleLanguage} className="layout-nav__link lang-switcher" aria-label="Switch language">{language}</button>
      </nav>
      <div className="layout-content-wrapper">
        <aside className="layout-sidebar">
          <Box title="About Weekbox"><div className="box__content--center"><img src={asset('icon.webp')} alt="Weekbox Icon" width="100" draggable="false" /><p>The ultimate Friday Night Funkin&apos; launcher!</p><a href="https://fnfweekbox.vercel.app/downloads" className="btn">Download Now</a></div></Box>
          <Box title="Supported Engines"><div className="engines-list">{[['psych.png','Psych Engine'],['psychonline.png','Psych Online'],['vslice.png','V-Slice'],['codename.png','Codename Engine'],['pslice.png','P-Slice'],['exe.png','Executable Mods'],['fpsplus.png','FPS Plus']].map(([file,name]) => <img key={file} src={asset(`engines/${file}`)} alt={name} title={name} className="engines-list__img" draggable="false" />)}</div></Box>
          <Box title="WeekBox Crew"><div className="team-carousel" onMouseEnter={() => setCrewPaused(true)} onMouseLeave={() => setCrewPaused(false)} onFocus={() => setCrewPaused(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setCrewPaused(false); }} aria-live="polite"><div className="team-carousel__members" key={crewPage}>{visibleCrewMembers.map((member) => <a className="team-member team-member--featured" href={member.href || '/credits'} target={member.href ? '_blank' : undefined} rel={member.href ? 'noreferrer' : undefined} key={member.name}><img src={asset(`awesome-crew/${member.image}`)} alt={member.name} className="team-member__avatar" draggable="false" /><span className="team-member__info"><span className="team-member__name">{member.name}</span><span className="team-member__role">{member.role}</span></span></a>)}</div><div className="team-carousel__dots" role="tablist" aria-label="WeekBox Crew pages">{Array.from({ length: crewPageCount }, (_, page) => <button type="button" className={`team-carousel__dot${page === crewPage ? ' is-active' : ''}`} aria-label={`Show crew page ${page + 1}`} aria-selected={page === crewPage} role="tab" onClick={() => setCrewPage(page)} />)}</div></div></Box>
        </aside>
        <main className="layout-main">
          <Box title={isEnglish ? 'Welcome to Weekbox' : 'Bienvenido a Weekbox'}><h1>{isEnglish ? 'Your all-in-one FNF Hub' : 'Tu centro FNF todo en uno'}</h1><p>{isEnglish ? 'Weekbox is a Friday Night Funkin\' launcher designed to give you complete control over your mods and engines. It\'s built for speed, efficiency, and to make your GameBanana modding experience as seamless as possible!' : 'Weekbox es un lanzador de Friday Night Funkin\' diseñado para darte control completo de tus mods y motores.'}</p><h2>{isEnglish ? 'Key Features:' : 'Características principales:'}</h2><ul><li><strong>{isEnglish ? 'Manage your mods:' : 'Administra tus mods:'}</strong> {isEnglish ? 'Keep all your FNF mods organized in one place.' : 'Mantén tus mods de FNF organizados en un solo lugar.'}</li><li><strong>{isEnglish ? 'Manage your engines:' : 'Administra tus motores:'}</strong> {isEnglish ? 'Switch between different FNF engines with ease.' : 'Cambia entre diferentes motores de FNF fácilmente.'}</li><li><strong>GameBanana Integration:</strong> {isEnglish ? 'Download mods from GameBanana directly and incredibly fast!' : '¡Descarga mods de GameBanana directamente y muy rápido!'}</li><li><strong>{isEnglish ? 'Engine Version Switcher:' : 'Selector de versión del motor:'}</strong> {isEnglish ? 'Switch between engine versions supported by GameBanana instantly.' : 'Cambia al instante entre versiones compatibles con GameBanana.'}</li></ul></Box>
          <Box title="Screenshots"><div className="screenshots">{[['home.webp','Home'],['mod.webp','Mod Manager'],['engine.manager.webp','Engine Manager'],['download.webp','Downloader']].map(([file,label]) => <div className="screenshot-item" key={file}><img src={asset(`screenshots/${file}`)} alt={`${label} screen`} className="screenshot-item__img" draggable="false" /><p className="screenshot-item__text">{label}</p></div>)}</div></Box>
        </main>
      </div>
      <footer className="layout-footer"><p className="layout-footer__text">Copyright © 2024 Awesome Crew. All rights reserved.</p><p className="layout-footer__disclaimer">Weekbox is not related to or affiliated with Funkin&apos; Crew Inc. or the official Friday Night Funkin&apos; game.</p></footer>
    </div>
  );
}
