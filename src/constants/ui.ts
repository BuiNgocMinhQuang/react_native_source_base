import { moderateScale, verticalScale, font } from '../utils/DeviceUtils';

/**
 * Centralized UI tokens built on DeviceUtils scaling helpers.
 * Use these instead of raw numbers in shared UI components (header, modal, toast, etc).
 */

export const UI = {
  spacing: {
    xs: moderateScale(4),
    sm: moderateScale(8),
    md: moderateScale(12),
    lg: moderateScale(16),
  },
  header: {
    height: verticalScale(48),
    sideWidth: moderateScale(40),
    backIconSize: font(40),
    // horizontalPaddingHitSlop: moderateScale(8),
    hitSlop: {
      top: moderateScale(8),
      bottom: moderateScale(8),
      left: moderateScale(8),
      right: moderateScale(8),
    },
  },
  modal: {
    cardRadius: moderateScale(16),
    cardWidthPercent: '85%' as const,
  },
  toast: {
    bottomOffset: verticalScale(32),
    radius: moderateScale(999),
  },
};
