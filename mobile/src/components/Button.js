import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, typography, spacing } from '../theme';

export default function Button({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'large',
  loading = false,
  disabled = false,
  fullWidth = true,
  style 
}) {
  const buttonStyles = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    (disabled || loading) && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? colors.white : colors.primary} />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  
  // Variants
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.backgroundTertiary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  
  // Sizes
  large: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  medium: {
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.md,
  },
  small: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm + 4,
  },
  
  // Text styles
  text: {
    fontWeight: typography.semibold,
  },
  primaryText: {
    color: colors.white,
    fontSize: typography.base,
  },
  secondaryText: {
    color: colors.textPrimary,
    fontSize: typography.base,
  },
  outlineText: {
    color: colors.textPrimary,
    fontSize: typography.base,
  },
  largeText: {
    fontSize: typography.base,
  },
  mediumText: {
    fontSize: typography.sm,
  },
  smallText: {
    fontSize: typography.xs,
  },
  
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
});
