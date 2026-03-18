import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, ConfirmDialog, Input } from '../components';
import { useTheme } from '../hooks/useTheme';
import { useToast } from '../components/ToastProvider';
import { useTranslation } from 'react-i18next';
import { RootStackScreenProps } from '../navigation';

/**
 * Example screen used as a starter template.
 * Demonstrates how to consume the design system (theme + spacing + typography)
 * and reusable components.
 */
export function HomeScreen({ navigation }: RootStackScreenProps<'Home'>) {
  const { theme, colorScheme } = useTheme();
  const { t } = useTranslation('common');
  const { showToast } = useToast();

  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState('');

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
              lineHeight: theme.typography.heading.h2.lineHeight,
            },
          ]}
        >
          {t('home.title')}
        </Text>

        <Text
          style={[
            styles.subtitle,
            {
              color: theme.colors.textSecondary,
              fontSize: theme.typography.body.body1.fontSize,
              fontWeight: theme.typography.body.body1.fontWeight,
              lineHeight: theme.typography.body.body1.lineHeight,
              marginTop: theme.spacing.xs,
              marginBottom: theme.spacing.lg,
            },
          ]}
        >
          {t('home.themeLabel', { scheme: colorScheme ?? 'light' })}
        </Text>

        <View style={{ marginBottom: theme.spacing.lg }}>
          <Input
            label={t('home.inputLabel')}
            placeholder={t('home.inputPlaceholder')}
            value={text}
            onChangeText={setText}
          />
        </View>

        <View>
          <View style={{ marginBottom: theme.spacing.sm }}>
            <Button
              title={t('home.primaryButton')}
              onPress={() =>
                showToast({
                  message: t('toast.info'),
                  variant: 'info',
                })
              }
              variant="primary"
            />
          </View>
          <View style={{ marginBottom: theme.spacing.sm }}>
            <Button
              title={t('home.secondaryButton')}
              onPress={() => setModalVisible(true)}
              variant="secondary"
            />
          </View>
          <Button
            title={t('home.disabledButton')}
            onPress={() => {}}
            variant="primary"
            disabled
          />
        </View>

        <View style={{ marginTop: theme.spacing.lg }}>
          <View style={{ marginBottom: theme.spacing.sm }}>
            <Button
              title={t('home.goToForm')}
              onPress={() => navigation.navigate('Form')}
              variant="secondary"
            />
          </View>
          <View style={{ marginBottom: theme.spacing.sm }}>
            <Button
              title={t('home.goToDetails')}
              onPress={() => navigation.navigate('Details', { id: '123' })}
              variant="secondary"
            />
          </View>
          <Button
            title={t('home.goToSettings')}
            onPress={() => navigation.navigate('Settings')}
            variant="secondary"
          />
        </View>

        <ConfirmDialog
          visible={modalVisible}
          title={t('modal.title')}
          message={t('modal.message')}
          cancelLabel={t('modal.cancel')}
          confirmLabel={t('modal.confirm')}
          onCancel={() => setModalVisible(false)}
          onConfirm={() => {
            setModalVisible(false);
            showToast({
              message: t('toast.info'),
              variant: 'success',
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
}

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
  subtitle: {
    textAlign: 'left',
  },
});

