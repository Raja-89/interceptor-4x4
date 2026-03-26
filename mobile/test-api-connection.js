#!/usr/bin/env node
/**
 * Test API connection from mobile app
 * Run: node test-api-connection.js
 */

const axios = require('axios');

const API_URL = 'http://10.23.211.94:8000';

async function testConnection() {
  console.log('🧪 Testing Mobile App API Connection...\n');
  
  // Test 1: Health check
  console.log('1️⃣ Testing /health endpoint...');
  try {
    const response = await axios.get(`${API_URL}/health`);
    console.log('   ✅ Health check passed');
    console.log('   Response:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.log('   ❌ Health check failed');
    console.log('   Error:', error.message);
    return;
  }
  
  console.log('');
  
  // Test 2: Chat endpoint
  console.log('2️⃣ Testing /chat endpoint...');
  try {
    const response = await axios.post(`${API_URL}/chat`, {
      message: 'hello',
      context: {}
    });
    console.log('   ✅ Chat endpoint passed');
    console.log('   Response:', response.data.response.substring(0, 50) + '...');
  } catch (error) {
    console.log('   ❌ Chat endpoint failed');
    console.log('   Error:', error.message);
  }
  
  console.log('');
  
  // Test 3: Stats endpoint
  console.log('3️⃣ Testing /stats endpoint...');
  try {
    const response = await axios.get(`${API_URL}/stats`);
    console.log('   ✅ Stats endpoint passed');
    console.log('   Models:', Object.keys(response.data.models).length);
  } catch (error) {
    console.log('   ❌ Stats endpoint failed');
    console.log('   Error:', error.message);
  }
  
  console.log('');
  console.log('✅ API connection test complete!');
  console.log('');
  console.log('📱 Mobile app should be able to connect to:');
  console.log(`   ${API_URL}`);
  console.log('');
  console.log('⚠️  Make sure your phone is on the same WiFi network!');
}

testConnection().catch(console.error);
