import React, { ReactNode } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/useTheme';
import { UI } from '../constants/ui';

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
            hitSlop={UI.header.hitSlop}
          >
            <Text style={[styles.backIcon, { color: theme.colors.text }]}>
              {'‹'}
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.side} />
        )}

        <View
          pointerEvents="none"
          style={[
            styles.titleContainer,
            {
              left: theme.spacing.lg + UI.header.sideWidth,
              right: theme.spacing.lg + UI.header.sideWidth,
            },
          ]}
        >
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
        </View>

        <View style={[styles.side, styles.rightSide]}>{right}</View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: UI.header.height,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  side: {
    width: UI.header.sideWidth,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  rightSide: {
    alignItems: 'flex-end',
  },
  backIcon: {
    fontSize: UI.header.backIconSize,
  },
  titleContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
  },
});
