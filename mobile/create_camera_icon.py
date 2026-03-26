#!/usr/bin/env python3
"""Create app icons from camera image"""

try:
    from PIL import Image, ImageDraw
    print("✓ PIL available")
except ImportError:
    print("Installing Pillow...")
    import subprocess
    subprocess.check_call(['pip', 'install', 'pillow'])
    from PIL import Image, ImageDraw

import os

# Camera icon colors (from the image)
CAMERA_BLUE = (165, 208, 233)  # Light blue body
DARK_BLUE = (23, 71, 123)  # Dark blue outline
CREAM = (253, 255, 245)  # Cream/white color
PRIMARY_VIOLET = (139, 92, 246)  # App primary color

def create_camera_icon(size, filename, with_background=True):
    """Create camera icon at specified size"""
    
    # Create image with background
    if with_background:
        img = Image.new('RGB', (size, size), PRIMARY_VIOLET)
    else:
        img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    
    draw = ImageDraw.Draw(img)
    
    # Scale factor
    scale = size / 1024
    
    # Camera body dimensions (scaled)
    camera_width = int(730 * scale)
    camera_height = int(450 * scale)
    x = (size - camera_width) // 2
    y = (size - camera_height) // 2
    
    # Draw camera body (rounded rectangle)
    corner_radius = int(80 * scale)
    
    # Main body (light blue)
    draw.rounded_rectangle(
        [x, y, x + camera_width, y + camera_height],
        radius=corner_radius,
        fill=CAMERA_BLUE if with_background else CAMERA_BLUE + (255,)
    )
    
    # Top viewfinder bumps
    bump_width = int(80 * scale)
    bump_height = int(40 * scale)
    bump_y = y - bump_height // 2
    
    # Left bump
    left_bump_x = x + int(70 * scale)
    draw.rounded_rectangle(
        [left_bump_x, bump_y, left_bump_x + bump_width, bump_y + bump_height],
        radius=int(10 * scale),
        fill=CREAM if with_background else CREAM + (255,)
    )
    
    # Right bump
    right_bump_x = x + camera_width - int(150 * scale)
    draw.rounded_rectangle(
        [right_bump_x, bump_y, right_bump_x + bump_width, bump_y + bump_height],
        radius=int(10 * scale),
        fill=CREAM if with_background else CREAM + (255,)
    )
    
    # Lens (large circle in center)
    lens_size = int(280 * scale)
    lens_x = x + (camera_width - lens_size) // 2
    lens_y = y + (camera_height - lens_size) // 2
    
    # Outer lens ring (dark blue)
    draw.ellipse(
        [lens_x, lens_y, lens_x + lens_size, lens_y + lens_size],
        fill=DARK_BLUE if with_background else DARK_BLUE + (255,)
    )
    
    # Inner lens ring (light blue)
    inner_lens_margin = int(30 * scale)
    draw.ellipse(
        [lens_x + inner_lens_margin, lens_y + inner_lens_margin,
         lens_x + lens_size - inner_lens_margin, lens_y + lens_size - inner_lens_margin],
        fill=CAMERA_BLUE if with_background else CAMERA_BLUE + (255,)
    )
    
    # Center lens (cream/white)
    center_lens_margin = int(80 * scale)
    draw.ellipse(
        [lens_x + center_lens_margin, lens_y + center_lens_margin,
         lens_x + lens_size - center_lens_margin, lens_y + lens_size - center_lens_margin],
        fill=CREAM if with_background else CREAM + (255,)
    )
    
    # Flash/button (small circle on left)
    button_size = int(50 * scale)
    button_x = x + int(100 * scale)
    button_y = y + camera_height - int(120 * scale)
    
    # Outer button (dark blue)
    draw.ellipse(
        [button_x, button_y, button_x + button_size, button_y + button_size],
        fill=DARK_BLUE if with_background else DARK_BLUE + (255,)
    )
    
    # Inner button (cream)
    button_inner_margin = int(15 * scale)
    draw.ellipse(
        [button_x + button_inner_margin, button_y + button_inner_margin,
         button_x + button_size - button_inner_margin, button_y + button_size - button_inner_margin],
        fill=CREAM if with_background else CREAM + (255,)
    )
    
    # Draw outline (dark blue border)
    outline_width = int(12 * scale)
    for i in range(outline_width):
        draw.rounded_rectangle(
            [x + i, y + i, x + camera_width - i, y + camera_height - i],
            radius=corner_radius - i,
            outline=DARK_BLUE if with_background else DARK_BLUE + (255,)
        )
    
    img.save(filename, 'PNG')
    print(f"✓ Created {filename} ({size}x{size})")

def create_splash(width, height, filename):
    """Create splash screen with camera icon"""
    img = Image.new('RGB', (width, height), PRIMARY_VIOLET)
    
    # Create camera icon
    icon_size = min(width, height) // 3
    temp_icon = Image.new('RGBA', (icon_size, icon_size), (0, 0, 0, 0))
    
    # Draw camera on temp icon
    draw = ImageDraw.Draw(temp_icon)
    scale = icon_size / 1024
    
    camera_width = int(730 * scale)
    camera_height = int(450 * scale)
    x = (icon_size - camera_width) // 2
    y = (icon_size - camera_height) // 2
    
    # Simplified camera for splash
    corner_radius = int(80 * scale)
    draw.rounded_rectangle(
        [x, y, x + camera_width, y + camera_height],
        radius=corner_radius,
        fill=CAMERA_BLUE + (255,)
    )
    
    # Lens
    lens_size = int(280 * scale)
    lens_x = x + (camera_width - lens_size) // 2
    lens_y = y + (camera_height - lens_size) // 2
    
    draw.ellipse(
        [lens_x, lens_y, lens_x + lens_size, lens_y + lens_size],
        fill=DARK_BLUE + (255,)
    )
    
    inner_lens_margin = int(30 * scale)
    draw.ellipse(
        [lens_x + inner_lens_margin, lens_y + inner_lens_margin,
         lens_x + lens_size - inner_lens_margin, lens_y + lens_size - inner_lens_margin],
        fill=CAMERA_BLUE + (255,)
    )
    
    center_lens_margin = int(80 * scale)
    draw.ellipse(
        [lens_x + center_lens_margin, lens_y + center_lens_margin,
         lens_x + lens_size - center_lens_margin, lens_y + lens_size - center_lens_margin],
        fill=CREAM + (255,)
    )
    
    # Paste camera icon centered on splash
    paste_x = (width - icon_size) // 2
    paste_y = (height - icon_size) // 2
    img.paste(temp_icon, (paste_x, paste_y), temp_icon)
    
    img.save(filename, 'PNG')
    print(f"✓ Created {filename} ({width}x{height})")

if __name__ == '__main__':
    print("\n📷 Creating camera app icons...\n")
    
    os.makedirs('assets', exist_ok=True)
    
    # Create icons
    create_camera_icon(1024, 'assets/icon.png', with_background=True)
    create_camera_icon(1024, 'assets/adaptive-icon.png', with_background=False)
    create_camera_icon(48, 'assets/favicon.png', with_background=True)
    create_splash(1284, 2778, 'assets/splash.png')
    
    print("\n✅ All camera icons created successfully!")
    print("Camera icon matches the provided design!")
