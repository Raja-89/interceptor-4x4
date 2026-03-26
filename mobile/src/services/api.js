import axios from 'axios';
import { Platform } from 'react-native';
import { API_CONFIG } from '../config/api';

const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
});

export const analyzeVideo = async (videoUri) => {
  try {
    const formData = new FormData();
    
    // For web, videoUri is a File object from input
    // For mobile, it's a URI string
    if (typeof videoUri === 'string') {
      // Mobile: URI string - React Native requires specific format
      const filename = videoUri.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `video/${match[1]}` : 'video/mp4';
      
      formData.append('file', {
        uri: Platform.OS === 'android' ? videoUri : videoUri.replace('file://', ''),
        type: type,
        name: filename || 'video.mp4',
      });
    } else {
      // Web: File object
      formData.append('file', videoUri);
    }

    console.log('Sending video analysis request...');
    console.log('API URL:', API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.PREDICT);
    
    const response = await apiClient.post(API_CONFIG.ENDPOINTS.PREDICT, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
      },
      transformRequest: (data, headers) => {
        // Let axios handle FormData for React Native
        return data;
      },
    });
    
    console.log('Analysis response received:', response.status);
    console.log('Response data:', JSON.stringify(response.data, null, 2));
    
    // Validate response structure
    if (!response.data || !response.data.prediction) {
      console.error('Invalid response structure:', response.data);
      throw new Error('Invalid response from server');
    }
    
    return response.data;
  } catch (error) {
    console.error('Analysis error:', error);
    console.error('Error details:', error.response?.data || error.message);
    throw error;
  }
};

export const checkHealth = async () => {
  try {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.HEALTH);
    return response.data;
  } catch (error) {
    console.error('Health check error:', error);
    throw error;
  }
};

export const getStats = async () => {
  try {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.STATS);
    return response.data;
  } catch (error) {
    console.error('Stats error:', error);
    throw error;
  }
};
