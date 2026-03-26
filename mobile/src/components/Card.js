import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, spacing } from '../theme';

export default function Card({ children, style, noPadding = false }) {
  return (
    <View style={[styles.card, noPadding && styles.noPadding, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing.lg,
    marginHorizontal: 0,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  noPadding: {
    padding: 0,
  },
});
