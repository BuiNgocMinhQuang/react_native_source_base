import React, { FC } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { moderateScale, verticalScale } from '../utils/DeviceUtils';
import { AppColors } from '../theme/Theme';
import { useTheme } from '../hooks/useTheme';

type ButtonVariant = 'primary' | 'secondary';

type ButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

const BUTTON_BORDER_RADIUS = 12;
const BUTTON_MIN_HEIGHT = 44;

/**
 * Returns style overrides for the selected button variant.
 * This keeps visual variants centralized and easy to extend.
 */
const getVariantStyles = (
  colors: AppColors,
  variant: ButtonVariant,
  disabled?: boolean,
) => {
  if (variant === 'secondary') {
    return {
      container: {
        backgroundColor: disabled ? colors.surface : colors.background,
        borderColor: disabled ? colors.border : colors.primary,
      },
      text: {
        color: disabled ? colors.textSecondary : colors.primary,
      },
    };
  }

  return {
    container: {
      backgroundColor: disabled ? colors.border : colors.primary,
      borderColor: disabled ? colors.border : colors.primary,
    },
    text: {
      color: disabled ? colors.textSecondary : colors.onPrimary,
    },
  };
};

/**
 * Reusable themed button component.
 * Uses the global Theme for typography, colors, and spacing,
 * and DeviceUtils for responsive sizing.
 */
export const Button: FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
  textStyle,
}) => {
  const { theme } = useTheme();
  const variantStyles = getVariantStyles(theme.colors, variant, disabled);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.container,
        {
          backgroundColor: variantStyles.container.backgroundColor,
          borderColor: variantStyles.container.borderColor,
          paddingHorizontal: theme.spacing.lg,
          paddingVertical: theme.spacing.sm,
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: variantStyles.text.color,
            fontSize: theme.typography.button.fontSize,
            fontWeight: theme.typography.button.fontWeight,
          },
          textStyle,
        ]}
        numberOfLines={1}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: verticalScale(BUTTON_MIN_HEIGHT),
    borderRadius: moderateScale(BUTTON_BORDER_RADIUS),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
  },
  text: {
    textAlign: 'center',
  },
});
