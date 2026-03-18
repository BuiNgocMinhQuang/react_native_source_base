import React, { ReactNode } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/useTheme';

export type AppHeaderProps = {
  title?: string;
  canGoBack?: boolean;
  onPressBack?: () => void;
  right?: ReactNode;
};

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  canGoBack,
  onPressBack,
  right,
}) => {
  const { theme } = useTheme();

  return (
    <SafeAreaView
      edges={['top']}
      style={{ backgroundColor: theme.colors.background }}
    >
      <View style={[styles.container, { paddingHorizontal: theme.spacing.lg }]}>
        {canGoBack ? (
          <TouchableOpacity
            onPress={onPressBack}
            style={styles.side}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={[styles.backIcon, { color: theme.colors.text }]}>
              {'‹'}
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.side} />
        )}

        <Text
          style={[
            styles.title,
            {
              color: theme.colors.text,
              fontSize: theme.typography.heading.h3.fontSize,
              fontWeight: theme.typography.heading.h3.fontWeight,
            },
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>

        <View style={styles.side}>{right}</View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
  },
  side: {
    width: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 18,
  },
  title: {
    flex: 1,
    textAlign: 'center',
  },
});
