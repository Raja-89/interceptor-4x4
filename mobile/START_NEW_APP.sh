#!/bin/bash

echo "🎨 Starting Interceptor Mobile v2.0"
echo "===================================="
echo ""
echo "✨ New Features:"
echo "   • Clean, modern UI inspired by Blinkit/Zepto"
echo "   • Professional color scheme"
echo "   • No emojis, pure design"
echo "   • Reusable component system"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
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

echo ""
echo "🚀 Starting development server..."
echo ""
echo "📱 View options:"
echo "   • Scan QR with Expo Go app"
echo "   • Press 'i' for iOS Simulator"
echo "   • Press 'a' for Android Emulator"
echo "   • Press 'w' for Web Browser"
echo ""

npm start -- --clear
