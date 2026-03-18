import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import enCommon from './locales/en/common.json';
import viCommon from './locales/vi/common.json';

const resources = {
  en: { common: enCommon },
  vi: { common: viCommon },
} as const;

type SupportedLocale = keyof typeof resources;

const FALLBACK_LOCALE: SupportedLocale = 'en';

const detectInitialLocale = (): SupportedLocale => {
  const locales = RNLocalize.getLocales();
  const first = locales[0]?.languageCode?.toLowerCase() as
    | SupportedLocale
    | undefined;

  if (first && Object.keys(resources).includes(first)) {
    return first;
  }

  return FALLBACK_LOCALE;
};

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      compatibilityJSON: 'v3',
      resources,
      lng: detectInitialLocale(),
      fallbackLng: FALLBACK_LOCALE,
      ns: ['common'],
      defaultNS: 'common',
      interpolation: {
        escapeValue: false,
      },
    })
    .catch(() => {
      // Silently ignore i18n init errors in base template.
    });
}

export { i18n };
