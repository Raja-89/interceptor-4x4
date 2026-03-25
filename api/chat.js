/**
 * Chat Endpoint
 * AI chatbot for mobile app
 */

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, context } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Generate context-aware response
    const response = generateChatResponse(message.toLowerCase(), context);

    res.status(200).json({
      response,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      error: 'Chat failed',
      message: error.message,
    });
  }
}

function generateChatResponse(message, context) {
  // Check if there's recent analysis in context
  const hasAnalysis = context && context.prediction;
  const isFake = hasAnalysis && context.prediction === 'fake';
  const confidence = hasAnalysis ? (context.confidence * 100).toFixed(1) : null;

  // Context-aware responses
  if (message.includes('latest') || message.includes('last') || message.includes('recent')) {
    if (hasAnalysis) {
      return `Your latest analysis detected a ${context.prediction.toUpperCase()} video with ${confidence}% confidence. ${context.faces_analyzed} faces were analyzed using ${context.models_used.length} AI models. ${isFake ? 'The video shows signs of manipulation.' : 'The video appears authentic.'}`;
    }
    return "You haven't analyzed any videos yet. Upload a video to get started!";
  }

  if (message.includes('how') && (message.includes('work') || message.includes('detect'))) {
    return "Interceptor uses an agentic AI approach with 6 specialist models. First, a baseline model screens the video. Then, intelligent routing determines which specialist models to use based on video characteristics. Finally, an ensemble decision combines all predictions for the final verdict with up to 94.9% accuracy!";
  }

  if (message.includes('confidence') || message.includes('sure') || message.includes('certain')) {
    if (hasAnalysis) {
      return `The confidence score of ${confidence}% indicates ${confidence > 85 ? 'high certainty' : confidence > 65 ? 'moderate certainty' : 'lower certainty'} in the prediction. This is based on analysis from ${context.models_used.length} specialist models working together.`;
    }
    return "Confidence scores range from 0-100%, with higher scores indicating greater certainty. Our multi-model approach achieves up to 94.9% accuracy!";
  }

  if (message.includes('fake') || message.includes('deepfake') || message.includes('manipulated')) {
    if (hasAnalysis && isFake) {
      return `Yes, the video was detected as FAKE with ${confidence}% confidence. Our AI models found ${context.faces_analyzed} faces and identified manipulation patterns across multiple analysis dimensions.`;
    } else if (hasAnalysis) {
      return `No, the video appears REAL with ${confidence}% confidence. Our analysis didn't find significant signs of manipulation.`;
    }
    return "Deepfakes are AI-generated or manipulated videos that can be highly realistic. Interceptor uses 6 specialist AI models to detect various types of manipulation with high accuracy.";
  }

  if (message.includes('model') || message.includes('ai')) {
    if (hasAnalysis) {
      return `Your analysis used ${context.models_used.length} models: ${context.models_used.join(', ')}. Each model specializes in detecting different types of manipulation like compression artifacts, lighting inconsistencies, and temporal anomalies.`;
    }
    return "Interceptor uses 6 specialist AI models: BG-Model N (baseline), CM-Model N (compression), LL-Model N (lighting), RR-Model N (resolution), AV-Model N (audio-visual), and TM-Model N (temporal). Each focuses on specific manipulation types!";
  }

  if (message.includes('accurate') || message.includes('accuracy') || message.includes('reliable')) {
    return "Interceptor achieves up to 94.9% accuracy using a multi-model ensemble approach. The intelligent routing system selects the best specialist models for each video, ensuring reliable detection across various deepfake types.";
  }

  if (message.includes('face') || message.includes('detect face')) {
    if (hasAnalysis) {
      return `The analysis detected ${context.faces_analyzed} face(s) in your video. Our models examine facial features, movements, and consistency across frames to identify manipulation.`;
    }
    return "Interceptor automatically detects faces in videos and analyzes them for signs of manipulation. The more faces detected, the more comprehensive the analysis!";
  }

  if (message.includes('time') || message.includes('long') || message.includes('fast')) {
    if (hasAnalysis && context.processing_time) {
      return `Your video was analyzed in ${context.processing_time} seconds. Processing time depends on video length, resolution, and the number of specialist models invoked.`;
    }
    return "Analysis typically takes 2-10 seconds depending on video length and complexity. Our intelligent routing ensures fast processing by only invoking necessary specialist models!";
  }

  if (message.includes('help') || message.includes('what can')) {
    return "I can help you understand your analysis results, explain how the detection works, discuss confidence scores, and answer questions about deepfakes. Just ask me anything about your video analysis!";
  }

  if (message.includes('thank') || message.includes('thanks')) {
    return "You're welcome! Feel free to ask if you have more questions about your analysis or deepfake detection in general.";
  }

  if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
    if (hasAnalysis) {
      return `Hello! I see you recently analyzed a video (${context.prediction.toUpperCase()}, ${confidence}% confidence). What would you like to know about it?`;
    }
    return "Hello! I'm your AI assistant for deepfake detection. Upload a video to analyze it, or ask me anything about how Interceptor works!";
  }

  // Default response
  if (hasAnalysis) {
    return `Your latest analysis: ${context.prediction.toUpperCase()} (${confidence}% confidence), ${context.faces_analyzed} faces analyzed, ${context.models_used.length} models used. Ask me anything about these results!`;
  }

  return "I'm here to help you understand deepfake detection! Upload a video to analyze it, or ask me how Interceptor works, about accuracy, models, or anything else related to deepfake detection.";
}
