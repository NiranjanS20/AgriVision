import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

export const Colors = {
  primary: '#2F6B3B', // Nature Green
  secondary: '#6B8E5E', // Light Green
  tertiary: '#C69214', // Turmeric Gold
  background: '#F7F5F1', // Off-white warm
  surface: '#FFFFFF',
  surfaceVariant: '#EAE7E0',
  textPrimary: '#2A2A2A',
  textSecondary: '#6D6D6D',
  error: '#D9534F',
  success: '#4CAF50',
  warning: '#E6A23C',
  info: '#3A7BD5',
  outline: '#C3C0B8',
  elevation: {
    level0: 'transparent',
    level1: '#F1EFE9',
    level2: '#EBE9E2',
    level3: '#E6E3DB',
    level4: '#E3E0D8',
    level5: '#DEDBD2',
  },
};

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    secondary: Colors.secondary,
    tertiary: Colors.tertiary,
    background: Colors.background,
    surface: Colors.surface,
    surfaceVariant: Colors.surfaceVariant,
    error: Colors.error,
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onTertiary: '#FFFFFF',
    onBackground: Colors.textPrimary,
    onSurface: Colors.textPrimary,
    onSurfaceVariant: Colors.textSecondary,
    outline: Colors.outline,
    elevation: Colors.elevation,
  },
  roundness: 3, // Multiplier for border radius in Material 3
};
