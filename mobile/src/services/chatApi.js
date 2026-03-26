import { API_CONFIG } from '../config/api';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 10000,
});

export const sendChatMessage = async (message, context = {}) => {
  try {
    // Call real backend API
    const response = await apiClient.post('/chat', {
      message,
      context,
    });
    
    return response.data.response;
  } catch (error) {
    console.error('Chat API error:', error);
    
    // Fallback to local responses if API fails
    return generateLocalResponse(message, context);
  }
};

// Fallback local response generator (used if API fails)
const generateLocalResponse = (message, context) => {
  const lowerMessage = message.toLowerCase();
  const { lastAnalysis } = context;
  
  // Analysis-specific questions with context
  if (lowerMessage.includes('last') || lowerMessage.includes('recent') || lowerMessage.includes('previous') || lowerMessage.includes('result')) {
    if (lastAnalysis) {
      const { prediction, confidence, models_used, processing_time, faces_analyzed } = lastAnalysis;
      const confidencePercent = (confidence * 100).toFixed(1);
      
      if (lowerMessage.includes('explain') || lowerMessage.includes('why')) {
        return `Your video was classified as ${prediction.toUpperCase()} with ${confidencePercent}% confidence. We analyzed ${faces_analyzed} face(s) using ${models_used.length} specialist models (${models_used.join(', ')}). The high confidence comes from consistent predictions across multiple models, each examining different aspects like compression artifacts, lighting patterns, and temporal inconsistencies.`;
      }
      
      return `Your last analysis: Video classified as ${prediction.toUpperCase()} with ${confidencePercent}% confidence. Processed in ${processing_time}s using ${models_used.length} models: ${models_used.join(', ')}. ${faces_analyzed} face(s) were analyzed.`;
    }
    return "You haven't analyzed any videos yet. Go to the Analyze tab to upload a video and get started!";
  }
  
  // Questions about specific analysis details
  if (lastAnalysis && (lowerMessage.includes('why') || lowerMessage.includes('explain'))) {
    const { prediction, confidence, analysis } = lastAnalysis;
    const confidenceLevel = analysis?.routing?.confidence_level || 'unknown';
    
    return `The video was classified as ${prediction.toUpperCase()} because our models detected ${prediction === 'fake' ? 'manipulation indicators' : 'authentic characteristics'}. The ${confidenceLevel} confidence level (${(confidence * 100).toFixed(1)}%) is based on consensus across multiple specialist models. Each model examines different aspects: facial inconsistencies, compression patterns, lighting anomalies, and temporal coherence.`;
  }
  
  // How it works
  if (lowerMessage.includes('how') && (lowerMessage.includes('work') || lowerMessage.includes('detect') || lowerMessage.includes('analyze'))) {
    return "Interceptor uses an agentic AI approach:\n\n1. Baseline screening: Initial analysis by a generalist model\n2. Intelligent routing: Video characteristics (compression, resolution, lighting) determine which specialist models to use\n3. Specialist analysis: 6 expert models examine specific manipulation types\n4. Ensemble decision: Final verdict based on weighted consensus\n\nThis multi-model approach achieves 94.9% accuracy!";
  }
  
  // Confidence and accuracy
  if (lowerMessage.includes('confidence') || lowerMessage.includes('accurate') || lowerMessage.includes('sure') || lowerMessage.includes('trust')) {
    if (lastAnalysis) {
      const confidencePercent = (lastAnalysis.confidence * 100).toFixed(1);
      const level = lastAnalysis.analysis?.routing?.confidence_level;
      return `Your video's confidence score is ${confidencePercent}%, which is ${level} confidence. Scores above 85% are high confidence, 70-85% are medium, and below 70% are low. Our system achieves 94.9% overall accuracy by combining predictions from multiple specialist models.`;
    }
    return "Confidence scores represent how certain our models are about predictions. We achieve 94.9% overall accuracy by using 6 specialist models that examine different aspects of videos. Scores above 85% are considered high confidence.";
  }
  
  // Deepfake explanation
  if (lowerMessage.includes('fake') || lowerMessage.includes('deepfake') || lowerMessage.includes('manipulat')) {
    return "Deepfakes are AI-generated or manipulated videos created using deep learning. Our system detects them by analyzing:\n\n• Facial inconsistencies (unnatural expressions, blinking patterns)\n• Compression artifacts (manipulation leaves traces)\n• Lighting anomalies (inconsistent shadows, reflections)\n• Audio-visual sync (mismatched lip movements)\n• Temporal coherence (frame-to-frame inconsistencies)\n\nEach specialist model focuses on specific manipulation signatures.";
  }
  
  // Models and specialists
  if (lowerMessage.includes('model') || lowerMessage.includes('specialist') || lowerMessage.includes('which model')) {
    if (lastAnalysis && lastAnalysis.models_used) {
      return `For your video, we used: ${lastAnalysis.models_used.join(', ')}.\n\nAll 6 specialists:\n• BG-Model: Background inconsistencies\n• AV-Model: Audio-visual synchronization\n• CM-Model: Compression artifacts\n• RR-Model: Resolution anomalies\n• LL-Model: Low-light manipulation\n• TM-Model: Temporal inconsistencies\n\nModels are selected based on your video's characteristics.`;
    }
    return "We have 6 specialist models:\n\n• BG-Model (86.25%): Background analysis\n• AV-Model (93.00%): Audio-visual sync\n• CM-Model (80.83%): Compression artifacts\n• RR-Model (85.00%): Resolution patterns\n• LL-Model (93.42%): Low-light detection\n• TM-Model (78.50%): Temporal analysis\n\nEach specializes in detecting specific manipulation types.";
  }
  
  // Improvement tips
  if (lowerMessage.includes('improve') || lowerMessage.includes('better') || lowerMessage.includes('tip')) {
    return "For best detection results:\n\n✓ Upload high-quality videos (720p or higher)\n✓ Ensure good lighting and clear facial features\n✓ Include audio if available (helps AV-Model)\n✓ Avoid heavily compressed videos\n✓ Videos should be at least 1-2 seconds long\n✓ Multiple faces are fine - we analyze all of them\n\nHigher quality input = more accurate detection!";
  }
  
  // Processing time
  if (lowerMessage.includes('time') || lowerMessage.includes('fast') || lowerMessage.includes('slow') || lowerMessage.includes('long')) {
    if (lastAnalysis) {
      return `Your video was processed in ${lastAnalysis.processing_time}s. Processing time depends on video length, resolution, and number of faces. Average is 2.1s. Longer videos or multiple faces take more time but provide more accurate results.`;
    }
    return "Average processing time is 2.1 seconds. Time varies based on video length, resolution, and number of faces detected. Our system is optimized for speed without sacrificing accuracy!";
  }
  
  // Help and capabilities
  if (lowerMessage.includes('help') || lowerMessage.includes('what can') || lowerMessage.includes('do you')) {
    return "I can help you with:\n\n• Understanding your analysis results\n• Explaining confidence scores\n• Details about our detection models\n• How deepfake detection works\n• Tips for better results\n• Questions about specific predictions\n\nJust ask me anything about your analysis or deepfakes!";
  }
  
  // Greetings
  if (lowerMessage.match(/^(hi|hello|hey|greetings)/)) {
    return lastAnalysis 
      ? `Hello! I see you recently analyzed a video (${lastAnalysis.prediction.toUpperCase()}, ${(lastAnalysis.confidence * 100).toFixed(1)}% confidence). What would you like to know about it?`
      : "Hello! I'm your AI assistant for deepfake detection. Upload a video in the Analyze tab, and I can help you understand the results!";
  }
  
  // Thanks
  if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
    return "You're welcome! Feel free to ask if you have more questions about your analysis or deepfake detection. 😊";
  }
  
  // Default contextual response
  if (lastAnalysis) {
    return `I'm here to help you understand your analysis results! Your last video was ${lastAnalysis.prediction.toUpperCase()} with ${(lastAnalysis.confidence * 100).toFixed(1)}% confidence. You can ask me about:\n\n• Why this prediction was made\n• What the confidence score means\n• Which models were used\n• How to improve detection accuracy\n\nWhat would you like to know?`;
  }
  
  return "I'm your AI assistant for deepfake detection! I can explain how our system works, discuss confidence scores, and help you understand analysis results. Upload a video in the Analyze tab to get started, then come back and ask me anything!";
};

export const getChatHistory = async () => {
  // In production, fetch from backend
  return [];
};
