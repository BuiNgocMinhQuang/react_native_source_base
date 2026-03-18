import { useContext } from 'react';
import { ThemeContext } from '../theme/ThemeProvider';

/**
 * useTheme returns the resolved design system tokens for the current app theme.
 * Components should prefer this hook over importing `Theme` directly so that
 * runtime theme switching (light/dark) works automatically.
 */
export const useTheme = () => {
  return useContext(ThemeContext);
};

