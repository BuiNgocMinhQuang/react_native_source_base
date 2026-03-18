import React, { PropsWithChildren, createContext, useMemo } from 'react';
import { ColorSchemeName, useColorScheme } from 'react-native';
import { AppTheme, Theme } from './Theme';

export type ThemeMode = 'system' | 'explicit';

type ThemeContextValue = {
  /**
   * Fully-resolved theme for the current color scheme.
   */
  theme: AppTheme;
  /**
   * Current system color scheme as reported by React Native.
   */
  colorScheme: ColorSchemeName;
  /**
   * How the theme color scheme is determined:
   *
   * - 'system': follow OS light/dark mode via `useColorScheme()`.
   * - 'explicit': use the `colorScheme` passed in from code.
   */
  mode: ThemeMode;
};

export const ThemeContext = createContext<ThemeContextValue>({
  theme: Theme,
  colorScheme: 'light',
  mode: 'explicit',
});

export type ThemeProviderProps = PropsWithChildren<{
  /**
   * Theme selection strategy.
   *
   * - 'system': theme follows the device setting (light/dark).
   * - 'explicit': theme is controlled by the `colorScheme` prop.
   *
   * If omitted, defaults to 'explicit' so app code decides the theme.
   */
  mode?: ThemeMode;
  /**
   * Color scheme to use when `mode="explicit"`.
   *
   * - 'light' (default) for a light-first UI.
   * - 'dark' to force dark theme regardless of system settings.
   *
   * Ignored when `mode="system"`.
   */
  colorScheme?: Exclude<ColorSchemeName, null>;
}>;

/**
 * ThemeProvider wires the design system into React via context.
 *
 * Two main usage modes:
 *
 * 1) Follow system theme:
 *    <ThemeProvider mode="system">
 *      ...
 *    </ThemeProvider>
 *
 * 2) Control theme in code (default, light-first):
 *    // Light (default)
 *    <ThemeProvider>
 *    // or
 *    <ThemeProvider mode="explicit" colorScheme="light">
 *
 *    // Force dark
 *    <ThemeProvider mode="explicit" colorScheme="dark">
 *
 * - In 'system' mode, uses `useColorScheme()` to pick light/dark.
 * - In 'explicit' mode, uses the provided `colorScheme` (default 'light').
 * - Keeps typography + spacing stable, swaps only the colors palette.
 * - Makes it easy to extend later (e.g. app setting override, brand themes).
 */
export function ThemeProvider({
  children,
  mode = 'explicit',
  colorScheme: explicitScheme = 'light',
}: ThemeProviderProps) {
  const systemScheme = useColorScheme() ?? 'light';

  const effectiveMode: ThemeMode = mode;
  const effectiveScheme: ColorSchemeName =
    effectiveMode === 'system' ? systemScheme : explicitScheme;

  const theme = useMemo<AppTheme>(() => {
    const palette =
      effectiveScheme === 'dark'
        ? Theme.variants.dark.colors
        : Theme.variants.light.colors;

    return {
      ...Theme,
      colors: palette,
    };
  }, [effectiveScheme]);

  return (
    <ThemeContext.Provider
      value={{ theme, colorScheme: effectiveScheme, mode: effectiveMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
