# Mobile App Deployment Options for Judges

## 🎯 Best Options Ranked

### 1. ⭐ Expo Go + Published App (RECOMMENDED)
**Best for: Remote judging, sharing with multiple judges**

**Steps:**
```bash
# One-time setup
npm install -g expo-cli
expo login  # Create free account at expo.dev

# Publish your app
cd mobile
expo publish
```

**You get a shareable URL:**
- `exp://exp.host/@yourname/interceptor-mobile`
- Or QR code to scan

**Judges need:**
1. Install "Expo Go" app (free)
2. Scan QR code or open link
3. App loads instantly

**Pros:**
- ✅ No build time
- ✅ Updates instantly
- ✅ Works on iOS and Android
- ✅ Free
- ✅ Professional

**Cons:**
- ❌ Requires Expo Go app
- ❌ Needs internet connection

---

### 2. 🔥 Live Demo on Your Device
**Best for: In-person judging, hackathon presentations**

**Steps:**
```bash
# Terminal 1: Start backend
cd backend
python app.py

# Terminal 2: Start mobile app
cd mobile
npm start
```

**Then:**
1. Scan QR code with Expo Go
2. App runs on your phone
3. Demo live to judges

**Pros:**
- ✅ Most impressive
- ✅ Interactive
- ✅ Real mobile experience
- ✅ No deployment needed

**Cons:**
- ❌ Requires stable WiFi
- ❌ Technical issues possible

---

### 3. 📦 Android APK Build
**Best for: Judges with Android phones, professional feel**

**Steps:**
```bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Build APK (takes 10-20 minutes)
eas build -p android --profile preview
```

**You get:**
- Downloadable APK file
- Share via Google Drive/Dropbox
- Judges install directly

**Pros:**
- ✅ Standalone app
- ✅ No Expo Go needed
- ✅ Professional
- ✅ Works offline

**Cons:**
- ❌ Takes time to build
- ❌ Android only
- ❌ Judges need to enable "Install from unknown sources"

---

### 4. 🎥 Screen Recording + Slides
**Best for: Backup plan, asynchronous judging**

**Record demo showing:**
1. App opening
2. Video selection
3. Upload process
4. Analysis running
5. Results display
6. Different video types

**Tools:**
- iOS: Built-in screen recording
- Android: Built-in screen recording
- Edit with: iMovie, CapCut, or DaVinci Resolve

**Pros:**
- ✅ Always works
- ✅ No technical issues
- ✅ Can edit for best presentation
- ✅ Reusable

**Cons:**
- ❌ Not interactive
- ❌ Less impressive

---

## 🚀 Quick Deploy Commands

### Expo Publish (2 minutes)
```bash
cd mobile
expo publish
# Share the URL with judges
```

### Build APK (20 minutes)
```bash
cd mobile
eas build -p android --profile preview
# Download and share APK
```

### Local Demo (30 seconds)
```bash
# Terminal 1
cd backend && python app.py

# Terminal 2
cd mobile && npm start
# Scan QR code
```

---

## 📋 Pre-Demo Checklist

### Day Before:
- [ ] Test full flow end-to-end
- [ ] Prepare 3-5 sample videos (real + fake)
- [ ] Charge phone fully
- [ ] Install Expo Go on demo device
- [ ] Test on judges' network if possible
- [ ] Create backup screen recording

### 1 Hour Before:
- [ ] Deploy backend to Railway/Render
- [ ] Publish app to Expo
- [ ] Test published app
- [ ] Share Expo link with judges
- [ ] Prepare slides with QR code

### 5 Minutes Before:
- [ ] Start backend
- [ ] Start mobile app
- [ ] Load app on phone
- [ ] Test one video upload
- [ ] Have backup video ready

---

## 🎤 Demo Script (2 minutes)

**Opening (15 seconds)**
"Interceptor is available as a mobile app for on-the-go deepfake detection."

**Show App (30 seconds)**
- Open app, show clean interface
- "Users can upload videos from their gallery"
- Select video, show file info

**Analysis (45 seconds)**
- Tap analyze
- "Our agentic system routes to specialist models"
- Show loading state
- Results appear

**Explain Results (30 seconds)**
- "Clear verdict with confidence score"
- "Model breakdown shows which specialists were used"
- "Video characteristics explain routing decisions"
- "Same backend as web app, works anywhere"

**Closing (15 seconds)**
"Available on iOS and Android, with offline mode coming soon."

---

## 🆘 Troubleshooting

### "Cannot connect to Metro bundler"
```bash
# Clear cache and restart
expo start -c
```

### "Network response timed out"
```bash
# Use tunnel mode
expo start --tunnel
```

### "Unable to resolve module"
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### Backend connection fails
```javascript
// mobile/src/config/api.js

// For Expo Go on same WiFi:
BASE_URL: 'http://192.168.1.X:8000'

// For iOS Simulator:
BASE_URL: 'http://localhost:8000'

// For Android Emulator:
BASE_URL: 'http://10.0.2.2:8000'

// For deployed backend:
BASE_URL: 'https://your-app.railway.app'
```

---

## 💡 Pro Tips

1. **Have Multiple Options Ready**
   - Primary: Live demo
   - Backup: Screen recording
   - Fallback: Slides with screenshots

2. **Test Everything Twice**
   - Test on actual judging network
   - Test with actual sample videos
   - Test with judges' devices if possible

3. **Prepare for Questions**
   - "Why mobile?" → Accessibility, on-the-go verification
   - "Offline mode?" → Coming soon with quantized models
   - "iOS/Android?" → Both via React Native
   - "App store?" → Post-hackathon roadmap

4. **Make it Interactive**
   - Let judges upload their own videos
   - Show different video types
   - Explain routing decisions

5. **Highlight Innovation**
   - Same backend as web (efficient)
   - Agentic routing (intelligent)
   - Real-time analysis (fast)
   - Cross-platform (accessible)

---

## 📱 Sharing with Judges

### Email Template:
```
Subject: Interceptor Mobile App - Demo Access

Hi [Judge Name],

Try our Interceptor mobile app for deepfake detection:

🔗 App Link: exp://exp.host/@username/interceptor-mobile

📱 How to access:
1. Install "Expo Go" app (free)
   - iOS: https://apps.apple.com/app/expo-go/id982107779
   - Android: https://play.google.com/store/apps/details?id=host.exp.exponent

2. Open Expo Go and scan this QR code:
   [Attach QR code image]

3. Or paste the link above in Expo Go

🎥 Demo video: [Link to screen recording]

Looking forward to your feedback!

Best,
[Your Name]
```

---

Good luck with your presentation! 🚀
