import { Dimensions, PixelRatio, Platform, ScaledSize } from 'react-native';
import {
  BASE_HEIGHT,
  BASE_SPACING_UNIT,
  BASE_WIDTH,
  DEFAULT_MODERATE_SCALE_FACTOR,
  FONT_MODERATE_SCALE_FACTOR,
  MAX_UI_SCALE_FACTOR,
  SPACING_MODERATE_SCALE_FACTOR,
  TABLET_MIN_SHORTEST_SIDE_DP,
} from '../constants/layout';

/**
 * =========================================
 * 📐 BASE CONFIG
 * =========================================
 * Các hằng số base (artboard / spacing / thresholds) được gom về `src/constants/layout.ts`
 * để tránh "magic numbers" bị rải rác trong codebase.
 */

/**
 * =========================================
 * 📱 WINDOW
 * =========================================
 * Luôn lấy dynamic để hỗ trợ:
 * - rotate
 * - split screen
 * - foldable
 */
const getWindow = (): ScaledSize => {
  return Dimensions.get('window');
};

/**
 * Screen width (dynamic)
 */
export const screenWidth = (): number => {
  return getWindow().width;
};

/**
 * Screen height (dynamic)
 */
export const screenHeight = (): number => {
  return getWindow().height;
};

/**
 * =========================================
 * 📊 DEVICE INFO
 * =========================================
 */

/**
 * Pixel density
 */
export const getPixelRatio = (): number => {
  return PixelRatio.get();
};

/**
 * Platform check
 */
export const isIOS = (): boolean => Platform.OS === 'ios';
export const isAndroid = (): boolean => Platform.OS === 'android';

/**
 * =========================================
 * 📱 DEVICE TYPE
 * =========================================
 * Dựa theo Android guideline:
 * shortest side >= 600 → tablet
 */
export const isTablet = (): boolean => {
  const { width, height } = getWindow();
  const shortestSide = Math.min(width, height);
  const shortestSideDp = shortestSide / PixelRatio.get();
  return shortestSideDp >= TABLET_MIN_SHORTEST_SIDE_DP;
};

/**
 * =========================================
 * 📐 SCALE CORE
 * =========================================
 */

/**
 * Scale factor (uniform)
 * - dùng min(width, height)
 * - clamp để tránh quá to trên tablet
 */
const getScaleFactor = (): number => {
  const { width, height } = getWindow();

  const widthScale = width / BASE_WIDTH;
  const heightScale = height / BASE_HEIGHT;

  const scale = Math.min(widthScale, heightScale);

  return Math.min(scale, MAX_UI_SCALE_FACTOR);
};

/**
 * Scale chung cho mọi size
 */
export const scale = (size: number): number => {
  const scaled = size * getScaleFactor();
  return PixelRatio.roundToNearestPixel(scaled);
};

/**
 * Scale dọc (chỉ dùng khi cần)
 * ⚠️ Hạn chế lạm dụng để tránh lệch layout
 */
export const verticalScale = (size: number): number => {
  const { height } = getWindow();
  const heightScale = height / BASE_HEIGHT;

  const scaled = size * Math.min(heightScale, MAX_UI_SCALE_FACTOR);

  return PixelRatio.roundToNearestPixel(scaled);
};

/**
 * Scale trung gian (khuyến nghị dùng cho UI)
 */
export const moderateScale = (
  size: number,
  factor: number = DEFAULT_MODERATE_SCALE_FACTOR,
): number => {
  const scaled = scale(size);
  const moderated = size + (scaled - size) * factor;

  return PixelRatio.roundToNearestPixel(moderated);
};

/**
 * =========================================
 * 🔤 FONT
 * =========================================
 * Dùng moderateScale để tránh font quá to
 */
export const font = (size: number): number => {
  return moderateScale(size, FONT_MODERATE_SCALE_FACTOR);
};

/**
 * =========================================
 * 📦 SPACING (8pt grid)
 * =========================================
 * Scale nhẹ hơn font để UI không bị “giãn”
 */
export const spacing = (multiplier: number = 1): number => {
  const baseValue = BASE_SPACING_UNIT * multiplier;
  return moderateScale(baseValue, SPACING_MODERATE_SCALE_FACTOR);
};

/**
 * =========================================
 * 🔒 CLAMP
 * =========================================
 * Giới hạn size (rất quan trọng cho tablet)
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};
