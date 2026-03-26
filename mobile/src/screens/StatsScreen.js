import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing } from '../theme';
import Header from '../components/Header';
import Card from '../components/Card';

export default function StatsScreen() {
  const [stats, setStats] = React.useState(null);

  React.useEffect(() => {
    // Mock stats - in production, fetch from API
    setStats({
      system: {
        status: 'running',
        uptime: '99.9%',
      },
      models: {
        'BG-Model N': { accuracy: '86.25%', type: 'Background' },
        'AV-Model N': { accuracy: '93.00%', type: 'Audio-Visual' },
        'CM-Model N': { accuracy: '80.83%', type: 'Compression' },
        'RR-Model N': { accuracy: '85.00%', type: 'Resolution' },
        'LL-Model N': { accuracy: '93.42%', type: 'Low-Light' },
        'TM-Model': { accuracy: '78.50%', type: 'Temporal' },
      },
      performance: {
        overall_confidence: '94.9%',
        avg_processing_time: '2.1s',
        total_parameters: '47.2M',
        videos_analyzed: '1,247',
      },
    });
  }, []);

  if (!stats) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Statistics" subtitle="System Performance" />
        <View style={styles.loading}>
          <Text style={styles.loadingText}>Loading statistics...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Statistics" subtitle="System Performance" />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* System Status */}
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>System Status</Text>
          <View style={styles.statusRow}>
            <View style={styles.statusIndicator} />
            <Text style={styles.statusText}>Operational</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Uptime</Text>
            <Text style={styles.detailValue}>{stats.system.uptime}</Text>
          </View>
        </Card>

        {/* Performance Metrics */}
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Performance Metrics</Text>
          
          <View style={styles.metricRow}>
            <View style={styles.metricItem}>
              <View style={styles.metricCircle}>
                <Text style={styles.metricValue}>{stats.performance.overall_confidence}</Text>
              </View>
              <Text style={styles.metricLabel}>Overall Accuracy</Text>
            </View>
            <View style={styles.metricItem}>
              <View style={styles.metricCircle}>
                <Text style={styles.metricValue}>{stats.performance.avg_processing_time}</Text>
              </View>
              <Text style={styles.metricLabel}>Avg Processing</Text>
            </View>
          </View>

          <View style={styles.metricRow}>
            <View style={styles.metricItem}>
              <View style={styles.metricCircle}>
                <Text style={styles.metricValue}>{stats.performance.total_parameters}</Text>
              </View>
              <Text style={styles.metricLabel}>Total Parameters</Text>
            </View>
            <View style={styles.metricItem}>
              <View style={styles.metricCircle}>
                <Text style={styles.metricValue}>{stats.performance.videos_analyzed}</Text>
              </View>
              <Text style={styles.metricLabel}>Videos Analyzed</Text>
            </View>
          </View>
        </Card>

        {/* Model Performance */}
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Model Performance</Text>
          
          {Object.entries(stats.models).map(([name, info]) => {
            // Extract numeric value from percentage string (e.g., "86.25%" -> 86.25)
            const accuracyPercent = parseFloat(info.accuracy);
            
            // Color code based on accuracy
            let barColor = colors.primary;
            if (accuracyPercent >= 90) {
              barColor = colors.success;
            } else if (accuracyPercent >= 80) {
              barColor = colors.primary;
            } else {
              barColor = colors.warning;
            }
            
            return (
              <View key={name} style={styles.modelRow}>
                <View style={styles.modelInfo}>
                  <Text style={styles.modelName}>{name}</Text>
                  <Text style={styles.modelType}>{info.type}</Text>
                </View>
                <View style={styles.modelAccuracy}>
                  <Text style={[styles.accuracyValue, { color: barColor }]}>
                    {info.accuracy}
                  </Text>
                  <View style={styles.accuracyBar}>
                    <View 
                      style={[
                        styles.accuracyBarFill,
                        { 
                          width: `${accuracyPercent}%`,
                          backgroundColor: barColor
                        }
                      ]} 
                    />
                  </View>
                </View>
              </View>
            );
          })}
        </Card>

        {/* Architecture */}
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>System Architecture</Text>
          <Text style={styles.architectureText}>
            Interceptor uses an agentic approach with deterministic routing to specialist models based on video characteristics.
          </Text>
          
          <View style={styles.architectureList}>
            <View style={styles.architectureItem}>
              <View style={styles.bullet} />
              <Text style={styles.architectureItemText}>
                Baseline Generalist Model for initial screening
              </Text>
            </View>
            <View style={styles.architectureItem}>
              <View style={styles.bullet} />
              <Text style={styles.architectureItemText}>
                6 Specialist Models for targeted analysis
              </Text>
            </View>
            <View style={styles.architectureItem}>
              <View style={styles.bullet} />
              <Text style={styles.architectureItemText}>
                Intelligent routing based on file characteristics
              </Text>
            </View>
            <View style={styles.architectureItem}>
              <View style={styles.bullet} />
              <Text style={styles.architectureItemText}>
                Ensemble decision making for final verdict
              </Text>
            </View>
          </View>
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
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: typography.base,
    color: colors.textSecondary,
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
  
  // Status
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.success,
    marginRight: spacing.sm,
  },
  statusText: {
    fontSize: typography.base,
    fontWeight: typography.semibold,
    color: colors.success,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  detailLabel: {
    fontSize: typography.base,
    color: colors.textSecondary,
  },
  detailValue: {
    fontSize: typography.base,
    fontWeight: typography.semibold,
    color: colors.textPrimary,
  },
  
  // Metrics
  metricRow: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  metricItem: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 8,
    marginHorizontal: spacing.xs,
  },
  metricCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primaryLight + '20',
    borderWidth: 3,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  metricValue: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  metricLabel: {
    fontSize: typography.xs,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  
  // Models
  modelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm + 2,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  modelInfo: {
    flex: 1,
  },
  modelName: {
    fontSize: typography.base,
    fontWeight: typography.medium,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  modelType: {
    fontSize: typography.xs,
    color: colors.textSecondary,
  },
  modelAccuracy: {
    alignItems: 'flex-end',
    minWidth: 80,
  },
  accuracyValue: {
    fontSize: typography.base,
    fontWeight: typography.semibold,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  accuracyBar: {
    width: 80,
    height: 6,
    backgroundColor: colors.backgroundTertiary,
    borderRadius: 3,
    overflow: 'hidden',
  },
  accuracyBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  
  // Architecture
  architectureText: {
    fontSize: typography.sm,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.normal * typography.sm,
    marginBottom: spacing.md,
  },
  architectureList: {
    marginTop: spacing.sm,
  },
  architectureItem: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginTop: 6,
    marginRight: spacing.sm,
  },
  architectureItemText: {
    flex: 1,
    fontSize: typography.sm,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.normal * typography.sm,
  },
});
