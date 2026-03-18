import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  PropsWithChildren,
} from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { UI } from '../constants/ui';

type ToastVariant = 'info' | 'success' | 'error';

type ToastOptions = {
  message: string;
  variant?: ToastVariant;
  durationMs?: number;
};

type ToastContextValue = {
  showToast: (options: ToastOptions) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return ctx;
};

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState<ToastVariant>('info');
  const [opacity] = useState(() => new Animated.Value(0));

  const showToast = useCallback(
    (options: ToastOptions) => {
      const { message: msg, variant: v = 'info', durationMs = 2000 } = options;

      setMessage(msg);
      setVariant(v);
      setVisible(true);

      opacity.setValue(0);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 160,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(opacity, {
            toValue: 0,
            duration: 160,
            useNativeDriver: true,
          }).start(() => {
            setVisible(false);
          });
        }, durationMs);
      });
    },
    [opacity],
  );

  const backgroundColor =
    variant === 'success'
      ? '#16A34A'
      : variant === 'error'
      ? theme.colors.error
      : theme.colors.surface;

  const textColor =
    variant === 'info' ? theme.colors.text : theme.colors.onPrimary;

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {visible && (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.container,
            {
              opacity,
            },
          ]}
        >
          <View
            style={[
              styles.toast,
              {
                backgroundColor,
                paddingHorizontal: theme.spacing.lg,
                paddingVertical: theme.spacing.sm,
              },
            ]}
          >
            <Text
              style={{
                color: textColor,
                fontSize: theme.typography.body.body2.fontSize,
              }}
            >
              {message}
            </Text>
          </View>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: UI.toast.bottomOffset,
    alignItems: 'center',
  },
  toast: {
    borderRadius: UI.toast.radius,
    maxWidth: '90%',
  },
});

