import { Typography } from './Typography';
import { Spacing } from './Spacing';

const lightColors = {
  primary: '#0066FF',
  secondary: '#FF8A00',
  background: '#FFFFFF',
  surface: '#F5F7FA',
  text: '#111827',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  error: '#EF4444',
  onPrimary: '#FFFFFF',
  onSecondary: '#111827',
  onBackground: '#111827',
  onSurface: '#111827',
};

const darkColors = {
  primary: '#4F9BFF',
  secondary: '#FFC56A',
  background: '#020617',
  surface: '#0F172A',
  text: '#F9FAFB',
  textSecondary: '#9CA3AF',
  border: '#1F2933',
  error: '#F87171',
  onPrimary: '#020617',
  onSecondary: '#020617',
  onBackground: '#F9FAFB',
  onSurface: '#F9FAFB',
};

type ColorPalette = typeof lightColors;

type ThemeVariant = {
  colors: ColorPalette;
};

type ThemeObject = {
  colors: ColorPalette;
  typography: typeof Typography;
  spacing: typeof Spacing;
  /**
   * Variants allow easy extension for multiple themes
   * such as light, dark, and brand-specific themes.
   */
  variants: {
    light: ThemeVariant;
    dark: ThemeVariant;
  };
};

/**
 * Global theme object for the application.
 * Combines colors, typography, and spacing into a single source of truth
 * that can be consumed across screens and components.
 */
export const Theme: ThemeObject = {
  colors: lightColors,
  typography: Typography,
  spacing: Spacing,
  variants: {
    light: {
      colors: lightColors,
    },
    dark: {
      colors: darkColors,
    },
  },
};

export type AppTheme = ThemeObject;
export type AppColors = ColorPalette;
