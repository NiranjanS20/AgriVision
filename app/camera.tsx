import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { Camera, CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { CheckCircle, CircleDashed, Camera as CameraIcon } from 'phosphor-react-native';
import { Colors } from '../theme';

export default function CameraScreen() {
  const theme = useTheme();
  const [permission, requestPermission] = useCameraPermissions();
  const [checks, setChecks] = useState({
    lighting: false,
    leaf: false,
    focus: false,
  });

  useEffect(() => {
    // Simulate AI Camera live intelligence checks for demonstration
    const t1 = setTimeout(() => setChecks(c => ({ ...c, lighting: true })), 1000);
    const t2 = setTimeout(() => setChecks(c => ({ ...c, leaf: true })), 2000);
    const t3 = setTimeout(() => setChecks(c => ({ ...c, focus: true })), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={{ textAlign: 'center', marginBottom: 16 }}>We need your permission to show the camera</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.captureButton}>
          <Text style={{color: 'white'}}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const allReady = checks.lighting && checks.leaf && checks.focus;

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing="back">
        <View style={styles.overlay}>
          {/* Top Bar */}
          <View style={styles.header}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>AI Camera</Text>
            </View>
          </View>

          {/* Target Reticle */}
          <View style={styles.reticleContainer}>
            <View style={[styles.reticle, { borderColor: allReady ? theme.colors.primary : '#FFFFFF80' }]} />
          </View>

          {/* Intelligence Checks */}
          <View style={styles.checksContainer}>
            <CheckItem label="Good Lighting" active={checks.lighting} theme={theme} />
            <CheckItem label="Leaf Found" active={checks.leaf} theme={theme} />
            <CheckItem label="Focus" active={checks.focus} theme={theme} />
            
            <View style={[styles.readyBadge, { backgroundColor: allReady ? theme.colors.primary : theme.colors.surfaceVariant }]}>
              <Text style={{ color: allReady ? 'white' : theme.colors.onSurfaceVariant, fontWeight: 'bold' }}>
                {allReady ? 'Inference Ready' : 'Analyzing...'}
              </Text>
            </View>
          </View>

          {/* Capture Button */}
          <View style={styles.controls}>
            <TouchableOpacity 
              style={[styles.captureButton, { opacity: allReady ? 1 : 0.5 }]}
              disabled={!allReady}
              onPress={() => router.push('/processing')}
            >
              <CameraIcon color="white" size={32} weight="fill" />
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const CheckItem = ({ label, active, theme }: { label: string, active: boolean, theme: any }) => (
  <View style={styles.checkItem}>
    {active ? (
      <CheckCircle color={theme.colors.primary} size={20} weight="fill" />
    ) : (
      <CircleDashed color="#FFFFFF80" size={20} />
    )}
    <Text style={[styles.checkText, { color: active ? 'white' : '#FFFFFF80' }]}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  permissionContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  camera: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'space-between',
    padding: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: { alignItems: 'center' },
  badge: {
    backgroundColor: '#000000B3',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: { color: 'white', fontWeight: 'bold', letterSpacing: 1 },
  reticleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reticle: {
    width: 250,
    height: 350,
    borderWidth: 2,
    borderRadius: 24,
    borderStyle: 'dashed',
  },
  checksContainer: {
    backgroundColor: '#000000B3',
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  checkText: {
    fontWeight: '600',
    fontSize: 14,
  },
  readyBadge: {
    marginTop: 8,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  controls: {
    alignItems: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF40',
  }
});
