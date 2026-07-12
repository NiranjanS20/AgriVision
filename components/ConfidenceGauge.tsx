import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

interface ConfidenceGaugeProps {
  confidence: number;
}

export function ConfidenceGauge({ confidence }: ConfidenceGaugeProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text variant="displaySmall" style={[styles.value, { color: theme.colors.primary }]}>{confidence}%</Text>
      <Text variant="labelMedium" style={{ color: theme.colors.onSurfaceVariant }}>Confidence</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  value: { fontWeight: '700' },
});
