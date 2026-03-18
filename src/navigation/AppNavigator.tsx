import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { AppHeader } from '../components';
import { HomeScreen } from '../screens/HomeScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { FormScreen } from '../screens/FormScreen';
import { DetailsScreen } from '../screens/DetailsScreen';

export type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
  Form: undefined;
  Details: { id: string };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const { t } = useTranslation('common');

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ navigation, route }) => {
          const title =
            route.name === 'Home'
              ? t('nav.home')
              : route.name === 'Form'
              ? t('nav.form')
              : route.name === 'Details'
              ? t('nav.details')
              : t('nav.settings');

          return {
            headerShown: true,
            header: (headerProps) => (
              <AppHeader
                title={title}
                canGoBack={headerProps.back !== undefined}
                onPressBack={navigation.goBack}
              />
            ),
          };
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          // options={{ title: t('nav.home') }}
        />
        <Stack.Screen
          name="Form"
          component={FormScreen}
          options={{
            title: t('nav.form'),
            headerBackTitle: '',
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            title: t('nav.details'),
            headerBackTitle: '',
          }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: t('nav.settings'),
            headerBackTitle: '',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
