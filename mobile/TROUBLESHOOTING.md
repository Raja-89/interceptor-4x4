# 🔧 Troubleshooting Guide

## App Not Opening After Scan

### Quick Fixes (Try in Order)

#### 1. Clear Cache and Restart
```bash
# Stop the current server (Ctrl+C)
# Then run:
cd mobile
npm start -- --clear
```

#### 2. Check Expo Go Version
- Update Expo Go app to latest version
- iOS: App Store
- Android: Play Store

#### 3. Try Tunnel Mode
```bash
npm start -- --tunnel
```
This works better with restrictive networks/firewalls.

#### 4. Reinstall Dependencies
```bash
cd mobile
rm -rf node_modules
npm install
npm start
```

#### 5. Check Console for Errors
Look at the terminal where you ran `npm start` for error messages.

---

## Common Error Messages

### "Unable to resolve module"
```bash
# Clear cache
npm start -- --clear

# Or reinstall
rm -rf node_modules
npm install
```

### "Network response timed out"
```bash
# Use tunnel mode
npm start -- --tunnel
```

### "Something went wrong"
Check these:
1. Phone and computer on same WiFi
2. Firewall not blocking port 19000-19001
3. VPN is disabled
4. Expo Go app is updated

---

## Step-by-Step Debugging

### Step 1: Verify Setup
```bash
# Check Node version (should be 16+)
node --version

# Check npm version
npm --version

# Check if dependencies installed
ls node_modules
```

### Step 2: Check Expo Status
```bash
cd mobile
npm start
```

Look for:
- ✅ "Metro waiting on..."
- ✅ QR code displayed
- ❌ Any error messages

### Step 3: Test Connection
In Expo Go app:
1. Go to "Projects" tab
2. Look for "interceptor-mobile"
3. If not showing, try scanning QR again

### Step 4: Check Logs
When app fails to open:
1. Shake phone
2. Tap "Debug Remote JS"
3. Check browser console for errors

---

## Platform-Specific Issues

### iOS Issues

**"Unable to load exp://"**
```bash
# Try LAN mode
npm start -- --lan
```

**Stuck on splash screen**
- Force quit Expo Go
- Reopen and scan again

### Android Issues

**"Could not connect to development server"**
```bash
# Use tunnel mode
npm start -- --tunnel
```

**App crashes immediately**
- Check Android version (needs 5.0+)
- Clear Expo Go app cache in Android settings

---

## Network Issues

### Same WiFi Not Working?

**Option 1: Use Tunnel**
```bash
npm start -- --tunnel
```

**Option 2: Use USB (Android)**
```bash
# Enable USB debugging on phone
# Connect via USB
adb reverse tcp:19000 tcp:19000
adb reverse tcp:19001 tcp:19001
npm start
```

**Option 3: Manual Connection**
In Expo Go:
1. Tap "Enter URL manually"
2. Enter: `exp://YOUR_IP:19000`
3. Replace YOUR_IP with your computer's IP

---

## Still Not Working?

### Try Web Version First
```bash
npm start
# Press 'w' for web
```

If web works, the code is fine - it's a connection issue.

### Check Firewall
```bash
# Mac: System Preferences > Security > Firewall
# Windows: Windows Defender Firewall
# Linux: sudo ufw status
```

Allow ports 19000-19001.

### Use Different Network
- Try mobile hotspot
- Try different WiFi network
- Use tunnel mode

---

## Alternative: Run on Simulator

### iOS Simulator (Mac only)
```bash
npm start
# Press 'i'
```

### Android Emulator
```bash
# Start emulator in Android Studio first
npm start
# Press 'a'
```

---

## Get Detailed Logs

```bash
# Start with verbose logging
EXPO_DEBUG=true npm start

# Or check logs in Expo Go
# Shake device > "Show Dev Menu" > "Debug Remote JS"
```

---

## Quick Test Commands

```bash
# Test 1: Clear everything
cd mobile
rm -rf node_modules .expo
npm install
npm start -- --clear

# Test 2: Tunnel mode
npm start -- --tunnel

# Test 3: LAN mode
npm start -- --lan

# Test 4: Web (to verify code works)
npm start
# Press 'w'
```

---

## Contact for Help

If still stuck, provide:
1. Error message from terminal
2. Expo Go version
3. Phone OS version
4. Network setup (WiFi/mobile data)
5. Screenshot of error

---

## Working? Great!

Once it works:
- Bookmark the connection method that worked
- Note any special settings needed
- Test with sample video to verify backend connection
