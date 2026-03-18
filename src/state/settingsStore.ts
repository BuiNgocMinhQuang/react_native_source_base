import { create } from 'zustand';
import { ThemeMode } from '../theme/ThemeProvider';
import { i18n } from '../i18n';

type Language = 'en' | 'vi';

type SettingsState = {
  themeMode: ThemeMode;
  explicitColorScheme: 'light' | 'dark';
  language: Language;
  setThemeMode: (mode: ThemeMode) => void;
  setExplicitColorScheme: (scheme: 'light' | 'dark') => void;
  setLanguage: (lang: Language) => void;
};

export const useSettingsStore = create<SettingsState>((set) => ({
  themeMode: 'explicit',
  explicitColorScheme: 'light',
  language: 'en',
  setThemeMode: (mode) => set({ themeMode: mode }),
  setExplicitColorScheme: (scheme) => set({ explicitColorScheme: scheme }),
  setLanguage: (lang) =>
    set(() => {
      i18n.changeLanguage(lang).catch(() => undefined);
      return { language: lang };
    }),
}));

