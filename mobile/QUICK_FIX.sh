#!/bin/bash

echo "🔧 Quick Fix - Cleaning and Reinstalling"
echo "========================================"
echo ""

# Remove old installations
echo "1️⃣ Removing old node_modules..."
rm -rf node_modules package-lock.json .expo

# Reinstall
echo "2️⃣ Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Installation failed"
    exit 1
fi

echo ""
echo "✅ Fixed! Starting with tunnel mode..."
echo ""

npm start -- --tunnel
