from PIL import Image
import sys

def crop_icon(input_path, output_path):
    try:
        img = Image.open(input_path).convert("RGBA")
        width, height = img.size
        
        # Calculate alpha projection on X-axis to find horizontal gaps
        # If background is white (no alpha), we might need to check RGB values too.
        # Let's assume transparency first, but handle white background too.
        
        x_projection = []
        for x in range(width):
            has_content = False
            for y in range(height):
                r, g, b, a = img.getpixel((x, y))
                # Check for non-transparent (or non-white) pixel
                # Heuristic: a > 10 and not fully white
                if a > 10 and (r < 250 or g < 250 or b < 250):
                    has_content = True
                    break
            x_projection.append(has_content)
            
        # Find segments
        segments = []
        in_segment = False
        start_x = 0
        
        for x, active in enumerate(x_projection):
            if active and not in_segment:
                in_segment = True
                start_x = x
            elif not active and in_segment:
                in_segment = False
                segments.append((start_x, x))
                
        if in_segment:
            segments.append((start_x, width))
            
        if not segments:
            print("No content found in image.")
            return

        # The icon should be the first segment
        icon_x_start, icon_x_end = segments[0]
        
        # Now find Y bounds for this X range
        min_y, max_y = height, 0
        found_y = False
        
        for x in range(icon_x_start, icon_x_end):
            for y in range(height):
                r, g, b, a = img.getpixel((x, y))
                if a > 10 and (r < 250 or g < 250 or b < 250):
                    if y < min_y: min_y = y
                    if y > max_y: max_y = y
                    found_y = True
        
        if not found_y:
            print("Could not determine vertical bounds.")
            return
            
        # Add a little padding
        padding = 2
        crop_box = (
            max(0, icon_x_start - padding),
            max(0, min_y - padding),
            min(width, icon_x_end + padding),
            min(height, max_y + padding + 1)
        )
        
        cropped_img = img.crop(crop_box)
        cropped_img.save(output_path)
        print(f"Successfully cropped icon to {output_path}. Size: {cropped_img.size}")
        
    except Exception as e:
        print(f"Error processing image: {e}")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python crop_logo.py <input> <output>")
        sys.exit(1)
    crop_icon(sys.argv[1], sys.argv[2])
