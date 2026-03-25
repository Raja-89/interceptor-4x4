// API Configuration
export const API_CONFIG = {
  // Production: Vercel deployed backend
  // Local testing: Use your computer's local IP
  
  BASE_URL: 'https://interceptor-h4d.vercel.app/api',  // ✅ Vercel serverless API
  
  // For local testing, change to:
  // BASE_URL: 'http://192.168.1.104:8000',
  
  ENDPOINTS: {
    PREDICT: '/predict',
    HEALTH: '/health',
    STATS: '/stats',
    CHAT: '/chat',
  },
  
  TIMEOUT: 120000, // 2 minutes for video processing
};
