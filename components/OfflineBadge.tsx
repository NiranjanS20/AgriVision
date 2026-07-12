import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { CloudSlash } from 'phosphor-react-native';
import { Colors } from '../theme';

export function OfflineBadge() {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <CloudSlash color={theme.colors.onPrimary} size={16} weight="bold" />
      <Text variant="labelSmall" style={styles.text}>Offline AI</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  text: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
