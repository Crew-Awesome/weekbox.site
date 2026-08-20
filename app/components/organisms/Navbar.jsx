'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  { code: 'en', name: 'English', icon: 'us' },
  { code: 'es', name: 'Español', icon: 'es' },
  { code: 'fr', name: 'Français', icon: 'fr' },
  { code: 'zh', name: '中文', icon: 'cn' },
  { code: 'tr', name: 'Türkçe', icon: 'tr' },
  { code: 'it', name: 'Italiano', icon: 'it' },
  { code: 'pt', name: 'Português', icon: 'br' },
  { code: 'de', name: 'Deutsch', icon: 'de' },
  { code: 'id', name: 'Indonesia', icon: 'id' }
];

export function Navbar() {
  const pathname = usePathname();
  const { i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const currentLangCode = i18n.language ? i18n.language.split('-')[0] : 'en';
  const currentLangData = LANGUAGES.find(l => l.code === currentLangCode) || LANGUAGES[0];

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;
        
        setIsScrolled(currentScrollY > 10);

        if (currentScrollY > lastScrollY && currentScrollY > 50 && !isMobileMenuOpen) {
          setIsVisible(false);
          setLangMenuOpen(false); // Close lang menu on scroll down
        } else {
          setIsVisible(true);
        }
        
        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const getLinkClasses = (path, isMobile = false) => {
    const isActive = pathname === path;
    return `flex items-center ${isMobile ? 'justify-end w-full text-right' : 'justify-center'} px-5 py-2 rounded-full font-semibold transition-all duration-300 !no-underline hover:!no-underline ${
      isActive 
        ? 'bg-[var(--wb-item-active)] text-[var(--wb-on-secondary-container)]' 
        : 'text-[var(--wb-text-muted)] hover:bg-[var(--wb-item-hover)] hover:text-[var(--wb-text-main)]'
    }`;
  };

  return (
    <>
      {/* Dropdown Overlay (Fades in on hover) */}
      <div 
        className={`fixed inset-0 top-0 bg-black/30 backdrop-blur-sm z-[990] transition-opacity duration-300 pointer-events-none hidden lg:block ${langMenuOpen ? 'opacity-100' : 'opacity-0'}`}
        aria-hidden="true"
      />

      <nav 
        aria-label="Main navigation" 
        className={`flex justify-between items-stretch px-[20px] md:px-[40px] py-[8px] min-h-[64px] fixed top-0 left-0 right-0 z-[1000] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${isVisible ? 'translate-y-0' : '-translate-y-full'} ${isScrolled ? 'bg-[var(--wb-surface-container)] shadow-md' : 'bg-transparent shadow-none'}`}
      >
        {/* Left: Weekbox Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center !no-underline hover:!no-underline select-none">
            <span className="font-black text-white text-xl sm:text-2xl tracking-tighter" style={{ fontFamily: 'var(--wb-font-primary)' }}>WEEKB</span>
            <img src="/assets/images/icon.webp" alt="O" className="h-[20px] sm:h-[24px] w-auto mx-[2px] transform hover:scale-105 transition-transform" draggable="false" />
            <span className="font-black text-white text-xl sm:text-2xl tracking-tighter" style={{ fontFamily: 'var(--wb-font-primary)' }}>X</span>
          </Link>
        </div>

        {/* Center: Navigation Links (Desktop) */}
        <div className="hidden lg:flex items-center justify-center gap-1">
          <Link href="/" className={getLinkClasses('/')} aria-current={pathname === '/' ? 'page' : undefined}>Home</Link>
          <Link href="/features/downloads" className={getLinkClasses('/features/downloads')} aria-current={pathname === '/features/downloads' ? 'page' : undefined}>Downloads</Link>
          <Link href="/features/news" className={getLinkClasses('/features/news')} aria-current={pathname === '/features/news' ? 'page' : undefined}>News</Link>
          <Link href="/features/ccredits" className={getLinkClasses('/features/ccredits')} aria-current={pathname === '/features/ccredits' ? 'page' : undefined}>Credits</Link>
        </div>

        {/* Right: GitHub, Discord, Language Switcher (Desktop) */}
        <div className="hidden lg:flex gap-2 items-center">
          <a href="https://github.com/Crew-Awesome/Weekbox" target="_blank" rel="noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full text-[var(--wb-on-surface-variant)] hover:bg-[var(--wb-item-hover)] hover:text-[var(--wb-on-surface)] transition-all duration-300 !no-underline shadow-none" aria-label="GitHub">
            <svg height="22" width="22" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
            </svg>
          </a>
          <a href="https://discord.gg/xQTtYF2Cfn" target="_blank" rel="noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full text-[var(--wb-on-surface-variant)] hover:bg-[var(--wb-item-hover)] hover:text-[#5865F2] transition-all duration-300 !no-underline shadow-none" aria-label="Discord">
            <svg height="22" width="22" viewBox="0 0 127.14 96.36" fill="currentColor">
              <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.2,46,96.09,53,91.08,65.69,84.69,65.69Z"></path>
            </svg>
          </a>
          
          {/* Desktop Language Dropdown (Hover triggered) */}
          <div 
            className="relative ml-2 flex items-center h-full"
            onMouseEnter={() => setLangMenuOpen(true)}
            onMouseLeave={() => setLangMenuOpen(false)}
          >
            <button 
              type="button" 
              className={`px-4 py-2 rounded-full font-semibold bg-transparent border-0 cursor-pointer transition-all duration-300 flex items-center gap-2 ${langMenuOpen ? 'bg-[var(--wb-item-hover)] text-[var(--wb-on-surface)]' : 'text-[var(--wb-on-surface-variant)] hover:bg-[var(--wb-item-hover)] hover:text-[var(--wb-on-surface)]'}`}
              aria-label="Switch language"
            >
              <img src={`https://hatscripts.github.io/circle-flags/flags/${currentLangData?.icon}.svg`} alt="" className="w-5 h-5 rounded-full" draggable="false" />
              <span className="uppercase">{currentLangData?.code}</span>
            </button>
            {langMenuOpen && (
              <div className="absolute top-[80%] right-0 mt-2 w-48 bg-[var(--wb-surface-container)] border border-[var(--wb-outline-variant)] rounded-2xl shadow-2xl flex flex-col py-2 z-50 overflow-hidden transform opacity-100 scale-100 transition-all origin-top-right">
                {LANGUAGES.map((l) => (
                  <button 
                    key={l.code} 
                    onClick={() => { i18n.changeLanguage(l.code); setLangMenuOpen(false); }} 
                    className="flex items-center justify-between px-4 py-3 hover:bg-[var(--wb-item-hover)] text-[var(--wb-on-surface)] font-medium transition-colors text-sm border-0 bg-transparent cursor-pointer w-full text-left"
                  >
                    <span>{l.name}</span>
                    <img src={`https://hatscripts.github.io/circle-flags/flags/${l.icon}.svg`} alt="" className="w-5 h-5 rounded-full drop-shadow-md" draggable="false" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex lg:hidden items-center">
          <button 
            type="button" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center justify-center w-10 h-10 rounded-full text-[var(--wb-on-surface)] hover:bg-[var(--wb-item-hover)] transition-all duration-300 bg-transparent border-0 cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isMobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Backdrop Overlay (Blur) */}
      <div 
        className={`fixed inset-0 top-0 bg-black/50 backdrop-blur-sm z-[1010] transition-opacity duration-300 lg:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Menu Panel (Sidebar) */}
      <div 
        className={`fixed top-0 right-0 bottom-0 w-[320px] max-w-[85vw] bg-[var(--wb-surface-container)] z-[1020] transition-transform duration-300 ease-out flex flex-col p-6 pt-16 overflow-y-auto lg:hidden shadow-2xl ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Close Button inside sidebar */}
        <button 
          type="button" 
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 rounded-full text-[var(--wb-on-surface)] hover:bg-[var(--wb-item-hover)] transition-all duration-300 bg-transparent border-0 cursor-pointer"
          aria-label="Close menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col gap-2 w-full mt-4">
          <Link href="/" className={getLinkClasses('/', true)} aria-current={pathname === '/' ? 'page' : undefined}>Home</Link>
          <Link href="/features/downloads" className={getLinkClasses('/features/downloads', true)} aria-current={pathname === '/features/downloads' ? 'page' : undefined}>Downloads</Link>
          <Link href="/features/news" className={getLinkClasses('/features/news', true)} aria-current={pathname === '/features/news' ? 'page' : undefined}>News</Link>
          <Link href="/features/ccredits" className={getLinkClasses('/features/ccredits', true)} aria-current={pathname === '/features/ccredits' ? 'page' : undefined}>Credits</Link>
        </div>

        <div className="w-full h-[1px] bg-[var(--wb-outline-variant)] my-6" />

        {/* Mobile Language Dropdown */}
        <div className="flex flex-col w-full mb-6">
          <span className="text-xs font-bold text-[var(--wb-on-surface-variant)] uppercase tracking-wider mb-3">Language</span>
          <div className="flex flex-col gap-1 bg-black/20 rounded-2xl p-2">
            {LANGUAGES.map((l) => (
              <button 
                key={l.code} 
                onClick={() => { i18n.changeLanguage(l.code); setIsMobileMenuOpen(false); }} 
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-colors text-sm border-0 cursor-pointer w-full text-left ${currentLangCode === l.code ? 'bg-[var(--wb-primary)] text-[var(--wb-surface-dim)] font-bold' : 'bg-transparent text-[var(--wb-on-surface)] hover:bg-[var(--wb-item-hover)] font-medium'}`}
              >
                <span>{l.name}</span>
                <img src={`https://hatscripts.github.io/circle-flags/flags/${l.icon}.svg`} alt="" className="w-5 h-5 rounded-full drop-shadow-md" draggable="false" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-around items-center w-full mt-auto pt-6 border-t border-[var(--wb-outline-variant)]">
          <a href="https://github.com/Crew-Awesome/Weekbox" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2 text-[var(--wb-on-surface-variant)] hover:text-[var(--wb-on-surface)] !no-underline" aria-label="GitHub">
            <svg height="32" width="32" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
            <span className="text-sm font-semibold">GitHub</span>
          </a>
          <a href="https://discord.gg/xQTtYF2Cfn" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2 text-[var(--wb-on-surface-variant)] hover:text-[#5865F2] !no-underline" aria-label="Discord">
            <svg height="32" width="32" viewBox="0 0 127.14 96.36" fill="currentColor"><path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.2,46,96.09,53,91.08,65.69,84.69,65.69Z"></path></svg>
            <span className="text-sm font-semibold">Discord</span>
          </a>
        </div>
      </div>
    </>
  );
}
