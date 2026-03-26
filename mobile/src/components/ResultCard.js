import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ResultCard({ result }) {
  const isFake = result.prediction === 'fake';
  const confidence = (result.confidence * 100).toFixed(1);

  return (
    <View style={styles.container}>
      {/* Main Result */}
      <View style={[styles.resultBadge, isFake ? styles.fakeBadge : styles.realBadge]}>
        <Text style={styles.resultText}>
          {isFake ? '⚠️ FAKE DETECTED' : '✅ APPEARS REAL'}
        </Text>
        <Text style={styles.confidenceText}>{confidence}% Confidence</Text>
      </View>

      {/* Analysis Details */}
      <View style={styles.detailsSection}>
        <Text style={styles.sectionTitle}>Analysis Details</Text>
        
        <DetailRow label="Faces Analyzed" value={result.faces_analyzed} />
        <DetailRow label="Processing Time" value={`${result.processing_time}s`} />
        <DetailRow 
          label="Models Used" 
          value={result.models_used.length} 
        />
      </View>

      {/* Model Predictions */}
      <View style={styles.detailsSection}>
        <Text style={styles.sectionTitle}>Model Breakdown</Text>
        {Object.entries(result.analysis.model_predictions).map(([model, score]) => (
          <View key={model} style={styles.modelRow}>
            <Text style={styles.modelName}>{model}</Text>
            <View style={styles.scoreBar}>
              <View 
                style={[
                  styles.scoreBarFill, 
                  { width: `${score * 100}%` },
                  score > 0.5 ? styles.fakeBar : styles.realBar
                ]} 
              />
            </View>
            <Text style={styles.scoreText}>{(score * 100).toFixed(1)}%</Text>
          </View>
        ))}
      </View>

      {/* Video Characteristics */}
      <View style={styles.detailsSection}>
        <Text style={styles.sectionTitle}>Video Characteristics</Text>
        <DetailRow 
          label="Resolution" 
          value={result.analysis.routing.video_characteristics.resolution} 
        />
        <DetailRow 
          label="FPS" 
          value={result.analysis.routing.video_characteristics.fps} 
        />
        <DetailRow 
          label="Duration" 
          value={result.analysis.routing.video_characteristics.duration} 
        />
        <DetailRow 
          label="Compressed" 
          value={result.analysis.routing.video_characteristics.is_compressed ? 'Yes' : 'No'} 
        />
        <DetailRow 
          label="Low Light" 
          value={result.analysis.routing.video_characteristics.is_low_light ? 'Yes' : 'No'} 
        />
      </View>
    </View>
  );
}

function DetailRow({ label, value }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1f3a',
    borderRadius: 16,
    padding: 20,
  },
  resultBadge: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  fakeBadge: {
    backgroundColor: '#ff6b6b22',
    borderWidth: 2,
    borderColor: '#ff6b6b',
  },
  realBadge: {
    backgroundColor: '#51cf6622',
    borderWidth: 2,
    borderColor: '#51cf66',
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  confidenceText: {
    fontSize: 16,
    color: '#8b92b0',
  },
  detailsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#252b4a',
  },
  detailLabel: {
    color: '#8b92b0',
    fontSize: 14,
  },
  detailValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  modelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  modelName: {
    color: '#8b92b0',
    fontSize: 12,
    width: 100,
  },
  scoreBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#252b4a',
    borderRadius: 4,
    marginHorizontal: 10,
    overflow: 'hidden',
  },
  scoreBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  fakeBar: {
    backgroundColor: '#ff6b6b',
  },
  realBar: {
    backgroundColor: '#51cf66',
  },
  scoreText: {
    color: '#fff',
    fontSize: 12,
    width: 45,
    textAlign: 'right',
  },
});
