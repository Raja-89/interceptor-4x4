#!/bin/bash

echo "🔧 Fixing Interceptor Mobile App"
echo "================================="
echo ""

# Stop any running processes
echo "1️⃣ Stopping any running Expo processes..."
pkill -f "expo" 2>/dev/null || true
pkill -f "react-native" 2>/dev/null || true

# Clear cache
echo "2️⃣ Clearing cache..."
rm -rf .expo
rm -rf node_modules/.cache

# Reinstall dependencies
echo "3️⃣ Reinstalling dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "🚀 Starting app with clear cache..."
echo ""

# Start with clear cache
npm start -- --clear
