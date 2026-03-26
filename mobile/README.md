# Interceptor Mobile App

React Native mobile application for the Interceptor deepfake detection system.

## 🚀 Quick Start (2 Minutes)

### Option 1: Automated Setup (Recommended)
```bash
cd mobile
./QUICK_START.sh
```

### Option 2: Manual Setup
```bash
# 1. Install dependencies
cd mobile
npm install

# 2. Start the app
npm start

# 3. Scan QR code with Expo Go app
```

## 📱 Running the App

After running `npm start`, you'll see a QR code. Choose how to view:

**On Your Phone (Easiest):**
1. Install "Expo Go" app from App Store or Play Store
2. Scan the QR code
3. App loads instantly

**On Simulator/Emulator:**
- Press `i` for iOS Simulator (Mac only)
- Press `a` for Android Emulator
- Press `w` for Web Browser

## ⚙️ Configuration

Update the backend URL in `src/config/api.js`:

```javascript
// For local development (same WiFi)
BASE_URL: 'http://192.168.1.X:8000'  // Replace X with your IP

// For deployed backend
BASE_URL: 'https://your-app.railway.app'
```

**Find your local IP:**
```bash
# Mac/Linux
ifconfig | grep "inet "

# Windows
ipconfig
```

## 🎯 Demo for Judges

See detailed guides:
- **[DEMO_GUIDE.md](./DEMO_GUIDE.md)** - Complete demo instructions
- **[DEPLOYMENT_OPTIONS.md](./DEPLOYMENT_OPTIONS.md)** - All deployment options

**Quick Demo Options:**
1. **Live on your phone** - Most impressive
2. **Expo Publish** - Share link with judges
3. **APK Build** - Standalone Android app
4. **Screen Recording** - Backup plan

## 📦 Publishing to Expo (Share with Judges)

```bash
# One-time setup
npm install -g expo-cli
expo login

# Publish
expo publish

# Share the generated link with judges
```

## 🏗️ Building Standalone App

**Android APK:**
```bash
npm install -g eas-cli
eas login
eas build -p android --profile preview
```

**iOS (requires Apple Developer account):**
```bash
eas build -p ios --profile preview
```

## ✨ Features

- Video upload from device gallery
- Real-time deepfake analysis
- Confidence score visualization
- Model breakdown display
- Video characteristics analysis
- Beautiful dark theme UI

## 🔧 Requirements

- Node.js 16+
- npm or yarn
- Expo Go app (for testing on device)
- Backend API running

## 📁 Project Structure

```
mobile/
├── src/
│   ├── screens/        # App screens
│   ├── components/     # Reusable components
│   ├── services/       # API services
│   └── config/         # Configuration
├── App.js              # Entry point
├── DEMO_GUIDE.md       # Demo instructions
└── DEPLOYMENT_OPTIONS.md  # Deployment guide
```

## 🆘 Troubleshooting

**"Cannot connect to backend"**
- Check backend is running: `curl http://localhost:8000/health`
- Update API URL in `src/config/api.js`
- Ensure phone and laptop on same WiFi

**"Expo Go not loading"**
- Restart Expo dev server: `npm start -c`
- Check firewall settings
- Try tunnel mode: `expo start --tunnel`

**"Module not found"**
```bash
rm -rf node_modules
npm install
```

## 📚 Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Backend API Documentation](../README.md)
