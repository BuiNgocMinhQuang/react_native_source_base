import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FormInput } from '../components';
import { useTheme } from '../hooks/useTheme';
import { useToast } from '../components/ToastProvider';
import { submitExampleForm } from '../api/example';
import { apiCall } from '../api/client';
import { useTranslation } from 'react-i18next';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
});

type FormValues = z.infer<typeof formSchema>;

export const FormScreen = () => {
  const { theme } = useTheme();
  const { showToast } = useToast();
  const { t } = useTranslation('common');

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    const result = await apiCall(() => submitExampleForm(values));
    if (result.ok) {
      showToast({ message: t('form.submitSuccess'), variant: 'success' });
    } else {
      showToast({
        message: result.error.message || t('toast.apiError'),
        variant: 'error',
      });
    }
  };

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
              marginBottom: theme.spacing.lg,
            },
          ]}
        >
          {t('form.title')}
        </Text>

        <View style={{ marginBottom: theme.spacing.md }}>
          <FormInput<FormValues>
            control={control}
            name="name"
            label={t('form.nameLabel')}
            errorText={errors.name?.message}
          />
        </View>

        <View style={{ marginBottom: theme.spacing.lg }}>
          <FormInput<FormValues>
            control={control}
            name="email"
            label={t('form.emailLabel')}
            keyboardType="email-address"
            autoCapitalize="none"
            errorText={errors.email?.message}
          />
        </View>

        <Button
          title={isSubmitting ? t('form.submitting') : t('form.submit')}
          onPress={handleSubmit(onSubmit)}
          variant="primary"
          disabled={isSubmitting}
        />
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
});
