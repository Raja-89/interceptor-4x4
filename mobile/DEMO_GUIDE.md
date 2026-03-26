# Interceptor Mobile - Demo Guide for Judges

## Quick Start (5 Minutes)

### Prerequisites
```bash
# Install Node.js (if not installed)
# Download from: https://nodejs.org/

# Install Expo CLI globally
npm install -g expo-cli
```

### Setup & Run

1. **Install Dependencies**
```bash
cd mobile
npm install
```

2. **Start the App**
```bash
npm start
```

This opens Expo Dev Tools in your browser.

3. **View on Device**

Choose one of these options:

**Option A: Expo Go App (Easiest - Recommended for Demo)**
- Install "Expo Go" from App Store (iOS) or Play Store (Android)
- Scan the QR code shown in terminal/browser
- App loads instantly on your phone

**Option B: iOS Simulator (Mac only)**
- Press `i` in terminal
- Requires Xcode installed

**Option C: Android Emulator**
- Press `a` in terminal
- Requires Android Studio installed

**Option D: Web Browser (Quick Test)**
- Press `w` in terminal
- Opens in browser (limited mobile features)

---

## Demo Options for Judges

### Option 1: Live Demo on Your Phone (Best)
**Setup Time: 2 minutes**

1. Start backend API:
```bash
cd backend
python app.py
```

2. Get your local IP address:
```bash
# Mac/Linux
ifconfig | grep "inet "

# Windows
ipconfig
```

3. Update mobile config:
```javascript
// mobile/src/config/api.js
BASE_URL: 'http://YOUR_LOCAL_IP:8000'  // e.g., http://192.168.1.100:8000
```

4. Start mobile app:
```bash
cd mobile
npm start
```

5. Scan QR code with Expo Go app
6. Demo live to judges!

**Pros:**
- Real mobile experience
- Interactive demo
- No deployment needed
- Works offline (local network)

---

### Option 2: Expo Publish (Share Link)
**Setup Time: 5 minutes**

```bash
cd mobile

# Login to Expo (create free account)
expo login

# Publish app
expo publish
```

You get a shareable link like: `exp://exp.host/@username/interceptor-mobile`

**Share with judges:**
- Send them the link
- They install Expo Go app
- They open your link
- App loads on their phone

**Pros:**
- Judges can test on their own phones
- No physical access needed
- Professional presentation

---

### Option 3: Build APK/IPA (Production-Like)
**Setup Time: 30-60 minutes**

**Android APK (Easier):**
```bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Configure
eas build:configure

# Build APK
eas build -p android --profile preview
```

Download APK and share with judges (Android only).

**iOS IPA (Requires Apple Developer Account - $99/year):**
```bash
eas build -p ios --profile preview
```

**Pros:**
- Standalone app
- No Expo Go needed
- Professional feel

**Cons:**
- Takes time to build
- iOS requires paid developer account

---

### Option 4: Screen Recording Demo
**Setup Time: 10 minutes**

If judges can't access the app:

1. Run app on your phone
2. Record screen demo showing:
   - Video upload
   - Analysis in progress
   - Results display
   - Different video types

3. Create slides with:
   - Architecture diagram
   - Screen recordings
   - Live code walkthrough

**Pros:**
- Always works
- No technical issues during demo
- Can edit for best presentation

---

## Recommended Demo Flow

### For In-Person Judging:
**Use Option 1 (Live Demo on Your Phone)**

1. Have backend running on laptop
2. Connect phone to same WiFi
3. Show live analysis
4. Let judges try uploading videos

### For Remote/Virtual Judging:
**Use Option 2 (Expo Publish) + Option 4 (Screen Recording)**

1. Publish to Expo
2. Share link in advance
3. Have backup screen recording
4. Show live demo if possible

### For Hackathon Presentation:
**Combine Multiple Options**

1. Start with screen recording (safe)
2. Show live demo (impressive)
3. Share Expo link (judges can test later)
4. Have APK ready as backup

---

## Troubleshooting

### "Cannot connect to backend"
```javascript
// Try these in mobile/src/config/api.js:

// If using Expo Go on same WiFi:
BASE_URL: 'http://192.168.1.X:8000'  // Your laptop's local IP

// If using iOS Simulator:
BASE_URL: 'http://localhost:8000'

// If using Android Emulator:
BASE_URL: 'http://10.0.2.2:8000'

// If backend is deployed:
BASE_URL: 'https://your-app.railway.app'
```

### "Expo Go not loading"
- Check phone and laptop on same WiFi
- Disable VPN
- Check firewall settings
- Try restarting Expo dev server

### "Video upload fails"
- Ensure backend is running
- Check API URL is correct
- Test backend health: `curl http://YOUR_IP:8000/health`
- Check CORS settings in backend

---

## Quick Backend Deployment (If Needed)

If you want judges to access from anywhere:

### Deploy Backend to Railway (Free)

1. Go to railway.app
2. Click "Start a New Project"
3. Connect GitHub repo
4. Select backend folder
5. Deploy

You get a URL like: `https://interceptor-api.railway.app`

Update mobile config:
```javascript
BASE_URL: 'https://interceptor-api.railway.app'
```

Now judges can test from anywhere!

---

## Demo Checklist

Before presenting:

- [ ] Backend is running and accessible
- [ ] Mobile app connects to backend
- [ ] Test video upload works
- [ ] Results display correctly
- [ ] Have 2-3 sample videos ready
- [ ] Phone is charged
- [ ] Backup screen recording ready
- [ ] Expo link shared (if using)
- [ ] Slides prepared with architecture

---

## Sample Demo Script

**"Let me show you Interceptor mobile app..."**

1. **Open app** - "Clean, intuitive interface"
2. **Select video** - "Users can upload from gallery"
3. **Analyze** - "Our agentic system routes to specialist models"
4. **Show results** - "Clear verdict with confidence scores"
5. **Explain breakdown** - "Model predictions and video characteristics"
6. **Highlight features** - "Same backend as web, works anywhere"

**Time: 2-3 minutes**

---

## Need Help?

Common issues and solutions:

1. **Port already in use**: Change port in backend
2. **CORS errors**: Check backend CORS settings
3. **Slow uploads**: Use smaller test videos
4. **App crashes**: Check console logs in Expo

Good luck with your demo! 🚀
