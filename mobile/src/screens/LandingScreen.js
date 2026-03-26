import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing } from '../theme';
import Card from '../components/Card';
import Icon from '../components/Icon';

export default function LandingScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.hero}>
          <View style={styles.logoContainer}>
            <Icon name="shield" size={48} color={colors.primary} />
          </View>
          <Text style={styles.heroTitle}>Interceptor</Text>
          <Text style={styles.heroSubtitle}>
            AI-Powered Deepfake Detection
          </Text>
          <Text style={styles.heroDescription}>
            Protect yourself from manipulated media with our advanced agentic detection system
          </Text>
          
          <TouchableOpacity 
            style={styles.ctaButton}
            onPress={() => navigation.navigate('Analyze')}
          >
            <Text style={styles.ctaButtonText}>Analyze Video</Text>
          </TouchableOpacity>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Interceptor?</Text>
          
          <Card style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Icon name="zap" size={24} color={colors.primary} />
            </View>
            <Text style={styles.featureTitle}>Fast Analysis</Text>
            <Text style={styles.featureDescription}>
              Get results in seconds with our optimized detection pipeline
            </Text>
          </Card>

          <Card style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Icon name="target" size={24} color={colors.primary} />
            </View>
            <Text style={styles.featureTitle}>High Accuracy</Text>
            <Text style={styles.featureDescription}>
              94.9% confidence with multiple specialist models
            </Text>
          </Card>

          <Card style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Icon name="eye" size={24} color={colors.primary} />
            </View>
            <Text style={styles.featureTitle}>Explainable Results</Text>
            <Text style={styles.featureDescription}>
              Understand how and why videos are classified as fake or real
            </Text>
          </Card>

          <Card style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Icon name="cpu" size={24} color={colors.primary} />
            </View>
            <Text style={styles.featureTitle}>Agentic Intelligence</Text>
            <Text style={styles.featureDescription}>
              Smart routing to specialist models based on video characteristics
            </Text>
          </Card>
        </View>

        {/* Stats Preview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Performance</Text>
          
          <Card>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>94.9%</Text>
                <Text style={styles.statLabel}>Accuracy</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>2.1s</Text>
                <Text style={styles.statLabel}>Avg Time</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>6</Text>
                <Text style={styles.statLabel}>AI Models</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>47M</Text>
                <Text style={styles.statLabel}>Parameters</Text>
              </View>
            </View>
          </Card>
        </View>

        {/* CTA */}
        <Card style={styles.ctaCard}>
          <Text style={styles.ctaCardTitle}>Ready to detect deepfakes?</Text>
          <Text style={styles.ctaCardDescription}>
            Upload a video and get instant analysis
          </Text>
          <TouchableOpacity 
            style={styles.ctaCardButton}
            onPress={() => navigation.navigate('Analyze')}
          >
            <Text style={styles.ctaCardButtonText}>Get Started</Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  
  // Hero
  hero: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primaryLight + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  heroTitle: {
    fontSize: typography['4xl'],
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  heroSubtitle: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  heroDescription: {
    fontSize: typography.base,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
    lineHeight: typography.lineHeight.relaxed * typography.base,
  },
  ctaButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: 12,
  },
  ctaButtonText: {
    color: colors.white,
    fontSize: typography.base,
    fontWeight: typography.semibold,
  },
  
  // Sections
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  
  // Features
  featureCard: {
    alignItems: 'center',
    marginBottom: spacing.md,
    padding: spacing.lg,
  },
  featureIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primaryLight + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  featureTitle: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  featureDescription: {
    fontSize: typography.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.lineHeight.normal * typography.sm,
  },
  
  // Stats
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  statItem: {
    width: '50%',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  statValue: {
    fontSize: typography['2xl'],
    fontWeight: typography.bold,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: typography.sm,
    color: colors.textSecondary,
  },
  
  // CTA Card
  ctaCard: {
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.primary + '10',
  },
  ctaCardTitle: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  ctaCardDescription: {
    fontSize: typography.base,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  ctaCardButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
  },
  ctaCardButtonText: {
    color: colors.white,
    fontSize: typography.base,
    fontWeight: typography.semibold,
  },
});
