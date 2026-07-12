import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, useTheme, Card, Divider } from 'react-native-paper';
import { Database, Cpu, HardDrives, Info, GraduationCap } from 'phosphor-react-native';

export default function ProfileScreen() {
  const theme = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: theme.colors.primary }]}>
          <Text style={{ color: 'white', fontWeight: '700', fontSize: 24 }}>IB</Text>
        </View>
        <Text variant="headlineSmall" style={{ fontWeight: '700', color: theme.colors.onBackground }}>IIT Bombay</Text>
        <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>Research Fellowship Project</Text>
      </View>

      <View style={styles.content}>
        <Text variant="titleMedium" style={styles.sectionTitle}>System Details</Text>
        
        <Card style={styles.card} mode="outlined">
          <Card.Content style={styles.cardContent}>
            
            <View style={styles.row}>
              <View style={styles.iconBox}>
                <Database color={theme.colors.onSurfaceVariant} size={20} />
              </View>
              <View style={styles.detailTextContainer}>
                <Text variant="bodyLarge" style={styles.detailTitle}>Offline Model Version</Text>
                <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>v2.4.1 (Hybrid CNN-ViT)</Text>
              </View>
            </View>
            
            <Divider style={styles.divider} />
            
            <View style={styles.row}>
              <View style={styles.iconBox}>
                <Cpu color={theme.colors.onSurfaceVariant} size={20} />
              </View>
              <View style={styles.detailTextContainer}>
                <Text variant="bodyLarge" style={styles.detailTitle}>TensorFlow Lite</Text>
                <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>react-native-fast-tflite (1.1.1)</Text>
              </View>
            </View>

            <Divider style={styles.divider} />
            
            <View style={styles.row}>
              <View style={styles.iconBox}>
                <HardDrives color={theme.colors.onSurfaceVariant} size={20} />
              </View>
              <View style={styles.detailTextContainer}>
                <Text variant="bodyLarge" style={styles.detailTitle}>Storage Used</Text>
                <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>14.2 MB (Library + Models)</Text>
              </View>
            </View>

          </Card.Content>
        </Card>

        <Text variant="titleMedium" style={styles.sectionTitle}>About</Text>
        
        <Card style={styles.card} mode="outlined">
          <Card.Content style={styles.cardContent}>
            
            <View style={styles.row}>
              <View style={styles.iconBox}>
                <GraduationCap color={theme.colors.onSurfaceVariant} size={20} />
              </View>
              <View style={styles.detailTextContainer}>
                <Text variant="bodyLarge" style={styles.detailTitle}>Research Paper</Text>
                <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>Offline Crop Disease Prediction using ViTs</Text>
              </View>
            </View>

            <Divider style={styles.divider} />
            
            <View style={styles.row}>
              <View style={styles.iconBox}>
                <Info color={theme.colors.onSurfaceVariant} size={20} />
              </View>
              <View style={styles.detailTextContainer}>
                <Text variant="bodyLarge" style={styles.detailTitle}>App Version</Text>
                <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>1.0.0 (Release Candidate)</Text>
              </View>
            </View>

          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 24, paddingTop: 64, alignItems: 'center', backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderColor: '#EAE7E0' },
  avatar: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  content: { padding: 24 },
  sectionTitle: { fontWeight: '700', marginBottom: 12, marginTop: 8 },
  card: { borderRadius: 16, marginBottom: 24, backgroundColor: '#FFFFFF' },
  cardContent: { padding: 8 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 8 },
  iconBox: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F7F5F1', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  detailTextContainer: { flex: 1 },
  detailTitle: { fontWeight: '600' },
  divider: { marginHorizontal: 8, backgroundColor: '#EAE7E0' },
});
