import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing } from '../theme';
import Header from '../components/Header';
import Card from '../components/Card';
import Icon from '../components/Icon';

export default function ContactScreen() {
  const openLink = (url) => {
    Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="About" subtitle="Contact & Information" />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* About */}
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>About Interceptor</Text>
          <Text style={styles.description}>
            Interceptor is an AI-powered deepfake detection system that uses agentic intelligence to identify manipulated media with high accuracy.
          </Text>
          <Text style={styles.description}>
            Our system employs multiple specialist models that work together to analyze videos from different perspectives, providing comprehensive and explainable results.
          </Text>
        </Card>

        {/* Features */}
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Key Features</Text>
          
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <View style={styles.featureBullet} />
              <Text style={styles.featureText}>
                Agentic routing with deterministic specialist selection
              </Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureBullet} />
              <Text style={styles.featureText}>
                94.9% overall confidence across multiple models
              </Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureBullet} />
              <Text style={styles.featureText}>
                Fast processing with average 2.1s analysis time
              </Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureBullet} />
              <Text style={styles.featureText}>
                Explainable AI with detailed confidence breakdowns
              </Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureBullet} />
              <Text style={styles.featureText}>
                Handles compressed, low-light, and low-resolution videos
              </Text>
            </View>
          </View>
        </Card>

        {/* Technology */}
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Technology Stack</Text>
          
          <View style={styles.techSection}>
            <Text style={styles.techCategory}>Backend</Text>
            <Text style={styles.techText}>FastAPI, Python, PyTorch</Text>
          </View>

          <View style={styles.techSection}>
            <Text style={styles.techCategory}>Models</Text>
            <Text style={styles.techText}>EfficientNet-B4, ResNet18</Text>
          </View>

          <View style={styles.techSection}>
            <Text style={styles.techCategory}>Mobile</Text>
            <Text style={styles.techText}>React Native, Expo</Text>
          </View>

          <View style={styles.techSection}>
            <Text style={styles.techCategory}>Deployment</Text>
            <Text style={styles.techText}>Docker, Railway, Vercel</Text>
          </View>
        </Card>

        {/* Contact */}
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Contact Us</Text>
          
          <TouchableOpacity 
            style={styles.contactItem}
            onPress={() => openLink('mailto:contact@interceptor.ai')}
          >
            <View style={styles.contactIconContainer}>
              <Icon name="mail" size={20} color={colors.primary} />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Email</Text>
              <Text style={styles.contactValue}>contact@interceptor.ai</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.contactItem}
            onPress={() => openLink('https://github.com/interceptor')}
          >
            <View style={styles.contactIconContainer}>
              <Icon name="github" size={20} color={colors.primary} />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>GitHub</Text>
              <Text style={styles.contactValue}>github.com/interceptor</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.contactItem}
            onPress={() => openLink('https://interceptor.ai')}
          >
            <View style={styles.contactIconContainer}>
              <Icon name="globe" size={20} color={colors.primary} />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Website</Text>
              <Text style={styles.contactValue}>interceptor.ai</Text>
            </View>
          </TouchableOpacity>
        </Card>

        {/* Use Cases */}
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Use Cases</Text>
          
          <View style={styles.useCaseItem}>
            <Text style={styles.useCaseTitle}>For Consumers (B2C)</Text>
            <Text style={styles.useCaseText}>
              Verify authenticity of videos before sharing. Free tier with 5 scans per user.
            </Text>
          </View>

          <View style={styles.useCaseItem}>
            <Text style={styles.useCaseTitle}>For Law Enforcement (B2G)</Text>
            <Text style={styles.useCaseText}>
              Generate forensic reports compliant with legal standards for court proceedings.
            </Text>
          </View>

          <View style={styles.useCaseItem}>
            <Text style={styles.useCaseTitle}>For Businesses (B2B)</Text>
            <Text style={styles.useCaseText}>
              Verify candidate interviews and prevent hiring fraud with automated screening.
            </Text>
          </View>
        </Card>

        {/* Version */}
        <View style={styles.version}>
          <Text style={styles.versionText}>Version 2.0.0</Text>
          <Text style={styles.versionText}>© 2024 Interceptor. All rights reserved.</Text>
        </View>
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
  
  // Cards
  card: {
    marginBottom: spacing.md,
  },
  cardTitle: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  description: {
    fontSize: typography.base,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.normal * typography.base,
    marginBottom: spacing.md,
  },
  
  // Features
  featureList: {
    marginTop: spacing.xs,
  },
  featureItem: {
    flexDirection: 'row',
    marginBottom: spacing.sm + 2,
  },
  featureBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginTop: 6,
    marginRight: spacing.sm,
  },
  featureText: {
    flex: 1,
    fontSize: typography.sm,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.normal * typography.sm,
  },
  
  // Technology
  techSection: {
    marginBottom: spacing.md,
  },
  techCategory: {
    fontSize: typography.base,
    fontWeight: typography.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  techText: {
    fontSize: typography.sm,
    color: colors.textSecondary,
  },
  
  // Contact
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  contactIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryLight + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: typography.xs,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  contactValue: {
    fontSize: typography.base,
    fontWeight: typography.medium,
    color: colors.primary,
  },
  
  // Use Cases
  useCaseItem: {
    marginBottom: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  useCaseTitle: {
    fontSize: typography.base,
    fontWeight: typography.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  useCaseText: {
    fontSize: typography.sm,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.normal * typography.sm,
  },
  
  // Version
  version: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  versionText: {
    fontSize: typography.xs,
    color: colors.textTertiary,
    marginBottom: spacing.xs,
  },
});
