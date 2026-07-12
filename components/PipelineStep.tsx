import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { CheckCircle, CircleDashed } from 'phosphor-react-native';

interface PipelineStepProps {
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'completed';
}

export function PipelineStep({ title, description, status }: PipelineStepProps) {
  const theme = useTheme();
  const [progress] = useState(new Animated.Value(0));

  useEffect(() => {
    if (status === 'processing') {
      Animated.loop(
        Animated.timing(progress, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false, // width animation doesn't support native driver
        })
      ).start();
    } else if (status === 'completed') {
      progress.stopAnimation();
      progress.setValue(1);
    }
  }, [status]);

  const width = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {status === 'completed' ? (
          <CheckCircle color={theme.colors.primary} size={24} weight="fill" />
        ) : status === 'processing' ? (
          <CircleDashed color={theme.colors.tertiary} size={24} weight="bold" />
        ) : (
          <CircleDashed color={theme.colors.surfaceVariant} size={24} weight="regular" />
        )}
      </View>
      <View style={styles.content}>
        <Text variant="titleMedium" style={{ color: status === 'pending' ? theme.colors.outline : theme.colors.onSurface, fontWeight: '600' }}>
          {title}
        </Text>
        <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
          {description}
        </Text>
        
        {status === 'processing' && (
          <View style={styles.progressBarContainer}>
            <Animated.View style={[styles.progressBar, { width, backgroundColor: theme.colors.tertiary }]} />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
    gap: 16,
  },
  iconContainer: {
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#EAE7E0',
    borderRadius: 2,
    marginTop: 12,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
  },
});
