#!/usr/bin/env python3
"""Generate app icons and splash screens for Expo build"""

try:
    from PIL import Image, ImageDraw
    print("✓ PIL/Pillow is available")
except ImportError:
    print("Installing Pillow...")
    import subprocess
    subprocess.check_call(['pip', 'install', 'pillow'])
    from PIL import Image, ImageDraw

import os

# Colors
PRIMARY_COLOR = (139, 92, 246)  # #8B5CF6 (violet)
SECONDARY_COLOR = (96, 165, 250)  # #60A5FA (blue)
WHITE = (255, 255, 255)
DARK_PURPLE = (124, 58, 237)  # #7C3AED

def create_modern_icon(size, filename, is_adaptive=False):
    """Create modern shield-style app icon"""
    # Use RGBA for adaptive icon (transparent background)
    mode = 'RGBA' if is_adaptive else 'RGB'
    bg_color = (0, 0, 0, 0) if is_adaptive else PRIMARY_COLOR
    
    img = Image.new(mode, (size, size), bg_color)
    draw = ImageDraw.Draw(img)
    
    # Calculate dimensions
    margin = size // 8
    shield_width = size - (margin * 2)
    shield_height = int(shield_width * 1.2)
    
    # Center the shield
    x = margin
    y = (size - shield_height) // 2
    
    # Draw shield shape (rounded rectangle with pointed bottom)
    # Top rounded part
    top_height = int(shield_height * 0.7)
    draw.rounded_rectangle(
        [x, y, x + shield_width, y + top_height],
        radius=size // 10,
        fill=SECONDARY_COLOR + ((255,) if is_adaptive else ())
    )
    
    # Bottom triangle (pointed)
    bottom_y = y + top_height
    center_x = x + shield_width // 2
    bottom_point_y = y + shield_height
    
    draw.polygon(
        [
            (x, bottom_y),
            (x + shield_width, bottom_y),
            (center_x, bottom_point_y)
        ],
        fill=SECONDARY_COLOR + ((255,) if is_adaptive else ())
    )
    
    # Draw inner shield (smaller, different color)
    inner_margin = size // 6
    inner_width = size - (inner_margin * 2)
    inner_height = int(inner_width * 1.2)
    inner_x = inner_margin
    inner_y = (size - inner_height) // 2
    
    # Inner top rounded part
    inner_top_height = int(inner_height * 0.7)
    draw.rounded_rectangle(
        [inner_x, inner_y, inner_x + inner_width, inner_y + inner_top_height],
        radius=size // 12,
        fill=WHITE + ((255,) if is_adaptive else ())
    )
    
    # Inner bottom triangle
    inner_bottom_y = inner_y + inner_top_height
    inner_center_x = inner_x + inner_width // 2
    inner_bottom_point_y = inner_y + inner_height
    
    draw.polygon(
        [
            (inner_x, inner_bottom_y),
            (inner_x + inner_width, inner_bottom_y),
            (inner_center_x, inner_bottom_point_y)
        ],
        fill=WHITE + ((255,) if is_adaptive else ())
    )
    
    # Draw "I" letter in center (for Interceptor)
    letter_width = size // 12
    letter_height = size // 3
    letter_x = (size - letter_width) // 2
    letter_y = (size - letter_height) // 2
    
    draw.rounded_rectangle(
        [letter_x, letter_y, letter_x + letter_width, letter_y + letter_height],
        radius=letter_width // 2,
        fill=PRIMARY_COLOR + ((255,) if is_adaptive else ())
    )
    
    img.save(filename, 'PNG')
    print(f"✓ Created {filename} ({size}x{size})")

