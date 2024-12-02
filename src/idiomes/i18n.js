import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(HttpApi) // Carrega arxius de traducció
    .use(LanguageDetector) // Detecta l'idioma
    .use(initReactI18next) // Integra amb React
    .init({
        fallbackLng: 'en', // Idioma per defecte
        debug: true, // Per depurar a la consola
        interpolation: {
            escapeValue: false, // React ja escapa per defecte
        },
        backend: {
            loadPath: '/locales/{{lng}}/translation.json', // Ruta dinàmica segons l'idioma
        },
        detection: {
            order: ['localStorage', 'cookie', 'navigator'], // Ordre de detecció d'idioma
            caches: ['localStorage', 'cookie'], // Guarda l'idioma seleccionat
        },
    });

export default i18n;
