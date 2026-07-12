import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, useTheme, Card } from 'react-native-paper';
import { Leaf, WarningCircle, CheckCircle, ClockCounterClockwise } from 'phosphor-react-native';

interface ScanCardProps {
  diseaseName: string;
  severity: 'high' | 'medium' | 'low' | 'none';
  confidence: number;
  date: string;
  onPress?: () => void;
  style?: 'timeline' | 'dashboard';
}

export function ScanCard({ diseaseName, severity, confidence, date, onPress, style = 'dashboard' }: ScanCardProps) {
  const theme = useTheme();

  const getSeverityColor = () => {
    switch (severity) {
      case 'high': return theme.colors.error;
      case 'medium': return theme.colors.warning;
      case 'none': return theme.colors.success;
      default: return theme.colors.primary;
    }
  };

  const getSeverityText = () => {
    switch (severity) {
      case 'high': return `High Severity (${confidence}%)`;
      case 'medium': return `Medium Severity (${confidence}%)`;
      case 'none': return `No Disease Detected (${confidence}%)`;
      default: return `Low Severity (${confidence}%)`;
    }
  };

  const content = (
    <Card.Content style={styles.cardContent}>
      <View style={[styles.imagePlaceholder, { backgroundColor: theme.colors.surfaceVariant }]}>
        <Leaf color={theme.colors.outline} size={24} />
      </View>
      <View style={styles.details}>
        <Text variant="titleMedium" style={{ fontWeight: '700' }}>{diseaseName}</Text>
        
        <View style={styles.row}>
          {severity === 'none' ? (
            <CheckCircle color={getSeverityColor()} size={16} weight="bold" />
          ) : (
            <WarningCircle color={getSeverityColor()} size={16} weight="bold" />
          )}
          <Text variant="bodySmall" style={{ color: getSeverityColor(), marginLeft: 4 }}>
            {getSeverityText()}
          </Text>
        </View>

        {style === 'dashboard' && (
          <View style={styles.recentDate}>
            <ClockCounterClockwise color={theme.colors.onSurfaceVariant} size={12} />
            <Text variant="labelSmall" style={{ color: theme.colors.onSurfaceVariant, marginLeft: 4 }}>{date}</Text>
          </View>
        )}
      </View>
    </Card.Content>
  );

  if (style === 'timeline') {
    return (
      <View style={styles.timelineWrapper}>
        <Text variant="labelMedium" style={styles.dateLabel}>{date}</Text>
        <Card style={styles.card} mode="elevated" elevation={1} onPress={onPress}>
          {content}
        </Card>
      </View>
    );
  }

  return (
    <Card style={[styles.card, styles.dashboardCard]} mode="outlined" onPress={onPress}>
      {content}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 16 },
  dashboardCard: { borderColor: '#EAE7E0' },
  cardContent: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 16 },
  imagePlaceholder: { width: 60, height: 60, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  details: { flex: 1 },
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  recentDate: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  timelineWrapper: { paddingBottom: 24 },
  dateLabel: { color: '#6D6D6D', marginBottom: 8 },
});
