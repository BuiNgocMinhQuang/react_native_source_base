import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components';
import { useTheme } from '../hooks/useTheme';
import { useSettingsStore } from '../state/settingsStore';
import { useTranslation } from 'react-i18next';

export const SettingsScreen = () => {
  const { theme } = useTheme();
  const { t } = useTranslation('common');
  const {
    themeMode,
    explicitColorScheme,
    language,
    setThemeMode,
    setExplicitColorScheme,
    setLanguage,
  } = useSettingsStore();

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
      edges={['top', 'bottom']}
    >
      <View style={[styles.container, { padding: theme.spacing.lg }]}>
        <Text
          style={[
            styles.title,
            {
              color: theme.colors.text,
              fontSize: theme.typography.heading.h2.fontSize,
              fontWeight: theme.typography.heading.h2.fontWeight,
            },
          ]}
        >
          {t('settings.title')}
        </Text>

        <View style={{ marginTop: theme.spacing.lg }}>
          <Text
            style={[
              styles.sectionLabel,
              {
                color: theme.colors.textSecondary,
                marginBottom: theme.spacing.sm,
              },
            ]}
          >
            {t('settings.themeModeLabel', {
              mode: themeMode,
              scheme: explicitColorScheme,
            })}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, marginRight: theme.spacing.sm }}>
              <Button
                title={t('settings.system')}
                onPress={() => setThemeMode('system')}
                variant={themeMode === 'system' ? 'primary' : 'secondary'}
              />
            </View>
            <View style={{ flex: 1, marginLeft: theme.spacing.sm }}>
              <Button
                title={t('settings.explicit')}
                onPress={() => setThemeMode('explicit')}
                variant={themeMode === 'explicit' ? 'primary' : 'secondary'}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: theme.spacing.sm,
            }}
          >
            <View style={{ flex: 1, marginRight: theme.spacing.sm }}>
              <Button
                title={t('settings.light')}
                onPress={() => setExplicitColorScheme('light')}
                variant={
                  explicitColorScheme === 'light' ? 'primary' : 'secondary'
                }
              />
            </View>
            <View style={{ flex: 1, marginLeft: theme.spacing.sm }}>
              <Button
                title={t('settings.dark')}
                onPress={() => setExplicitColorScheme('dark')}
                variant={
                  explicitColorScheme === 'dark' ? 'primary' : 'secondary'
                }
              />
            </View>
          </View>
        </View>

        <View style={{ marginTop: theme.spacing.lg }}>
          <Text
            style={[
              styles.sectionLabel,
              {
                color: theme.colors.textSecondary,
                marginBottom: theme.spacing.sm,
              },
            ]}
          >
            {t('settings.languageLabel', { language })}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, marginRight: theme.spacing.sm }}>
              <Button
                title={t('settings.english')}
                onPress={() => setLanguage('en')}
                variant={language === 'en' ? 'primary' : 'secondary'}
              />
            </View>
            <View style={{ flex: 1, marginLeft: theme.spacing.sm }}>
              <Button
                title={t('settings.vietnamese')}
                onPress={() => setLanguage('vi')}
                variant={language === 'vi' ? 'primary' : 'secondary'}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'left',
  },
  sectionLabel: {
    textAlign: 'left',
  },
});

