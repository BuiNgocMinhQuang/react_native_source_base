import { spacing as spacingUnit } from '../utils/DeviceUtils';

const SPACING_MULTIPLIERS = {
  xs: 0.5,
  sm: 1,
  md: 1.5,
  lg: 2,
  xl: 3,
  xxl: 4,
};

type SpacingSystem = {
  base: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  /**
   * Returns a spacing value based on a custom multiplier.
   * Use this when you need spacing that does not fit the predefined tokens.
   */
  scale: (multiplier: number) => number;
};

/**
 * 8pt grid based spacing system.
 * All values are derived from DeviceUtils.spacing, which ensures
 * spacing is consistent and responsive across devices.
 */
export const Spacing: SpacingSystem = {
  base: spacingUnit(SPACING_MULTIPLIERS.sm),
  xs: spacingUnit(SPACING_MULTIPLIERS.xs),
  sm: spacingUnit(SPACING_MULTIPLIERS.sm),
  md: spacingUnit(SPACING_MULTIPLIERS.md),
  lg: spacingUnit(SPACING_MULTIPLIERS.lg),
  xl: spacingUnit(SPACING_MULTIPLIERS.xl),
  xxl: spacingUnit(SPACING_MULTIPLIERS.xxl),
  scale: (multiplier: number) => spacingUnit(multiplier),
};
