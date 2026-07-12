import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

interface SeverityGaugeProps {
  severity: 'high' | 'medium' | 'low' | 'none';
}

export function SeverityGauge({ severity }: SeverityGaugeProps) {
  const theme = useTheme();

  const getColor = () => {
    switch (severity) {
      case 'high': return theme.colors.error;
      case 'medium': return theme.colors.warning;
      case 'none': return theme.colors.success;
      default: return theme.colors.primary;
    }
  };

  const getText = () => {
    switch (severity) {
      case 'high': return 'High';
      case 'medium': return 'Medium';
      case 'none': return 'None';
      default: return 'Low';
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="displaySmall" style={[styles.value, { color: getColor() }]}>{getText()}</Text>
      <Text variant="labelMedium" style={{ color: theme.colors.onSurfaceVariant }}>Severity</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  value: { fontWeight: '700' },
});
