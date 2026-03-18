import React, { FC } from 'react';
import {
  TextInput,
  TextInputProps,
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { moderateScale, verticalScale } from '../utils/DeviceUtils';

export type InputProps = TextInputProps & {
  label?: string;
  helperText?: string;
  errorText?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
};

const INPUT_BORDER_RADIUS = 12;
const INPUT_MIN_HEIGHT = 44;

export const Input: FC<InputProps> = ({
  label,
  helperText,
  errorText,
  containerStyle,
  inputStyle,
  ...rest
}) => {
  const { theme } = useTheme();
  const hasError = Boolean(errorText);

  const colors = theme.colors;

  const borderColor = hasError ? colors.error : colors.border;
  const textColor = colors.text;
  const placeholderColor = colors.textSecondary;
  const labelColor = hasError ? colors.error : colors.textSecondary;
  const helperColor = hasError ? colors.error : colors.textSecondary;

  return (
    <View style={containerStyle}>
      {label ? (
        <Text
          style={[
            styles.label,
            {
              color: labelColor,
              marginBottom: theme.spacing.xs,
              fontSize: theme.typography.caption.fontSize,
              fontWeight: theme.typography.caption.fontWeight,
            },
          ]}
        >
          {label}
        </Text>
      ) : null}

      <View
        style={[
          styles.inputContainer,
          {
            borderColor,
            backgroundColor: colors.surface,
            paddingHorizontal: theme.spacing.md,
          },
        ]}
      >
        <TextInput
          placeholderTextColor={placeholderColor}
          style={[
            styles.input,
            {
              color: textColor,
              fontSize: theme.typography.body.body1.fontSize,
              minHeight: verticalScale(INPUT_MIN_HEIGHT),
            },
            inputStyle,
          ]}
          {...rest}
        />
      </View>

      {(helperText || errorText) && (
        <Text
          style={[
            styles.helper,
            {
              marginTop: theme.spacing.xs,
              color: helperColor,
              fontSize: theme.typography.caption.fontSize,
            },
          ]}
        >
          {errorText || helperText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: moderateScale(INPUT_BORDER_RADIUS),
    justifyContent: 'center',
  },
  input: {
    paddingVertical: verticalScale(10),
  },
  label: {
    textAlign: 'left',
  },
  helper: {
    textAlign: 'left',
  },
});
