/**
 * Layout + scaling constants used across the design system.
 *
 * Keep all thresholds and scaling factors here to avoid "magic numbers"
 * being scattered across utilities and UI components.
 */

/**
 * Base design size used to compute responsive scaling.
 * Commonly matches a modern phone design artboard.
 */
export const BASE_WIDTH = 375;
export const BASE_HEIGHT = 812;

/**
 * Base spacing unit for the 8pt grid system.
 */
export const BASE_SPACING_UNIT = 8;

/**
 * Maximum UI scale factor.
 * Prevents components from becoming excessively large on big screens/tablets.
 */
export const MAX_UI_SCALE_FACTOR = 1.4;

/**
 * Tablet classification threshold in dp (density-independent pixels).
 * Uses the shortest side to support rotation.
 */
export const TABLET_MIN_SHORTEST_SIDE_DP = 600;

/**
 * Moderate scaling factors.
 * These control how strongly the scaled value influences the final result.
 */
export const DEFAULT_MODERATE_SCALE_FACTOR = 0.5;
export const FONT_MODERATE_SCALE_FACTOR = 0.5;
export const SPACING_MODERATE_SCALE_FACTOR = 0.3;

/**
 * Line-height multipliers per typography group.
 * Extracted as constants to keep typography consistent and maintainable.
 */
export const LINE_HEIGHT_MULTIPLIER_HEADING = 1.3;
export const LINE_HEIGHT_MULTIPLIER_BODY = 1.4;
export const LINE_HEIGHT_MULTIPLIER_CAPTION = 1.3;
export const LINE_HEIGHT_MULTIPLIER_BUTTON = 1.3;
