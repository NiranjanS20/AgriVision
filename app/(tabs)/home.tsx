import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, useTheme, Card, Button } from 'react-native-paper';
import { router } from 'expo-router';
import { Scan, Leaf } from 'phosphor-react-native';
import { OfflineBadge } from '../../components/OfflineBadge';
import { ModelBadge } from '../../components/ModelBadge';
import { ScanCard } from '../../components/ScanCard';

export default function HomeScreen() {
  const theme = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <View>
          <Text variant="titleLarge" style={{ fontWeight: '700', color: theme.colors.onBackground }}>Good Morning,</Text>
          <Text variant="bodyLarge" style={{ color: theme.colors.onSurfaceVariant }}>AI Plant Doctor is Ready</Text>
        </View>
        <OfflineBadge />
      </View>

      <Card style={styles.scanCard} mode="elevated" elevation={2}>
        <Card.Content style={styles.scanContent}>
          <View style={styles.scanIconWrapper}>
            <Scan color={theme.colors.primary} size={48} weight="duotone" />
          </View>
          <Text variant="titleMedium" style={styles.scanTitle}>Detect Crop Disease</Text>
          <Text variant="bodyMedium" style={styles.scanDesc}>
            Take a photo of a leaf to instantly detect diseases using our offline AI model.
          </Text>
          <Button 
            mode="contained" 
            onPress={() => router.push('/camera')}
            style={styles.scanButton}
            icon="camera"
          >
            Quick Scan
          </Button>
        </Card.Content>
      </Card>

      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>Supported Crops</Text>
        <View style={styles.cropsRow}>
          <Card style={[styles.cropCard, { backgroundColor: theme.colors.surfaceVariant }]} mode="flat">
            <Card.Content style={styles.cropCardContent}>
              <View style={[styles.cropIconBg, { backgroundColor: theme.colors.tertiary + '33' }]}>
                <Leaf color={theme.colors.tertiary} size={24} weight="fill" />
              </View>
              <Text variant="labelLarge" style={{ marginTop: 12, fontWeight: '600' }}>Turmeric</Text>
            </Card.Content>
          </Card>
          
          <Card style={[styles.cropCard, { backgroundColor: theme.colors.surfaceVariant }]} mode="flat">
            <Card.Content style={styles.cropCardContent}>
              <View style={[styles.cropIconBg, { backgroundColor: '#8B6B4733' }]}>
                <Leaf color="#8B6B47" size={24} weight="fill" />
              </View>
              <Text variant="labelLarge" style={{ marginTop: 12, fontWeight: '600' }}>Bajra</Text>
            </Card.Content>
          </Card>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.rowBetween}>
          <Text variant="titleMedium" style={styles.sectionTitle}>Recent Scan</Text>
          <Button mode="text" onPress={() => router.push('/(tabs)/history')} compact>View All</Button>
        </View>
        <ScanCard 
          diseaseName="Turmeric Leaf Spot"
          severity="high"
          confidence={92}
          date="Today, 09:42 AM"
          onPress={() => router.push('/result')}
          style="dashboard"
        />
      </View>

      <View style={styles.footer}>
        <ModelBadge />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 32,
  },
  scanCard: {
    borderRadius: 24,
    marginBottom: 32,
  },
  scanContent: {
    alignItems: 'center',
    padding: 24,
  },
  scanIconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2F6B3B1A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  scanTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  scanDesc: {
    textAlign: 'center',
    color: '#6D6D6D',
    marginBottom: 24,
  },
  scanButton: {
    width: '100%',
    borderRadius: 100,
    paddingVertical: 4,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontWeight: '700',
    marginBottom: 16,
  },
  cropsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  cropCard: {
    flex: 1,
    borderRadius: 16,
  },
  cropCardContent: {
    alignItems: 'center',
    padding: 16,
  },
  cropIconBg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footer: {
    marginTop: 16,
    marginBottom: 48,
  }
});
