import { font } from '../utils/DeviceUtils';
import {
  LINE_HEIGHT_MULTIPLIER_BODY,
  LINE_HEIGHT_MULTIPLIER_BUTTON,
  LINE_HEIGHT_MULTIPLIER_CAPTION,
  LINE_HEIGHT_MULTIPLIER_HEADING,
} from '../constants/layout';

const FONT_BASE_SIZES = {
  h1: 32,
  h2: 28,
  h3: 24,
  body1: 16,
  body2: 14,
  caption: 12,
  button: 16,
};

const FONT_WEIGHTS = {
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
} as const;

type FontWeightKey = keyof typeof FONT_WEIGHTS;

type TextStyleDefinition = {
  fontSize: number;
  fontWeight: (typeof FONT_WEIGHTS)[FontWeightKey];
  lineHeight?: number;
};

type TypographySystem = {
  heading: {
    h1: TextStyleDefinition;
    h2: TextStyleDefinition;
    h3: TextStyleDefinition;
  };
  body: {
    body1: TextStyleDefinition;
    body2: TextStyleDefinition;
  };
  caption: TextStyleDefinition;
  button: TextStyleDefinition;
  weights: typeof FONT_WEIGHTS;
};

/**
 * Centralized typography system for the app.
 * All font sizes are scaled using DeviceUtils.font to maintain
 * visual consistency across different screen sizes and densities.
 */
export const Typography: TypographySystem = {
  heading: {
    h1: {
      fontSize: font(FONT_BASE_SIZES.h1),
      fontWeight: FONT_WEIGHTS.bold,
      lineHeight: font(FONT_BASE_SIZES.h1 * LINE_HEIGHT_MULTIPLIER_HEADING),
    },
    h2: {
      fontSize: font(FONT_BASE_SIZES.h2),
      fontWeight: FONT_WEIGHTS.bold,
      lineHeight: font(FONT_BASE_SIZES.h2 * LINE_HEIGHT_MULTIPLIER_HEADING),
    },
    h3: {
      fontSize: font(FONT_BASE_SIZES.h3),
      fontWeight: FONT_WEIGHTS.semiBold,
      lineHeight: font(FONT_BASE_SIZES.h3 * LINE_HEIGHT_MULTIPLIER_HEADING),
    },
  },
  body: {
    body1: {
      fontSize: font(FONT_BASE_SIZES.body1),
      fontWeight: FONT_WEIGHTS.regular,
      lineHeight: font(FONT_BASE_SIZES.body1 * LINE_HEIGHT_MULTIPLIER_BODY),
    },
    body2: {
      fontSize: font(FONT_BASE_SIZES.body2),
      fontWeight: FONT_WEIGHTS.regular,
      lineHeight: font(FONT_BASE_SIZES.body2 * LINE_HEIGHT_MULTIPLIER_BODY),
    },
  },
  caption: {
    fontSize: font(FONT_BASE_SIZES.caption),
    fontWeight: FONT_WEIGHTS.regular,
    lineHeight: font(FONT_BASE_SIZES.caption * LINE_HEIGHT_MULTIPLIER_CAPTION),
  },
  button: {
    fontSize: font(FONT_BASE_SIZES.button),
    fontWeight: FONT_WEIGHTS.semiBold,
    lineHeight: font(FONT_BASE_SIZES.button * LINE_HEIGHT_MULTIPLIER_BUTTON),
  },
  weights: FONT_WEIGHTS,
};
