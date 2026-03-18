import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/useTheme';
import { RootStackScreenProps } from '../navigation';

export const DetailsScreen = ({
  route,
}: RootStackScreenProps<'Details'>) => {
  const { theme } = useTheme();
  const { id } = route.params;

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
      edges={['top', 'bottom']}
    >
      <View style={[styles.container, { padding: theme.spacing.lg }]}>
        <Text
          style={{
            color: theme.colors.text,
            fontSize: theme.typography.heading.h2.fontSize,
            fontWeight: theme.typography.heading.h2.fontWeight,
          }}
        >
          Details
        </Text>
        <Text
          style={{
            marginTop: theme.spacing.md,
            color: theme.colors.textSecondary,
          }}
        >
          Item id: {id}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});

