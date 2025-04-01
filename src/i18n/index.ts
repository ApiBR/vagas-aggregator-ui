import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import es from './locales/es.json';
import pt from './locales/pt.json';
import it from './locales/it.json';

const savedLanguage = localStorage.getItem('language');
const browserLanguage = navigator.language.split('-')[0];
const supportedLanguages = ['en', 'es', 'pt', 'it'];

let defaultLanguage = 'en';
if (savedLanguage && supportedLanguages.includes(savedLanguage)) {
  defaultLanguage = savedLanguage;
} else if (supportedLanguages.includes(browserLanguage)) {
  defaultLanguage = browserLanguage;
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en
      },
      es: {
        translation: es
      },
      pt: {
        translation: pt
      },
      it: {
        translation: it
      }
    },
    lng: defaultLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;