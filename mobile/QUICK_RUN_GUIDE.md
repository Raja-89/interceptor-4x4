# Quick Run Guide - Interceptor Mobile App

## 🚀 Start Everything in 2 Minutes

### Step 1: Start Backend (Terminal 1)
```bash
cd backend
source venv/bin/activate  # Linux/Mac
# OR
venv\Scripts\activate     # Windows

python app.py
```

✅ Backend running at: http://localhost:8000

### Step 2: Start Mobile App (Terminal 2)
```bash
cd mobile
npm start
```

When Metro bundler starts, press:
- **`w`** - Open in web browser (recommended for testing)
- **`a`** - Open on Android device/emulator
- **`i`** - Open on iOS simulator (Mac only)

## 🎯 Quick Test Flow

1. **Wait for splash screen** (2 seconds)
2. **Go to Analyze tab** (second icon from left)
3. **Upload a video** (click the upload area)
4. **Wait for analysis** (~2-5 seconds)
5. **View results** (detailed breakdown)
6. **Go to Dashboard** (first icon) - see your scan
7. **Go to Chat** (middle icon) - ask about your analysis

## 💡 Test Questions for Chatbot

After analyzing a video, try asking:
- "Explain my last result"
- "Why was it classified as fake?"
- "What's the confidence score?"
- "Which models were used?"
- "How does the detection work?"
- "Tips for better results"

## 🔍 Verify Everything Works

### Backend Health Check
Open in browser: http://localhost:8000/health

Should see:
```json
{
  "status": "healthy",
  "cv2_available": true,
  "timestamp": "..."
}
```

### Mobile App Checklist
- [ ] Splash screen shows animated shield
- [ ] Dashboard loads without errors
- [ ] Can upload video in Analyze tab
- [ ] Analysis completes and shows results
- [ ] Dashboard shows recent scan
- [ ] Chatbot responds to questions
- [ ] Stats page shows model info
- [ ] About page displays correctly

## 🎨 UI Features to Notice

### Light Theme
- Violet primary color (#8B5CF6)
- Light blue secondary (#60A5FA)
- Clean white backgrounds
- Professional icons (no emojis)

### Navigation
- Icon-only bottom tabs (no labels)
- 5 tabs: Dashboard, Analyze, Chat, Stats, About

### Real Data
- Dashboard stats update after each scan
- Recent scans show actual timestamps
- Chatbot uses real analysis context
- System status checks backend health

## 🐛 Troubleshooting

### Backend Not Starting
```bash
# Check if port 8000 is in use
lsof -i :8000  # Mac/Linux
netstat -ano | findstr :8000  # Windows

# Kill process if needed
kill -9 <PID>  # Mac/Linux
taskkill /PID <PID> /F  # Windows
```

### Mobile App Issues
```bash
# Clear cache and restart
cd mobile
rm -rf node_modules/.cache
npm start -- --reset-cache
```

### Video Upload Fails
1. Check backend is running (http://localhost:8000)
2. Check console for errors
3. Try smaller video file (<10MB)
4. Ensure video format is MP4/MOV/AVI

### Chatbot Not Working
1. Upload and analyze a video first
2. Check AsyncStorage in browser DevTools
3. Look for 'lastAnalysis' key
4. Refresh app if needed

## 📱 Testing on Mobile Device

### Using Expo Go App
1. Install Expo Go from App Store/Play Store
2. Scan QR code shown in terminal
3. App loads on your device

### Using Web Browser (Easiest)
1. Press `w` when Metro starts
2. Opens in default browser
3. Full functionality available
4. Use browser DevTools for debugging

## 🎬 Demo Script

**For judges/reviewers:**

1. **Show splash screen** - "Professional animated loading"
2. **Dashboard** - "Real-time stats and recent scans"
3. **Upload video** - "Simple drag-and-drop interface"
4. **Analysis results** - "Detailed breakdown with confidence scores"
5. **Model breakdown** - "6 specialist models working together"
6. **Chatbot** - "AI assistant explains the results"
7. **Stats page** - "System performance and model accuracy"
8. **About page** - "Technology stack and use cases"

## 🔥 Quick Commands Reference

```bash
# Start backend
cd backend && source venv/bin/activate && python app.py

# Start mobile (web)
cd mobile && npm start

# Check backend health
curl http://localhost:8000/health

# View backend logs
# (shown in terminal where backend is running)

# View mobile logs
# (shown in Metro bundler terminal)
```

## ✨ What Makes This Special

1. **No Hardcoded Data** - Everything is real and dynamic
2. **Smart Chatbot** - Context-aware responses about your analysis
3. **Professional Design** - Matches modern mobile apps
4. **Real API Integration** - Connected to FastAPI backend
5. **Persistent Storage** - Scans saved and retrieved
6. **Multi-Platform** - Works on web and mobile

---

**Ready to impress!** 🚀

The app is production-ready with:
- ✅ Light violet/blue theme
- ✅ Professional icons (no emojis)
- ✅ Real data (no hardcoding)
- ✅ Working chatbot
- ✅ Backend integration
- ✅ Persistent storage

**Time to run**: ~2 minutes
**Time to test**: ~5 minutes
**Time to demo**: ~10 minutes
