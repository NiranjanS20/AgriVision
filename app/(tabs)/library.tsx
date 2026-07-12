import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, useTheme, Searchbar, Chip } from 'react-native-paper';
import { DiseaseCard } from '../../components/DiseaseCard';

export default function LibraryScreen() {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={{ fontWeight: '700', color: theme.colors.onBackground }}>Disease Library</Text>
        <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant, marginBottom: 16 }}>Offline reference for Turmeric & Bajra.</Text>
        <Searchbar
          placeholder="Search diseases..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
          elevation={1}
        />
        <View style={styles.chipsRow}>
          <Chip selected style={styles.chip} showSelectedOverlay>All</Chip>
          <Chip style={styles.chip}>Turmeric</Chip>
          <Chip style={styles.chip}>Bajra</Chip>
        </View>
      </View>

      <View style={styles.content}>
        <DiseaseCard 
          title="Turmeric Leaf Spot"
          scientificName="Colletotrichum capsici"
          symptoms="Elliptical or oblong spots with grey centers and brown margins on leaves."
          treatment="Fungicide application (Mancozeb) and proper field drainage."
          colorHex="#8B9A76"
        />

        <DiseaseCard 
          title="Bajra Ergot"
          scientificName="Claviceps fusiformis"
          symptoms="Honeydew-like pinkish/brownish exudation from infected florets."
          treatment="Use pathogen-free seeds, crop rotation, and avoid late sowing."
          colorHex="#A4907C"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 24, paddingTop: 48, backgroundColor: '#FFFFFF' },
  searchbar: { borderRadius: 12, marginBottom: 16 },
  chipsRow: { flexDirection: 'row', gap: 8 },
  chip: { borderRadius: 16 },
  content: { padding: 24 },
});
