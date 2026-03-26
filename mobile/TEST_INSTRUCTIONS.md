# Testing Instructions

## What's Not Working?

Please tell me:
1. What error message do you see?
2. Where does it fail? (installation, starting, loading, runtime)
3. What happens when you try to run it?

## Quick Tests

### Test 1: Simple App
```bash
cd mobile

# Temporarily use test app
# Edit App.js and change:
# import HomeScreen from './src/screens/HomeScreen';
# to:
# import HomeScreen from './TestApp';

npm start
# Press 'w' for web
```

### Test 2: Check Dependencies
```bash
cd mobile
npm list --depth=0
```

### Test 3: Clear Everything
```bash
cd mobile
rm -rf node_modules .expo package-lock.json
npm install
npm start
```

## Common Issues & Fixes

### Issue: "Cannot find module"
**Fix:**
```bash
cd mobile
npm install
```

### Issue: "Port already in use"
**Fix:**
```bash
# Kill the process
pkill -f expo
# Or use different port
npm start -- --port 8083
```

### Issue: "Metro bundler failed"
**Fix:**
```bash
npm start -- --clear
```

### Issue: "Expo Go not loading"
**Fix:**
- Try web version: `npm start` then press `w`
- Check if phone and laptop on same WiFi
- Try tunnel mode (if ngrok works)

### Issue: "White screen / blank screen"
**Possible causes:**
1. Import error - check console
2. Component crash - check error boundary
3. Missing dependency

**Debug:**
```bash
# Check console in terminal
# Look for red error messages
```

## Web Testing (Easiest)

```bash
cd mobile
npm start
# Press 'w' when it starts
# Opens in browser at http://localhost:8081
```

This should work even if phone connection doesn't.

## What to Check

1. **Terminal output** - Any red errors?
2. **Browser console** (if using web) - F12 to open
3. **Expo Go app** - Any error messages?
4. **Network** - Same WiFi for phone and laptop?

## Get More Info

Run with verbose logging:
```bash
cd mobile
EXPO_DEBUG=true npm start
```

## Still Stuck?

Tell me:
- Exact error message
- When it fails (install/start/load/runtime)
- Platform (web/iOS/Android)
- What you see vs what you expect