def create_splash(width, height, filename):
    """Create splash screen with modern design"""
    img = Image.new('RGB', (width, height), PRIMARY_COLOR)
    draw = ImageDraw.Draw(img)
    
    # Draw centered shield logo
    logo_size = min(width, height) // 3
    x = (width - logo_size) // 2
    y = (height - logo_size) // 2
    
    # Shield shape
    shield_height = int(logo_size * 1.2)
    shield_y = (height - shield_height) // 2
    
    # Top rounded part
    top_height = int(shield_height * 0.7)
    draw.rounded_rectangle(
        [x, shield_y, x + logo_size, shield_y + top_height],
        radius=logo_size // 10,
        fill=SECONDARY_COLOR
    )
    
    # Bottom triangle
    bottom_y = shield_y + top_height
    center_x = x + logo_size // 2
    bottom_point_y = shield_y + shield_height
    
    draw.polygon(
        [
            (x, bottom_y),
            (x + logo_size, bottom_y),
            (center_x, bottom_point_y)
        ],
        fill=SECONDARY_COLOR
    )
    
    # Inner shield
    inner_margin = logo_size // 6
    inner_size = logo_size - (inner_margin * 2)
    inner_x = x + inner_margin
    inner_height = int(inner_size * 1.2)
    inner_y = (height - inner_height) // 2
    
    # Inner top
    inner_top_height = int(inner_height * 0.7)
    draw.rounded_rectangle(
        [inner_x, inner_y, inner_x + inner_size, inner_y + inner_top_height],
        radius=inner_size // 12,
        fill=WHITE
    )
    
    # Inner bottom
    inner_bottom_y = inner_y + inner_top_height
    inner_center_x = inner_x + inner_size // 2
    inner_bottom_point_y = inner_y + inner_height
    
    draw.polygon(
        [
            (inner_x, inner_bottom_y),
            (inner_x + inner_size, inner_bottom_y),
            (inner_center_x, inner_bottom_point_y)
        ],
        fill=WHITE
    )
    
    # "I" letter
    letter_width = logo_size // 12
    letter_height = logo_size // 3
    letter_x = (width - letter_width) // 2
    letter_y = (height - letter_height) // 2
    
    draw.rounded_rectangle(
        [letter_x, letter_y, letter_x + letter_width, letter_y + letter_height],
        radius=letter_width // 2,
        fill=PRIMARY_COLOR
    )
    
    img.save(filename, 'PNG')
    print(f"✓ Created {filename} ({width}x{height})")

def create_favicon(size, filename):
    """Create favicon"""
    img = Image.new('RGB', (size, size), PRIMARY_COLOR)
    draw = ImageDraw.Draw(img)
    
    # Simple shield
    margin = size // 6
    width = size - (margin * 2)
    height = int(width * 1.2)
    x = margin
    y = (size - height) // 2
    
    # Top part
    top_height = int(height * 0.7)
    draw.rounded_rectangle(
        [x, y, x + width, y + top_height],
        radius=size // 10,
        fill=SECONDARY_COLOR
    )
    
    # Bottom triangle
    bottom_y = y + top_height
    center_x = x + width // 2
    bottom_point_y = y + height
    
    draw.polygon(
        [
            (x, bottom_y),
            (x + width, bottom_y),
            (center_x, bottom_point_y)
        ],
        fill=SECONDARY_COLOR
    )
    
    img.save(filename, 'PNG')
    print(f"✓ Created {filename} ({size}x{size})")

if __name__ == '__main__':
    print("\n🎨 Generating Expo app assets...\n")
    
    # Create assets directory
    os.makedirs('assets', exist_ok=True)
    
    # Generate icons with modern shield design
    create_modern_icon(1024, 'assets/icon.png')  # App icon
    create_modern_icon(1024, 'assets/adaptive-icon.png', is_adaptive=True)  # Android adaptive icon
    create_splash(1284, 2778, 'assets/splash.png')  # Splash screen
    create_favicon(48, 'assets/favicon.png')  # Web favicon
    
    print("\n✅ All assets generated successfully!")
    print("\nModern shield-style icons created with:")
    print("  • Professional shield design")
    print("  • Violet and blue color scheme")
    print("  • 'I' letter for Interceptor")
    print("\nYou can now run:")
    print("  npx eas build --platform android --profile preview\n")
