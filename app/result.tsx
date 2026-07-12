import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, useTheme, Card, Button } from 'react-native-paper';
import { router } from 'expo-router';
import { Cpu, Database, Timer, WarningCircle } from 'phosphor-react-native';
import { Colors } from '../theme';
import { ConfidenceGauge } from '../components/ConfidenceGauge';
import { SeverityGauge } from '../components/SeverityGauge';
import { RecommendationCard } from '../components/RecommendationCard';

export default function ResultScreen() {
  const theme = useTheme();
  const [activeImage, setActiveImage] = useState<'original' | 'enhanced' | 'heatmap'>('heatmap');

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]} showsVerticalScrollIndicator={false}>
      <View style={styles.heroSection}>
        <View style={[styles.imagePlaceholder, { backgroundColor: theme.colors.surfaceVariant }]}>
          <Text style={{ color: theme.colors.onSurfaceVariant }}>
            {activeImage === 'original' && 'Original Image'}
            {activeImage === 'enhanced' && 'Enhanced Image'}
            {activeImage === 'heatmap' && 'GradCAM Heatmap Overlay'}
          </Text>
        </View>
        <View style={styles.imageControls}>
          <Button 
            mode={activeImage === 'original' ? 'contained-tonal' : 'text'} 
            onPress={() => setActiveImage('original')}
            compact
          >
            Original
          </Button>
          <Button 
            mode={activeImage === 'enhanced' ? 'contained-tonal' : 'text'} 
            onPress={() => setActiveImage('enhanced')}
            compact
          >
            Enhanced
          </Button>
          <Button 
            mode={activeImage === 'heatmap' ? 'contained-tonal' : 'text'} 
            onPress={() => setActiveImage('heatmap')}
            compact
          >
            Heatmap
          </Button>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={[styles.badge, { backgroundColor: theme.colors.error + '20' }]}>
            <WarningCircle color={theme.colors.error} size={16} weight="bold" />
            <Text style={[styles.badgeText, { color: theme.colors.error }]}>High Severity</Text>
          </View>
          <Text variant="headlineMedium" style={styles.title}>Turmeric Leaf Spot</Text>
          <Text variant="titleMedium" style={styles.subtitle}>(Colletotrichum capsici)</Text>
        </View>

        <Card style={styles.card} mode="elevated" elevation={1}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.cardTitle}>AI Justification</Text>
            <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant, marginBottom: 16 }}>
              Most influential regions identified around the leaf edges and scattered necrotic lesions. The hybrid model identified characteristic concentric rings within the spots.
            </Text>
            
            <View style={styles.metricsRow}>
              <ConfidenceGauge confidence={98} />
              <View style={styles.metricDivider} />
              <SeverityGauge severity="high" />
            </View>
          </Card.Content>
        </Card>

        <RecommendationCard 
          recommendations={[
            "Remove and destroy infected leaves immediately.",
            "Apply appropriate fungicides (e.g., Mancozeb or Carbendazim) as per agricultural guidelines.",
            "Improve field drainage to reduce humidity."
          ]} 
        />

        <Card style={styles.card} mode="outlined">
          <Card.Content>
            <Text variant="titleSmall" style={{ fontWeight: '700', marginBottom: 16 }}>Research Details</Text>
            
            <View style={styles.detailRow}>
              <View style={styles.row}>
                <Cpu color={theme.colors.onSurfaceVariant} size={20} />
                <Text variant="bodyMedium" style={styles.detailText}>Model Architecture</Text>
              </View>
              <Text variant="labelLarge" style={{ fontWeight: '600' }}>Hybrid CNN-ViT</Text>
            </View>
            
            <View style={styles.detailRow}>
              <View style={styles.row}>
                <Database color={theme.colors.onSurfaceVariant} size={20} />
                <Text variant="bodyMedium" style={styles.detailText}>TFLite Size</Text>
              </View>
              <Text variant="labelLarge" style={{ fontWeight: '600' }}>1.9 MB</Text>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.row}>
                <Timer color={theme.colors.onSurfaceVariant} size={20} />
                <Text variant="bodyMedium" style={styles.detailText}>Inference Time</Text>
              </View>
              <Text variant="labelLarge" style={{ fontWeight: '600' }}>172 ms</Text>
            </View>
          </Card.Content>
        </Card>

        <View style={styles.actions}>
          <Button mode="contained" onPress={() => router.push('/(tabs)/history')} style={styles.primaryBtn}>
            Save to History
          </Button>
          <Button mode="outlined" onPress={() => router.push('/camera')} style={styles.secondaryBtn}>
            Scan Another
          </Button>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  heroSection: { padding: 16, paddingTop: 48, backgroundColor: '#EAE7E0' },
  imagePlaceholder: { width: '100%', height: 300, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  imageControls: { flexDirection: 'row', justifyContent: 'center', gap: 8 },
  content: { padding: 24 },
  header: { marginBottom: 24 },
  badge: { flexDirection: 'row', alignSelf: 'flex-start', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, gap: 6, marginBottom: 12 },
  badgeText: { fontWeight: 'bold', fontSize: 12 },
  title: { fontWeight: '700', color: Colors.textPrimary },
  subtitle: { fontStyle: 'italic', color: Colors.textSecondary },
  card: { borderRadius: 24, marginBottom: 16 },
  cardTitle: { fontWeight: '700', marginBottom: 8 },
  metricsRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingTop: 16, borderTopWidth: 1, borderColor: '#EAE7E0' },
  metricDivider: { width: 1, height: 40, backgroundColor: '#EAE7E0' },
  row: { flexDirection: 'row', alignItems: 'center' },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  detailText: { marginLeft: 8, color: Colors.textSecondary },
  actions: { marginTop: 16, marginBottom: 40, gap: 12 },
  primaryBtn: { borderRadius: 100, paddingVertical: 4 },
  secondaryBtn: { borderRadius: 100, paddingVertical: 4 }
});
