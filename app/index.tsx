import { useEffect, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { router } from 'expo-router';
import { Colors } from '../theme';

export default function SplashScreen() {
  const [fadeAnim] = useState(new Animated.Value(0));
  
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* Placeholder for the morphing leaf -> neural network animation */}
        <View style={styles.animationPlaceholder} />
        
        <Text variant="displaySmall" style={styles.title}>AgriVision</Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Hybrid CNN + ViT Offline AI
        </Text>

        <Button 
          mode="contained" 
          onPress={() => router.replace('/(tabs)/home')}
          style={styles.button}
        >
          Initialize AI Engine
        </Button>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    padding: 24,
  },
  animationPlaceholder: {
    width: 150,
    height: 150,
    backgroundColor: Colors.tertiary,
    borderRadius: 75,
    marginBottom: 40,
    opacity: 0.8,
  },
  title: {
    color: '#FFFFFF',
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    color: Colors.surfaceVariant,
    opacity: 0.9,
    marginBottom: 48,
  },
  button: {
    backgroundColor: Colors.tertiary,
    paddingHorizontal: 24,
    borderRadius: 24,
  }
});
