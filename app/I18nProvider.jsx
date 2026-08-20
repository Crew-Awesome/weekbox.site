'use client';

import { I18nextProvider } from 'react-i18next';
import { useEffect, useLayoutEffect, useState } from 'react';
import i18n from '../i18n';

// useLayoutEffect runs synchronously before the browser paints.
// This allows us to pass hydration (which renders English) and immediately swap to Spanish
// before the user's eyes ever see the English text, eliminating the flicker.
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function I18nProvider({ children }) {
  const [mounted, setMounted] = useState(false);

  useIsomorphicLayoutEffect(() => {
    // Usamos una clave nueva para evitar conflictos con el caché viejo de i18next
    const savedLang = localStorage.getItem('weekbox_lang');
    
    if (savedLang && ['en', 'es'].includes(savedLang)) {
      if (i18n.language !== savedLang) {
        i18n.changeLanguage(savedLang);
      }
    } else {
      const browserLang = (navigator.language || 'en').split('-')[0];
      const targetLang = ['en', 'es'].includes(browserLang) ? browserLang : 'en';
      
      if (i18n.language !== targetLang) {
        i18n.changeLanguage(targetLang);
      }
    }

    const handleLangChange = (lng) => {
      localStorage.setItem('weekbox_lang', lng);
    };

    i18n.on('languageChanged', handleLangChange);
    setMounted(true);

    return () => {
      i18n.off('languageChanged', handleLangChange);
    };
  }, []);

  return (
    <div style={{ visibility: mounted ? 'visible' : 'hidden' }}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </div>
  );
}
