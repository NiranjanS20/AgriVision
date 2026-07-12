import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { router } from 'expo-router';
import { PipelineStep } from '../components/PipelineStep';
import { Leaf } from 'phosphor-react-native';
import { useTFLiteModel, runInference } from '../lib/tflite';

export default function ProcessingScreen() {
  const theme = useTheme();
  const [stage, setStage] = useState(0);
  const { model, error } = useTFLiteModel();

  useEffect(() => {
    // Simulate the progressive AI pipeline
    const executePipeline = async () => {
      // 1. Image Quality
      setStage(1);
      await new Promise(r => setTimeout(r, 1500));
      
      // 2. Leaf Detection
      setStage(2);
      await new Promise(r => setTimeout(r, 2000));
      
      // 3. Disease Region (CAM prep)
      setStage(3);
      await new Promise(r => setTimeout(r, 2000));
      
      // 4. Hybrid AI Inference
      if (model) {
        try {
          // Dummy tensor matching input shape [1, 224, 224, 3]
          const dummyTensor = new Uint8Array(1 * 224 * 224 * 3);
          const results = await runInference(model, dummyTensor);
          console.log("Inference complete", results);
        } catch(e) {
          console.log("Inference skipped (dummy mode)");
        }
      }
      setStage(4);
      await new Promise(r => setTimeout(r, 1500));
      
      // Complete & Redirect
      router.replace('/result');
    };
    
    executePipeline();
  }, [model]);

  const getStatus = (stepIndex: number) => {
    if (stage > stepIndex) return 'completed';
    if (stage === stepIndex) return 'processing';
    return 'pending';
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={[styles.iconWrapper, { backgroundColor: theme.colors.tertiary + '33' }]}>
          <Leaf color={theme.colors.tertiary} size={40} weight="duotone" />
        </View>
        <Text variant="headlineSmall" style={{ fontWeight: '700', color: theme.colors.onBackground, marginTop: 24, textAlign: 'center' }}>
          {stage === 0 && 'Checking image quality...'}
          {stage === 1 && 'Leaf identified successfully.'}
          {stage === 2 && 'Isolating potential disease regions...'}
          {stage === 3 && 'Running hybrid analysis...'}
          {stage >= 4 && 'Diagnosis complete.'}
        </Text>
      </View>

      <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <PipelineStep 
          title="Image Quality" 
          description="Improving image quality for better diagnosis." 
          status={getStatus(0)} 
        />
        <PipelineStep 
          title="Leaf Detection" 
          description="Identifying the primary leaf to avoid background interference." 
          status={getStatus(1)} 
        />
        <PipelineStep 
          title="Disease Region" 
          description="Isolating the infected regions on the leaf surface." 
          status={getStatus(2)} 
        />
        <PipelineStep 
          title="Hybrid AI Inference" 
          description="Analyzing with Hybrid CNN + Vision Transformer." 
          status={getStatus(3)} 
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  iconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    borderRadius: 24,
    padding: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
});
