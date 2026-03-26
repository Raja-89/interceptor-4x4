# Design Preview - Interceptor Mobile v2.0

## Visual Design

### Color Scheme
```
Primary:    #6366F1 (Indigo)
Success:    #10B981 (Green)
Error:      #EF4444 (Red)
Background: #FFFFFF (White)
Text:       #111827 (Dark Gray)
```

### Screen Layout

```
┌─────────────────────────────┐
│  Interceptor                │  ← Header (24px bold)
│  AI-Powered Deepfake...     │  ← Subtitle (14px gray)
├─────────────────────────────┤
│                             │
│  ┌───────────────────────┐  │
│  │ Upload Video          │  │  ← Card with title
│  │ Select a video to...  │  │
│  │                       │  │
│  │  ┌─────────────────┐  │  │
│  │  │       +         │  │  │  ← Upload area
│  │  │ Tap to select   │  │  │    (dashed border)
│  │  │ Supports MP4... │  │  │
│  │  └─────────────────┘  │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │  APPEARS AUTHENTIC    │  │  ← Result badge
│  │                       │  │    (green/red)
│  │  Confidence Score     │  │
│  │       94.5%          │  │  ← Large number
│  │  ▓▓▓▓▓▓▓▓▓▓░░░░░░   │  │  ← Progress bar
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │ Analysis Details      │  │
│  │ Processing Time   2.1s│  │  ← Key-value rows
│  │ Faces Analyzed    3   │  │
│  │ Models Used       4   │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │ Model Breakdown       │  │
│  │ BG-Model N            │  │
│  │ ▓▓▓▓▓▓▓▓░░░░  87.2%  │  │  ← Model scores
│  │ AV-Model N            │  │
│  │ ▓▓▓▓▓▓▓▓▓░░░  92.1%  │  │
│  └───────────────────────┘  │
│                             │
└─────────────────────────────┘
```

## Component Breakdown

### 1. Header
- App name: 24px bold
- Subtitle: 14px gray
- White background
- 24px padding

### 2. Upload Card
- White card with shadow
- 16px border radius
- Dashed border upload area
- Large + icon (64px circle)
- Clear instructions

### 3. File Preview
- Horizontal layout
- File icon (48px square)
- File name + size
- Change button (right)

### 4. Result Card
- Colored badge (green/red)
- Large confidence number (30px)
- Full-width progress bar
- Clean spacing

### 5. Detail Cards
- Section title (18px bold)
- Key-value rows
- Subtle dividers
- Consistent padding

### 6. Model Breakdown
- Model name (14px gray)
- Horizontal progress bar
- Percentage (right aligned)
- Color coded (green/red)

### 7. Characteristics Grid
- 2 column layout
- Label + value pairs
- Even spacing
- Clean typography

## Typography Hierarchy

```
Page Title:     24px Bold   #111827
Section Title:  18px Bold   #111827
Body Text:      16px Medium #111827
Secondary:      14px Normal #6B7280
Small:          12px Normal #9CA3AF
```

## Spacing System

```
Component Padding:  16px
Card Margin:        16px
Section Spacing:    24px
Element Spacing:    8px
Micro Spacing:      4px
```

## Interactive Elements

### Button States
- Default: Primary color
- Pressed: Darker shade (opacity 0.7)
- Disabled: 50% opacity
- Loading: Spinner in center

### Card Shadows
```
shadowColor: rgba(0, 0, 0, 0.1)
shadowOffset: { width: 0, height: 2 }
shadowOpacity: 0.1
shadowRadius: 8
elevation: 3 (Android)
```

## Comparison: Old vs New

### Old Design
- Dark theme (#0a0e27)
- Emoji icons (📹, 🔍, ⚠️, ✅)
- Complex color scheme
- Tight spacing
- Heavy visual weight

### New Design
- Light theme (#FFFFFF)
- No emojis
- Professional colors
- Generous spacing
- Clean and minimal

## Design Principles

1. **Clarity First**: Every element has a clear purpose
2. **Consistent Spacing**: 4px base unit system
3. **Visual Hierarchy**: Size and weight indicate importance
4. **Color with Purpose**: Colors convey meaning (green=good, red=bad)
5. **Touch-Friendly**: 44px minimum touch targets
6. **Scannable**: Easy to find information quickly
7. **Professional**: Suitable for business use

## Accessibility

- High contrast text (WCAG AA compliant)
- Large touch targets (44px minimum)
- Clear labels and descriptions
- Semantic color usage
- Readable font sizes (14px minimum)

## Performance

- Minimal re-renders
- Optimized images
- Efficient list rendering
- Smooth animations (60fps)
- Fast load times
