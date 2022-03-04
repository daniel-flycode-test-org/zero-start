import i18n from 'i18next';
import { format } from 'date-fns';
import { initReactI18next } from 'react-i18next';
import enUS from './lang/en-US.json';
import deDE from './lang/de-DE.json';
import esES from './lang/es-ES.json';

const resources = {
  'en-US': {
    translation: enUS
  },
  'de-DE': {
    translation: deDE
  },
  'es-ES': {
    translation: esES
  }
};

export const initializeI18n = (lng: string): void => {
  i18n.use(initReactI18next).init({
    resources,
    lng,
    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false,
      format(value, format_type) {
        if (value instanceof Date) return format(value, format_type);
        return value;
      }
    }
  });
};
