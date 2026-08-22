'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations synchronously to avoid Next.js hydration mismatch
import enTranslation from './public/locales/en/translation.json';
import esTranslation from './public/locales/es/translation.json';
import frTranslation from './public/locales/fr/translation.json';
import zhTranslation from './public/locales/zh/translation.json';
import trTranslation from './public/locales/tr/translation.json';
import itTranslation from './public/locales/it/translation.json';
import ptTranslation from './public/locales/pt/translation.json';
import deTranslation from './public/locales/de/translation.json';
import idTranslation from './public/locales/id/translation.json';
import ruTranslation from './public/locales/ru/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      es: { translation: esTranslation },
      fr: { translation: frTranslation },
      zh: { translation: zhTranslation },
      tr: { translation: trTranslation },
      it: { translation: itTranslation },
      pt: { translation: ptTranslation },
      de: { translation: deTranslation },
      id: { translation: idTranslation },
      ru: { translation: ruTranslation }
    },
    lng: 'en', // Force English on initial render for perfect SSR hydration
    fallbackLng: 'en',
    supportedLngs: ['en', 'es', 'fr', 'zh', 'tr', 'it', 'pt', 'de', 'id', 'ru'],
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });

export default i18n;
