# Video Analysis Flow - Mobile App

## Complete Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    USER SELECTS VIDEO                        │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  CLICKS "ANALYZE VIDEO"                      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  HomeScreen.js: analyzeSelectedVideo()                       │
│  - setLoading(true)                                          │
│  - setAnalysisStage('Connecting to server...')              │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  Health Check: api.js → checkHealth()                        │
│  GET http://192.168.1.104:8000/health                       │
│  ✅ Backend is reachable                                     │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  Upload Video: api.js → analyzeVideo()                       │
│  - Create FormData with video file                           │
│  - POST http://192.168.1.104:8000/predict                   │
│  - Show progress: "Uploading video..."                       │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  Backend Processing: backend/app.py                          │
│  - Receive video file                                        │
│  - Save to temp directory                                    │
│  - analyze_video() → Extract features                        │
│  - generate_prediction() → Run AI models                     │
│  - Return JSON response                                      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  Response Received: api.js                                   │
│  - Log: "Analysis response received: 200"                    │
│  - Log: "Response data: {...}"                               │
│  - Validate response structure                               │
│  - Return response.data                                      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  Process Result: HomeScreen.js                               │
│  - Log: "Analysis result received: {...}"                    │
│  - Validate result has prediction field                      │
│  - Wait minimum 2 seconds for UX                             │
│  - setAnalysisStage('Analysis complete!')                    │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  Update State: HomeScreen.js                                 │
│  - Log: "Setting result state with: {...}"                   │
│  - setResult(analysisResult)                                 │
│  - Log: "Result state updated successfully"                  │
│  - setLoading(false)                                         │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  Save to Storage: AsyncStorage                               │
│  - Save as 'lastAnalysis' for chatbot                        │
│  - Save as 'scan_[timestamp]' for history                    │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  Render Results: HomeScreen.js                               │
│  - Condition: result && !loading                             │
│  - Show "Analysis Complete" banner (green)                   │
│  - Show Verdict Card (FAKE/REAL)                             │
│  - Show Confidence Score                                     │
│  - Show Analysis Details                                     │
│  - Show Model Breakdown                                      │
│  - Show Video Characteristics                                │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  Auto-Scroll: HomeScreen.js                                  │
│  - Wait 300ms for render                                     │
│  - scrollViewRef.current.scrollToEnd()                       │
│  - Results visible to user                                   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    USER SEES RESULTS! 🎉                     │
└─────────────────────────────────────────────────────────────┘
```

## Debug Flow (Test Button)

```
┌─────────────────────────────────────────────────────────────┐
│         USER CLICKS "🔧 Test Results Display"                │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  testResultsDisplay()                                        │
│  - Create mock result object                                 │
│  - Log: "Setting mock result for testing"                    │
│  - setResult(mockResult)                                     │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  Render Results (same as above)                              │
│  - "Analysis Complete" banner                                │
│  - All result cards                                          │
│  - Auto-scroll                                               │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              INSTANT RESULTS (No API Call)                   │
└─────────────────────────────────────────────────────────────┘
```

## Key Points

### 1. State Management
- `loading`: Controls loading animation and button state
- `result`: Stores analysis result, triggers results rendering
- `analysisStage`: Shows current progress message
- `selectedFile`: Stores selected video info

### 2. Conditional Rendering
```javascript
{result && !loading && (
  // Results section only shows when:
  // - result is set (not null)
  // - loading is false (analysis complete)
)}
```

### 3. Logging Points
- ✅ Before API call: "Sending video analysis request..."
- ✅ After response: "Analysis response received: 200"
- ✅ Response data: Full JSON logged
- ✅ Before setState: "Setting result state with: {...}"
- ✅ After setState: "Result state updated successfully"

### 4. Error Handling
- Health check fails → Show connection error
- Invalid response → Show validation error
- Network timeout → Show timeout error (2 min)
- Any exception → Show generic error with details

### 5. UX Enhancements
- Minimum 2-second analysis (feels more professional)
- Animated loading with spinning CPU icon
- Progress messages change during analysis
- Auto-scroll to results
- Visual "Analysis Complete" banner

## Troubleshooting by Log

### If you see this log:
```
Sending video analysis request...
API URL: http://192.168.1.104:8000/predict
```
**Status:** Request sent, waiting for backend

### If you see this log:
```
Analysis response received: 200
Response data: {...}
```
**Status:** Backend responded successfully

### If you see this log:
```
Setting result state with: {...}
Result state updated successfully
```
**Status:** State updated, UI should render

### If you DON'T see "Result state updated successfully":
**Problem:** State update failed or error occurred
**Check:** Look for error messages above this point

### If you see state updated but no UI:
**Problem:** Rendering issue or results below viewport
**Check:** Manually scroll down, check for React errors

## Response Structure

The backend returns this structure:
```json
{
  "prediction": "fake" | "real",
  "confidence": 0.85,
  "faces_analyzed": 3,
  "models_used": ["BG-Model N", "LL-Model N"],
  "processing_time": 2.5,
  "analysis": {
    "confidence_breakdown": { ... },
    "routing": {
      "confidence_level": "high" | "medium" | "low",
      "video_characteristics": {
        "resolution": "1920x1080",
        "fps": 30.0,
        "duration": "5.2s",
        "is_compressed": true,
        "is_low_light": false
      }
    },
    "model_predictions": {
      "BG-Model N": 0.89,
      "LL-Model N": 0.82
    }
  }
}
```

All these fields are used in the UI to display results.
