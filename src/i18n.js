import i18n from 'i18n-js';
import { locale } from 'expo-localization';

import pt from './translations/pt.json';
import en from './translations/en.json';

i18n.translations = {
  en,
  pt,
};

i18n.locale = locale;
i18n.fallbacks = true;
