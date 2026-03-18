import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
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

const StackHeader = ({ navigation, route, back }: NativeStackHeaderProps) => {
  const { t } = useTranslation('common');

  const title =
    route.name === 'Home'
      ? t('nav.home')
      : route.name === 'Form'
      ? t('nav.form')
      : route.name === 'Details'
      ? t('nav.details')
      : t('nav.settings');

  return (
    <AppHeader
      title={title}
      canGoBack={Boolean(back)}
      onPressBack={navigation.goBack}
    />
  );
};

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          header: StackHeader,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Form" component={FormScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
