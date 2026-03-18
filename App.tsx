import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/theme/ThemeProvider';
import { ToastProvider } from './src/components';
import { AppNavigator } from './src/navigation';
import { useSettingsStore } from './src/state/settingsStore';
import { i18n } from './src/i18n';

function App() {
  const { themeMode, explicitColorScheme } = useSettingsStore();
  const isDarkMode =
    themeMode === 'explicit' ? explicitColorScheme === 'dark' : false;

  const [i18nReady, setI18nReady] = useState(i18n.isInitialized);

  useEffect(() => {
    if (i18n.isInitialized) {
      return;
    }
    const handleInit = () => setI18nReady(true);
    i18n.on('initialized', handleInit);
    return () => {
      i18n.off('initialized', handleInit);
    };
  }, []);

  if (!i18nReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ThemeProvider mode={themeMode} colorScheme={explicitColorScheme}>
        <ToastProvider>
          <AppNavigator />
        </ToastProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
