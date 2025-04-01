import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importació manual dels arxius de traducció
import enTranslation from './public/locales/en/common.json';
import caTranslation from './public/locales/ca/common.json';
import esTranslation from './public/locales/es/common.json';
import arTranslation from './public/locales/ar/common.json';
import bnTranslation from './public/locales/bn/common.json';
import chTranslation from './public/locales/ch/common.json';
import deTranslation from './public/locales/de/common.json';
import frTranslation from './public/locales/fr/common.json';
import hiTranslation from './public/locales/hi/common.json';
import jaTranslation from './public/locales/ja/common.json';
import koTranslation from './public/locales/ko/common.json';
import ptTranslation from './public/locales/pt/common.json';
import ruTranslation from './public/locales/ru/common.json';
import trTranslation from './public/locales/tr/common.json';

i18n
    .use(LanguageDetector)  // Manté la detecció de llengua
    .use(initReactI18next)   // Per integrar-se amb React
    .init({
        fallbackLng: 'en', // Idioma per defecte
        supportedLngs: ['en', 'ca', 'es', 'ar', 'bn', 'ch', 'de', 'fr', 'hi', 'ja', 'ko', 'pt', 'ru', 'tr'], // Llengües suportades
        resources: {
            en: { common: enTranslation },
            ca: { common: caTranslation },
            es: { common: esTranslation },
            ar: { common: arTranslation },
            bn: { common: bnTranslation },
            ch: { common: chTranslation },
            de: { common: deTranslation },
            fr: { common: frTranslation },
            hi: { common: hiTranslation },
            ja: { common: jaTranslation },
            ko: { common: koTranslation },
            pt: { common: ptTranslation },
            ru: { common: ruTranslation },
            tr: { common: trTranslation },

        },
        detection: {
            order: ['localStorage', 'cookie', 'navigator'],
            caches: ['localStorage', 'cookie'],
        },
        debug: false, // Desactiva els missatges de depuració
        interpolation: {
            escapeValue: false, // React ja s'encarrega de l'escapat de valors
        },
        react: {
            useSuspense: false, // Desactivar Suspense per SSR
        },
    });

export default i18n;
