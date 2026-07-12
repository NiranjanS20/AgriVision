import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { router } from 'expo-router';
import { Colors } from '../../theme';
import { ScanCard } from '../../components/ScanCard';

export default function HistoryScreen() {
  const theme = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={{ fontWeight: '700', color: theme.colors.onBackground }}>Scan Timeline</Text>
        <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>Your recent AI disease predictions.</Text>
      </View>

      <View style={styles.timelineContainer}>
        {/* Timeline Item 1 */}
        <View style={styles.timelineItem}>
          <View style={styles.timelineNodeContainer}>
            <View style={[styles.timelineNode, { backgroundColor: theme.colors.error }]} />
            <View style={[styles.timelineLine, { backgroundColor: theme.colors.outline }]} />
          </View>
          <View style={styles.timelineContent}>
            <ScanCard 
              diseaseName="Turmeric Leaf Spot"
              severity="high"
              confidence={92}
              date="Today, 09:42 AM"
              style="timeline"
              onPress={() => router.push('/result')}
            />
          </View>
        </View>

        {/* Timeline Item 2 */}
        <View style={styles.timelineItem}>
          <View style={styles.timelineNodeContainer}>
            <View style={[styles.timelineNode, { backgroundColor: theme.colors.success }]} />
            <View style={[styles.timelineLine, { backgroundColor: theme.colors.outline }]} />
          </View>
          <View style={styles.timelineContent}>
            <ScanCard 
              diseaseName="Healthy Bajra"
              severity="none"
              confidence={98}
              date="Yesterday, 04:15 PM"
              style="timeline"
            />
          </View>
        </View>
        
        {/* End of timeline indicator */}
        <View style={styles.timelineItem}>
          <View style={styles.timelineNodeContainer}>
            <View style={[styles.timelineNode, { backgroundColor: theme.colors.outline, transform: [{ scale: 0.5 }] }]} />
          </View>
          <View style={styles.timelineContent} />
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 24, paddingTop: 48, paddingBottom: 16 },
  timelineContainer: { paddingHorizontal: 24 },
  timelineItem: { flexDirection: 'row' },
  timelineNodeContainer: { alignItems: 'center', width: 24, marginRight: 12 },
  timelineNode: { width: 12, height: 12, borderRadius: 6, marginTop: 4, zIndex: 2 },
  timelineLine: { width: 2, flex: 1, marginTop: 4, zIndex: 1 },
  timelineContent: { flex: 1 },
});
