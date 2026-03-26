#!/usr/bin/env python3
"""Convert SVG favicon to PNG icons for mobile app"""

try:
    from PIL import Image
    import cairosvg
    print("✓ PIL and cairosvg available")
except ImportError:
    print("Installing required packages...")
    import subprocess
    subprocess.check_call(['pip', 'install', 'pillow', 'cairosvg'])
    from PIL import Image
    import cairosvg

import os

def convert_svg_to_png(svg_path, png_path, size):
    """Convert SVG to PNG at specified size"""
    try:
        # Convert SVG to PNG using cairosvg
        cairosvg.svg2png(
            url=svg_path,
            write_to=png_path,
            output_width=size,
            output_height=size
        )
        print(f"✓ Created {png_path} ({size}x{size})")
        return True
    except Exception as e:
        print(f"✗ Failed to convert {svg_path}: {e}")
        return False

def create_adaptive_icon(svg_path, png_path, size):
    """Create adaptive icon with transparent background"""
    try:
        # Convert with transparency
        cairosvg.svg2png(
            url=svg_path,
            write_to=png_path,
            output_width=size,
            output_height=size,
            background_color='transparent'
        )
        print(f"✓ Created {png_path} ({size}x{size}) with transparency")
        return True
    except Exception as e:
        print(f"✗ Failed to create adaptive icon: {e}")
        return False

if __name__ == '__main__':
    print("\n📷 Converting camera favicon to mobile icons...\n")
    
    svg_path = '../frontend/public/favicon.svg'
    
    if not os.path.exists(svg_path):
        print(f"✗ SVG file not found: {svg_path}")
        exit(1)
    
    # Create assets directory
    os.makedirs('assets', exist_ok=True)
    
    # Convert to different sizes
    success = True
    success &= convert_svg_to_png(svg_path, 'assets/icon.png', 1024)
    success &= create_adaptive_icon(svg_path, 'assets/adaptive-icon.png', 1024)
    success &= convert_svg_to_png(svg_path, 'assets/favicon.png', 48)
    
    # Create splash screen (larger version with background)
    if success:
        print("\n✓ Creating splash screen...")
        try:
            # Create splash with violet background
            from PIL import Image, ImageDraw
            
            splash = Image.new('RGB', (1284, 2778), (139, 92, 246))  # Violet background
            
            # Load the icon
            icon = Image.open('assets/icon.png')
            
            # Resize icon to fit splash
            icon_size = 400
            icon = icon.resize((icon_size, icon_size), Image.Resampling.LANCZOS)
            
            # Center the icon
            x = (1284 - icon_size) // 2
            y = (2778 - icon_size) // 2
            
            # Paste icon (handle transparency)
            if icon.mode == 'RGBA':
                splash.paste(icon, (x, y), icon)
            else:
                splash.paste(icon, (x, y))
            
            splash.save('assets/splash.png', 'PNG')
            print("✓ Created assets/splash.png (1284x2778)")
        except Exception as e:
            print(f"✗ Failed to create splash: {e}")
            success = False
    
    if success:
        print("\n✅ All icons created successfully!")
        print("\nCamera favicon from web is now used in mobile app!")
    else:
        print("\n⚠️  Some icons failed to create")
        print("Falling back to simple icon generation...")
        
        # Fallback: Create simple icons
        from PIL import Image, ImageDraw
        
        # Simple camera icon
        for size, filename in [(1024, 'assets/icon.png'), (1024, 'assets/adaptive-icon.png'), (48, 'assets/favicon.png')]:
            img = Image.new('RGB', (size, size), (139, 92, 246))
            draw = ImageDraw.Draw(img)
            
            # Draw simple camera shape
            margin = size // 6
            draw.rounded_rectangle(
                [margin, margin, size-margin, size-margin],
                radius=size // 10,
                fill=(96, 165, 250)
            )
            
            img.save(filename, 'PNG')
            print(f"✓ Created {filename} (fallback)")
        
        print("\n✅ Fallback icons created!")
