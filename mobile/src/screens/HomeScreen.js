import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, Platform, Animated, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, typography, spacing } from '../theme';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import Icon from '../components/Icon';
import { analyzeVideo, checkHealth } from '../services/api';

export default function HomeScreen() {
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState(null);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [analysisStage, setAnalysisStage] = React.useState('');
  const fileInputRef = React.useRef(null);
  const scrollViewRef = React.useRef(null);
  
  // Animation values
  const spinValue = React.useRef(new Animated.Value(0)).current;
  const pulseValue = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    if (loading) {
      // Spinning animation
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();

      // Pulsing animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseValue, {
            toValue: 1.2,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseValue, {
            toValue: 1,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      spinValue.setValue(0);
      pulseValue.setValue(1);
    }
  }, [loading]);

  const pickVideo = async () => {
    try {
      // For web, use native file input
      if (Platform.OS === 'web') {
        if (fileInputRef.current) {
          fileInputRef.current.click();
        }
        return;
      }

      // For mobile, use DocumentPicker
      const result = await DocumentPicker.getDocumentAsync({
        type: 'video/*',
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelectedFile(result.assets[0]);
        setResult(null);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to select video');
    }
  };

  // Debug function to test results display
  const testResultsDisplay = () => {
    const mockResult = {
      prediction: "fake",
      confidence: 0.87,
      faces_analyzed: 3,
      models_used: ["BG-Model N", "LL-Model N", "AV-Model N"],
      processing_time: 2.5,
      analysis: {
        confidence_breakdown: {
          raw_confidence: 0.87,
          quality_adjusted: 0.85,
          consistency: 0.92,
          quality_score: 0.78,
        },
        routing: {
          confidence_level: "high",
          specialists_invoked: 3,
          video_characteristics: {
            is_compressed: true,
            is_low_light: false,
            resolution: "1920x1080",
            fps: 30.0,
            duration: "5.2s",
          }
        },
        model_predictions: {
          "BG-Model N": 0.89,
          "LL-Model N": 0.82,
          "AV-Model N": 0.91,
        },
        frames_analyzed: 30,
      },
    };
    
    console.log('Setting mock result for testing:', mockResult);
    setResult(mockResult);
    
    setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
    }, 300);
  };

  const handleWebFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile({
        name: file.name,
        size: file.size,
        uri: file, // Store the actual File object for web
        file: file, // Keep reference
      });
      setResult(null);
    }
  };

  const analyzeSelectedVideo = async () => {
    if (!selectedFile) {
      Alert.alert('No Video Selected', 'Please select a video first');
      return;
    }

    setLoading(true);
    setAnalysisStage('Connecting to server...');
    const startTime = Date.now();
    
    try {
      console.log('Starting video analysis...');
      console.log('Selected file:', selectedFile);
      
      // Test backend connection first
      setAnalysisStage('Checking connection...');
      try {
        await checkHealth();
        console.log('Backend connection OK');
      } catch (healthError) {
        console.error('Backend health check failed:', healthError);
        throw new Error('Cannot connect to server. Please check your internet connection and ensure the backend is running.');
      }
      
      // Pass the file object for web, uri for mobile
      const fileToUpload = Platform.OS === 'web' ? selectedFile.file : selectedFile.uri;
      console.log('File to upload:', fileToUpload);
      
      // Update stages during analysis
      setAnalysisStage('Uploading video...');
      setTimeout(() => setAnalysisStage('Extracting frames...'), 500);
      setTimeout(() => setAnalysisStage('Running AI models...'), 1000);
      setTimeout(() => setAnalysisStage('Analyzing patterns...'), 1500);
      
      const analysisResult = await analyzeVideo(fileToUpload);
      console.log('Analysis result received:', JSON.stringify(analysisResult, null, 2));
      
      // Validate result structure
      if (!analysisResult || !analysisResult.prediction) {
        console.error('Invalid analysis result structure:', analysisResult);
        throw new Error('Invalid response from server');
      }
      
      // Ensure minimum 2 seconds for better UX
      const elapsed = Date.now() - startTime;
      const minTime = 2000;
      if (elapsed < minTime) {
        await new Promise(resolve => setTimeout(resolve, minTime - elapsed));
      }
      
      setAnalysisStage('Analysis complete!');
      console.log('Setting result state with:', analysisResult);
      setResult(analysisResult);
      console.log('Result state updated successfully');
      
      // Scroll to results after a short delay
      setTimeout(() => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollToEnd({ animated: true });
        }
      }, 300);
      
      // Save to AsyncStorage for chatbot and dashboard
      try {
        await AsyncStorage.setItem('lastAnalysis', JSON.stringify(analysisResult));
        
        // Also save to scan history with unique ID
        const scanId = `scan_${Date.now()}`;
        const scanData = {
          id: scanId,
          filename: selectedFile.name,
          prediction: analysisResult.prediction,
          confidence: analysisResult.confidence,
          timestamp: new Date().toISOString(),
          ...analysisResult,
        };
        await AsyncStorage.setItem(scanId, JSON.stringify(scanData));
      } catch (storageError) {
        console.error('Failed to save analysis:', storageError);
      }
    } catch (error) {
      console.error('Analysis error:', error);
      Alert.alert(
        'Analysis Failed',
        error.response?.data?.detail || error.message || 'Unable to analyze video. Please check your connection and ensure the backend is running.'
      );
    } finally {
      setLoading(false);
      setAnalysisStage('');
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header 
        title="Interceptor" 
        subtitle="AI-Powered Deepfake Detection"
      />
      
      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Upload Section */}
        <Card style={styles.uploadCard}>
          <Text style={styles.sectionTitle}>Upload Video</Text>
          <Text style={styles.sectionDescription}>
            Select a video to analyze for deepfake detection
          </Text>

          {selectedFile ? (
            <View style={styles.filePreview}>
              <View style={styles.fileIcon}>
                <Text style={styles.fileIconText}>MP4</Text>
              </View>
              <View style={styles.fileInfo}>
                <Text style={styles.fileName} numberOfLines={1}>
                  {selectedFile.name}
                </Text>
                <Text style={styles.fileSize}>
                  {formatFileSize(selectedFile.size)}
                </Text>
              </View>
              <TouchableOpacity onPress={pickVideo} style={styles.changeButton}>
                <Text style={styles.changeButtonText}>Change</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity 
              style={styles.uploadArea} 
              onPress={pickVideo}
              activeOpacity={0.7}
            >
              <View style={styles.uploadIcon}>
                <Icon name="upload" size={32} color={colors.white} />
              </View>
              <Text style={styles.uploadText}>Tap to select video</Text>
              <Text style={styles.uploadSubtext}>Supports MP4, MOV, AVI</Text>
            </TouchableOpacity>
          )}

          {selectedFile && (
            <Button
              title="Analyze Video"
              onPress={analyzeSelectedVideo}
              loading={loading}
              style={styles.analyzeButton}
            />
          )}
          
          {/* Debug: Test Results Display (remove in production) */}
          {__DEV__ && (
            <TouchableOpacity 
              onPress={testResultsDisplay}
              style={styles.debugButton}
            >
              <Text style={styles.debugButtonText}>🔧 Test Results Display</Text>
            </TouchableOpacity>
          )}
          
          {/* Loading Animation */}
          {loading && (
            <View style={styles.loadingContainer}>
              <Animated.View
                style={[
                  styles.loadingIcon,
                  {
                    transform: [
                      {
                        rotate: spinValue.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['0deg', '360deg'],
                        }),
                      },
                      { scale: pulseValue },
                    ],
                  },
                ]}
              >
                <Icon name="cpu" size={32} color={colors.primary} />
              </Animated.View>
              <Text style={styles.loadingText}>{analysisStage}</Text>
              <View style={styles.loadingDots}>
                <Animated.View style={[styles.dot, { opacity: pulseValue }]} />
                <Animated.View style={[styles.dot, { opacity: pulseValue }]} />
                <Animated.View style={[styles.dot, { opacity: pulseValue }]} />
              </View>
            </View>
          )}
        </Card>

        {/* Results Section */}
        {result && !loading && (
          <>
            {/* Results Ready Indicator */}
            <View style={styles.resultsReadyBanner}>
              <Icon name="check" size={24} color={colors.success} />
              <Text style={styles.resultsReadyText}>Analysis Complete</Text>
            </View>
            
            {/* Verdict Card */}
            <Card style={styles.resultCard}>
              <View style={[
                styles.verdictBadge,
                result.prediction === 'fake' ? styles.fakeBadge : styles.realBadge
              ]}>
                <Text style={styles.verdictLabel}>
                  {result.prediction === 'fake' ? 'FAKE DETECTED' : 'APPEARS AUTHENTIC'}
                </Text>
              </View>
              
              <View style={styles.confidenceContainer}>
                <Text style={styles.confidenceLabel}>Confidence Score</Text>
                <Text style={styles.confidenceValue}>
                  {(result.confidence * 100).toFixed(1)}%
                </Text>
              </View>

              <View style={styles.confidenceBar}>
                <View 
                  style={[
                    styles.confidenceBarFill,
                    { width: `${result.confidence * 100}%` },
                    result.prediction === 'fake' ? styles.fakeBar : styles.realBar
                  ]} 
                />
              </View>
            </Card>

            {/* Analysis Details */}
            <Card>
              <Text style={styles.sectionTitle}>Analysis Details</Text>
              
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Processing Time</Text>
                <Text style={styles.detailValue}>{result.processing_time}s</Text>
              </View>
              
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Faces Analyzed</Text>
                <Text style={styles.detailValue}>{result.faces_analyzed}</Text>
              </View>
              
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Models Used</Text>
                <Text style={styles.detailValue}>{result.models_used.length}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Routing Type</Text>
                <Text style={[
                  styles.detailValue,
                  styles.confidenceLevelBadge,
                  styles.highConfidence,
                ]}>
                  {(result.analysis.routing.routing_type || 'DETERMINISTIC')}
                </Text>
              </View>
            </Card>

            {/* Model Predictions */}
            <Card>
              <Text style={styles.sectionTitle}>Model Breakdown</Text>
              {Object.entries(result.analysis.model_predictions).map(([model, score]) => (
                <View key={model} style={styles.modelRow}>
                  <Text style={styles.modelName}>{model}</Text>
                  <View style={styles.modelScoreContainer}>
                    <View style={styles.modelScoreBar}>
                      <View 
                        style={[
                          styles.modelScoreBarFill,
                          { width: `${score * 100}%` },
                          score > 0.5 ? styles.fakeBar : styles.realBar
                        ]} 
                      />
                    </View>
                    <Text style={styles.modelScore}>{(score * 100).toFixed(1)}%</Text>
                  </View>
                </View>
              ))}
            </Card>

            {/* Video Characteristics */}
            <Card style={styles.lastCard}>
              <Text style={styles.sectionTitle}>Video Characteristics</Text>
              
              <View style={styles.characteristicsGrid}>
                <View style={styles.characteristicItem}>
                  <Text style={styles.characteristicLabel}>Resolution</Text>
                  <Text style={styles.characteristicValue}>
                    {result.analysis.routing.video_characteristics.resolution}
                  </Text>
                </View>
                
                <View style={styles.characteristicItem}>
                  <Text style={styles.characteristicLabel}>FPS</Text>
                  <Text style={styles.characteristicValue}>
                    {result.analysis.routing.video_characteristics.fps}
                  </Text>
                </View>
                
                <View style={styles.characteristicItem}>
                  <Text style={styles.characteristicLabel}>Duration</Text>
                  <Text style={styles.characteristicValue}>
                    {result.analysis.routing.video_characteristics.duration}
                  </Text>
                </View>
                
                <View style={styles.characteristicItem}>
                  <Text style={styles.characteristicLabel}>Compressed</Text>
                  <Text style={styles.characteristicValue}>
                    {result.analysis.routing.video_characteristics.is_compressed ? 'Yes' : 'No'}
                  </Text>
                </View>
              </View>
            </Card>
          </>
        )}
      </ScrollView>
      
      {/* Hidden file input for web */}
      {Platform.OS === 'web' && (
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          style={{ display: 'none' }}
          onChange={handleWebFileSelect}
        />
      )}
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
  
  // Upload Section
  uploadCard: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  sectionDescription: {
    fontSize: typography.sm,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  uploadArea: {
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: spacing.xl,
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
  },
  uploadIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  uploadText: {
    fontSize: typography.base,
    fontWeight: typography.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  uploadSubtext: {
    fontSize: typography.sm,
    color: colors.textSecondary,
  },
  
  // File Preview
  filePreview: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 12,
    marginBottom: spacing.md,
  },
  fileIcon: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  fileIconText: {
    fontSize: typography.xs,
    fontWeight: typography.bold,
    color: colors.white,
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: typography.base,
    fontWeight: typography.medium,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  fileSize: {
    fontSize: typography.sm,
    color: colors.textSecondary,
  },
  changeButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  changeButtonText: {
    fontSize: typography.sm,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  analyzeButton: {
    marginTop: spacing.sm,
  },
  
  // Debug Button
  debugButton: {
    marginTop: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.backgroundTertiary,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  debugButtonText: {
    fontSize: typography.sm,
    color: colors.textSecondary,
  },
  
  // Loading Animation
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    marginTop: spacing.md,
  },
  loadingIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primaryLight + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  loadingText: {
    fontSize: typography.base,
    fontWeight: typography.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  loadingDots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  
  // Results
  resultCard: {
    marginBottom: spacing.md,
  },
  verdictBadge: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  fakeBadge: {
    backgroundColor: colors.errorLight,
  },
  realBadge: {
    backgroundColor: colors.successLight,
  },
  verdictLabel: {
    fontSize: typography.base,
    fontWeight: typography.bold,
    color: colors.textPrimary,
  },
  confidenceContainer: {
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  confidenceLabel: {
    fontSize: typography.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  confidenceValue: {
    fontSize: typography['3xl'],
    fontWeight: typography.bold,
    color: colors.textPrimary,
  },
  confidenceBar: {
    height: 8,
    backgroundColor: colors.backgroundTertiary,
    borderRadius: 4,
    overflow: 'hidden',
  },
  confidenceBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  fakeBar: {
    backgroundColor: colors.error,
  },
  realBar: {
    backgroundColor: colors.success,
  },
  
  // Details
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm + 2,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
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
  confidenceLevelBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 4,
    fontSize: typography.xs,
    overflow: 'hidden',
  },
  highConfidence: {
    backgroundColor: colors.successLight,
    color: colors.success,
  },
  mediumConfidence: {
    backgroundColor: colors.warningLight,
    color: colors.warning,
  },
  lowConfidence: {
    backgroundColor: colors.errorLight,
    color: colors.error,
  },
  
  // Model Breakdown
  modelRow: {
    marginBottom: spacing.md,
  },
  modelName: {
    fontSize: typography.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  modelScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modelScoreBar: {
    flex: 1,
    height: 6,
    backgroundColor: colors.backgroundTertiary,
    borderRadius: 3,
    marginRight: spacing.sm,
    overflow: 'hidden',
  },
  modelScoreBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  modelScore: {
    fontSize: typography.sm,
    fontWeight: typography.semibold,
    color: colors.textPrimary,
    width: 50,
    textAlign: 'right',
  },
  
  // Characteristics
  characteristicsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
  },
  characteristicItem: {
    width: '50%',
    padding: spacing.xs,
    marginBottom: spacing.sm,
  },
  characteristicLabel: {
    fontSize: typography.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  characteristicValue: {
    fontSize: typography.base,
    fontWeight: typography.semibold,
    color: colors.textPrimary,
  },
  
  lastCard: {
    marginBottom: spacing.md,
  },
  
  // Results Ready Banner
  resultsReadyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.successLight,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 12,
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  resultsReadyText: {
    fontSize: typography.base,
    fontWeight: typography.bold,
    color: colors.success,
  },
});
