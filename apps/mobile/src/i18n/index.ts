import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from './locales/en.json';
import fr from './locales/fr.json';

const resources = {
  en: { translation: en },
  fr: { translation: fr },
};

const LANGUAGE_KEY = 'settings.lang';

const initI18n = async () => {
  let savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
  
  if (!savedLanguage) {
    savedLanguage = Localization.getLocales()[0].languageCode;
  }

  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: savedLanguage || 'en',
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    });
};

initI18n();

export default i18n;
