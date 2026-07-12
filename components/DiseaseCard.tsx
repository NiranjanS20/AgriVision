import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme, Card } from 'react-native-paper';
import { Colors } from '../theme';

interface DiseaseCardProps {
  title: string;
  scientificName: string;
  symptoms: string;
  treatment: string;
  colorHex: string;
}

export function DiseaseCard({ title, scientificName, symptoms, treatment, colorHex }: DiseaseCardProps) {
  const theme = useTheme();

  return (
    <Card style={styles.botanicalCard} mode="elevated" elevation={2}>
      <View style={[styles.cardImage, { backgroundColor: colorHex }]} />
      <Card.Content style={styles.cardContent}>
        <Text variant="titleLarge" style={styles.diseaseTitle}>{title}</Text>
        <Text variant="labelLarge" style={styles.scientificName}>{scientificName}</Text>
        
        <View style={styles.infoSection}>
          <Text variant="titleSmall" style={styles.infoTitle}>Symptoms</Text>
          <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>{symptoms}</Text>
        </View>
        
        <View style={styles.infoSection}>
          <Text variant="titleSmall" style={styles.infoTitle}>Treatment</Text>
          <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>{treatment}</Text>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  botanicalCard: { borderRadius: 24, overflow: 'hidden', backgroundColor: '#FFFFFF', marginBottom: 24 },
  cardImage: { height: 180, width: '100%' },
  cardContent: { padding: 20 },
  diseaseTitle: { fontWeight: '700', color: Colors.textPrimary },
  scientificName: { fontStyle: 'italic', color: Colors.textSecondary, marginBottom: 16 },
  infoSection: { marginBottom: 12 },
  infoTitle: { fontWeight: '600', color: Colors.textPrimary, marginBottom: 4 },
});
