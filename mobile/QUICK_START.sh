#!/bin/bash

# Interceptor Mobile - Quick Start Script
# Run this to set up and start the mobile app

echo "🚀 Interceptor Mobile - Quick Start"
echo "===================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    echo "📥 Please install from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed"
    exit 1
fi

echo "✅ npm found: $(npm --version)"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo ""
    echo "📦 Installing dependencies..."
    npm install
    
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies"
        exit 1
    fi
    
    echo "✅ Dependencies installed"
else
    echo "✅ Dependencies already installed"
fi

# Get local IP address for configuration
echo ""
echo "🌐 Network Configuration"
echo "========================"

if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    LOCAL_IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -n 1)
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    LOCAL_IP=$(hostname -I | awk '{print $1}')
else
    # Windows (Git Bash)
    LOCAL_IP=$(ipconfig | grep "IPv4" | awk '{print $NF}' | head -n 1)
fi

echo "📍 Your local IP: $LOCAL_IP"
echo ""
echo "⚙️  Update mobile/src/config/api.js with:"
echo "   BASE_URL: 'http://$LOCAL_IP:8000'"
echo ""

# Check if backend is running
echo "🔍 Checking backend status..."
if curl -s http://localhost:8000/health > /dev/null 2>&1; then
    echo "✅ Backend is running on localhost:8000"
elif curl -s http://$LOCAL_IP:8000/health > /dev/null 2>&1; then
    echo "✅ Backend is running on $LOCAL_IP:8000"
else
    echo "⚠️  Backend not detected"
    echo "   Start backend with: cd backend && python app.py"
fi

echo ""
echo "🎯 Starting Expo development server..."
echo "======================================="
echo ""
echo "📱 To view on your phone:"
echo "   1. Install 'Expo Go' app from App Store/Play Store"
echo "   2. Scan the QR code that appears"
echo "   3. App will load on your phone"
echo ""
echo "💻 Or press:"
echo "   • i - for iOS Simulator (Mac only)"
echo "   • a - for Android Emulator"
echo "   • w - for Web Browser"
echo ""

# Start Expo
npm start
