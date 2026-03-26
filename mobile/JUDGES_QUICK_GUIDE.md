# 📱 Interceptor Mobile - For Judges

## Try the App in 3 Steps

### Step 1: Install Expo Go
Download the free "Expo Go" app:
- **iOS**: [App Store](https://apps.apple.com/app/expo-go/id982107779)
- **Android**: [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

### Step 2: Scan QR Code
Open Expo Go and scan this QR code:

```
[QR CODE WILL BE HERE AFTER PUBLISHING]
```

Or use this link: `exp://exp.host/@username/interceptor-mobile`

### Step 3: Test the App
1. Tap "Select Video"
2. Choose a video from your gallery
3. Tap "Analyze Video"
4. See deepfake detection results!

---

## What You'll See

### 1. Upload Screen
- Clean, intuitive interface
- Select video from gallery
- See file info (name, size)

### 2. Analysis
- Real-time processing
- Loading indicator
- Typically takes 2-5 seconds

### 3. Results
- **Verdict**: FAKE or REAL
- **Confidence Score**: Percentage
- **Model Breakdown**: Which AI models were used
- **Video Characteristics**: Resolution, FPS, compression details

---

## Key Features to Notice

✅ **Agentic Routing**: Different videos use different specialist models
✅ **Explainable AI**: See why the system made its decision
✅ **Fast Processing**: Results in seconds
✅ **Mobile-First**: Works on any iOS or Android device
✅ **Same Backend**: Uses same API as web application

---

## Sample Videos to Test

We recommend testing with:
1. A regular video from your phone (should show as REAL)
2. A compressed/edited video (may trigger compression specialist)
3. A low-light video (may trigger lighting specialist)

---

## Technical Highlights

- **Frontend**: React Native + Expo
- **Backend**: FastAPI with Python
- **Models**: EfficientNet-B4 based specialists
- **Architecture**: Client-server (same as web)
- **Deployment**: Cross-platform (iOS + Android)

---

## Questions?

**Q: Do I need to create an account?**
A: No, the app works immediately without signup.

**Q: Is my video uploaded to a server?**
A: Yes, for analysis. Videos are processed and immediately deleted.

**Q: Can this work offline?**
A: Currently requires internet. Offline mode with on-device models is on the roadmap.

**Q: How accurate is it?**
A: Our ensemble system achieves 94.9% confidence across multiple specialist models.

**Q: What makes this different from other deepfake detectors?**
A: Agentic routing - the system intelligently chooses which specialist models to use based on video characteristics, making it more efficient and accurate.

---

## Contact

For questions or feedback during judging:
- Email: [your-email]
- GitHub: [your-repo]
- Demo: [live-demo-link]

Thank you for testing Interceptor! 🚀
