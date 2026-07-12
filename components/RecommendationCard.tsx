import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme, Card, Divider } from 'react-native-paper';
import { CheckCircle } from 'phosphor-react-native';

interface RecommendationCardProps {
  recommendations: string[];
}

export function RecommendationCard({ recommendations }: RecommendationCardProps) {
  const theme = useTheme();

  return (
    <Card style={[styles.card, { backgroundColor: theme.colors.primary + '10' }]} mode="flat">
      <Card.Content>
        <View style={styles.row}>
          <CheckCircle color={theme.colors.primary} size={24} weight="fill" />
          <Text variant="titleMedium" style={[styles.cardTitle, { color: theme.colors.primary }]}>Recommended Treatment</Text>
        </View>
        <Divider style={{ marginVertical: 12, backgroundColor: theme.colors.primary + '30' }} />
        <View style={styles.list}>
          {recommendations.map((rec, index) => (
            <Text key={index} variant="bodyMedium" style={styles.listItem}>
              {index + 1}. {rec}
            </Text>
          ))}
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 24, marginBottom: 16 },
  row: { flexDirection: 'row', alignItems: 'center' },
  cardTitle: { fontWeight: '700', marginLeft: 8, marginBottom: 0 },
  list: { gap: 8 },
  listItem: { color: '#2A2A2A', lineHeight: 22 },
});
