import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, typography, spacing } from '../theme';
import Card from '../components/Card';
import Icon from '../components/Icon';
import { checkHealth } from '../services/api';

export default function DashboardScreen({ navigation }) {
  const [recentScans, setRecentScans] = React.useState([]);
  const [systemStatus, setSystemStatus] = React.useState('checking');
  const [loading, setLoading] = React.useState(true);
  const [stats, setStats] = React.useState({
    totalScans: 0,
    fakeDetected: 0,
    accuracy: '94.9%',
    avgTime: '2.1s',
  });

  React.useEffect(() => {
    loadDashboardData();
    checkSystemHealth();
  }, []);

  // Refresh when screen comes into focus
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadDashboardData();
      checkSystemHealth();
    });
    return unsubscribe;
  }, [navigation]);

  const loadDashboardData = async () => {
    try {
      // Load recent scans from AsyncStorage
      const keys = await AsyncStorage.getAllKeys();
      const scanKeys = keys.filter(key => key.startsWith('scan_'));
      
      if (scanKeys.length > 0) {
        const scans = await AsyncStorage.multiGet(scanKeys);
        const parsedScans = scans
          .map(([key, value]) => JSON.parse(value))
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
          .slice(0, 3); // Get last 3 scans
        
        setRecentScans(parsedScans);
        
        // Calculate stats
        const totalScans = parsedScans.length;
        const fakeCount = parsedScans.filter(s => s.prediction === 'fake').length;
        
        setStats({
          totalScans: totalScans.toString(),
          fakeDetected: fakeCount.toString(),
          accuracy: '94.9%',
          avgTime: '2.1s',
        });
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkSystemHealth = async () => {
    try {
      await checkHealth();
      setSystemStatus('operational');
    } catch (error) {
      setSystemStatus('offline');
    }
  };

  const formatDate = (timestamp) => {
    const now = new Date();
    const scanDate = new Date(timestamp);
    const diffMs = now - scanDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  const quickStatsData = [
    { label: 'Total Scans', value: stats.totalScans, icon: 'search', color: colors.primary },
    { label: 'Fake Detected', value: stats.fakeDetected, icon: 'alert', color: colors.error },
    { label: 'Accuracy', value: stats.accuracy, icon: 'target', color: colors.success },
    { label: 'Avg Time', value: stats.avgTime, icon: 'clock', color: colors.info },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back</Text>
          <Text style={styles.title}>Dashboard</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Icon name="users" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading dashboard...</Text>
        </View>
      ) : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Quick Actions */}
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={styles.primaryAction}
              onPress={() => navigation.navigate('Analyze')}
            >
              <Icon name="upload" size={24} color={colors.white} />
              <Text style={styles.primaryActionText}>Analyze New Video</Text>
            </TouchableOpacity>
          </View>

          {/* Quick Stats */}
          <View style={styles.statsGrid}>
            {quickStatsData.map((stat, index) => (
              <Card key={index} style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
                  <Icon name={stat.icon} size={20} color={stat.color} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </Card>
            ))}
          </View>

          {/* Recent Scans */}
          {recentScans.length > 0 ? (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recent Scans</Text>
                <TouchableOpacity>
                  <Text style={styles.seeAll}>See All</Text>
                </TouchableOpacity>
              </View>

              {recentScans.map((scan) => (
                <Card key={scan.id} style={styles.scanCard}>
                  <View style={styles.scanIcon}>
                    <Icon name="video" size={20} color={colors.primary} />
                  </View>
                  <View style={styles.scanInfo}>
                    <Text style={styles.scanFilename}>{scan.filename}</Text>
                    <Text style={styles.scanDate}>{formatDate(scan.timestamp)}</Text>
                  </View>
                  <View style={styles.scanResult}>
                    <View
                      style={[
                        styles.resultBadge,
                        scan.prediction === 'fake' ? styles.fakeBadge : styles.realBadge,
                      ]}
                    >
                      <Text
                        style={[
                          styles.resultText,
                          scan.prediction === 'fake' ? styles.fakeText : styles.realText,
                        ]}
                      >
                        {scan.prediction.toUpperCase()}
                      </Text>
                    </View>
                    <Text style={styles.confidenceText}>
                      {(scan.confidence * 100).toFixed(0)}%
                    </Text>
                  </View>
                </Card>
              ))}
            </View>
          ) : (
            <Card style={styles.emptyCard}>
              <Icon name="video" size={48} color={colors.textTertiary} />
              <Text style={styles.emptyTitle}>No scans yet</Text>
              <Text style={styles.emptyText}>
                Upload your first video to see analysis results here
              </Text>
              <TouchableOpacity
                style={styles.emptyButton}
                onPress={() => navigation.navigate('Analyze')}
              >
                <Text style={styles.emptyButtonText}>Get Started</Text>
              </TouchableOpacity>
            </Card>
          )}

          {/* System Status */}
          <Card style={styles.statusCard}>
            <View style={styles.statusHeader}>
              <Icon 
                name="cpu" 
                size={20} 
                color={systemStatus === 'operational' ? colors.success : colors.error} 
              />
              <Text style={styles.statusTitle}>System Status</Text>
            </View>
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>
                {systemStatus === 'operational' ? 'All models operational' : 'System offline'}
              </Text>
              <View 
                style={[
                  styles.statusIndicator,
                  { backgroundColor: systemStatus === 'operational' ? colors.success : colors.error }
                ]} 
              />
            </View>
            <Text style={styles.statusSubtext}>Last updated: Just now</Text>
          </Card>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: typography.base,
    color: colors.textSecondary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
  },
  greeting: {
    fontSize: typography.sm,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  title: {
    fontSize: typography['2xl'],
    fontWeight: typography.bold,
    color: colors.textPrimary,
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },

  // Quick Actions
  quickActions: {
    marginBottom: spacing.lg,
  },
  primaryAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 12,
    gap: spacing.sm,
  },
  primaryActionText: {
    fontSize: typography.base,
    fontWeight: typography.semibold,
    color: colors.white,
  },

  // Stats Grid
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
    marginBottom: spacing.lg,
  },
  statCard: {
    width: '50%',
    padding: spacing.md,
    marginBottom: spacing.sm,
    alignItems: 'center',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  statValue: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: typography.xs,
    color: colors.textSecondary,
    textAlign: 'center',
  },

  // Section
  section: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.textPrimary,
  },
  seeAll: {
    fontSize: typography.sm,
    color: colors.primary,
    fontWeight: typography.semibold,
  },

  // Scan Card
  scanCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  scanIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryLight + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  scanInfo: {
    flex: 1,
  },
  scanFilename: {
    fontSize: typography.base,
    fontWeight: typography.medium,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  scanDate: {
    fontSize: typography.xs,
    color: colors.textSecondary,
  },
  scanResult: {
    alignItems: 'flex-end',
  },
  resultBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 4,
  },
  fakeBadge: {
    backgroundColor: colors.errorLight + '20',
  },
  realBadge: {
    backgroundColor: colors.successLight + '20',
  },
  resultText: {
    fontSize: typography.xs,
    fontWeight: typography.semibold,
  },
  fakeText: {
    color: colors.error,
  },
  realText: {
    color: colors.success,
  },
  confidenceText: {
    fontSize: typography.xs,
    color: colors.textSecondary,
  },

  // Empty State
  emptyCard: {
    alignItems: 'center',
    padding: spacing.xl,
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  emptyText: {
    fontSize: typography.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  emptyButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  emptyButtonText: {
    fontSize: typography.sm,
    fontWeight: typography.semibold,
    color: colors.white,
  },

  // Status Card
  statusCard: {
    padding: spacing.md,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  statusTitle: {
    fontSize: typography.base,
    fontWeight: typography.semibold,
    color: colors.textPrimary,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  statusLabel: {
    fontSize: typography.sm,
    color: colors.textSecondary,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
  },
  statusSubtext: {
    fontSize: typography.xs,
    color: colors.textTertiary,
  },
});
