from PIL import Image
import sys

def crop_to_text(input_path, output_path):
    try:
        img = Image.open(input_path)
        img = img.convert("RGBA")
        width, height = img.size
        pixels = img.load()

        # 1. Find the horizontal activity (columns with non-transparent pixels)
        col_has_content = []
        for x in range(width):
            has_content = False
            for y in range(height):
                if pixels[x, y][3] > 0: # Check alpha
                    has_content = True
                    break
            col_has_content.append(has_content)

        # 2. Identify the Gap
        # We expect: [Content - Icon] ... [Gap] ... [Content - Text]
        # Let's find the start of the second content block.
        
        # Find end of first block
        first_block_end = 0
        in_block = False
        for x in range(width):
            if col_has_content[x]:
                in_block = True
            elif in_block and not col_has_content[x]:
                first_block_end = x
                break
        
        # Find start of second block
        second_block_start = 0
        for x in range(first_block_end, width):
            if col_has_content[x]:
                second_block_start = x
                break
                
        if second_block_start == 0:
            print("Could not detect two distinct blocks (Icon and Text). Splitting at 30% width as fallback.")
            second_block_start = int(width * 0.35)

        print(f"Cropping starting at x={second_block_start}")

        # 3. Crop just the text part
        # We also want to trim the right/top/bottom empty space for a clean fit
        
        # Find right bound
        right_bound = width
        for x in range(width - 1, second_block_start, -1):
            if col_has_content[x]:
                right_bound = x + 1
                break
                
        # Find top/bottom bounds for the text part
        top_bound = 0
        bottom_bound = height
        
        # Scan y for the text columns only
        row_has_content = []
        for y in range(height):
            has_content = False
            for x in range(second_block_start, right_bound):
                if pixels[x, y][3] > 0:
                    has_content = True
                    break
            row_has_content.append(has_content)
            
        for y in range(height):
            if row_has_content[y]:
                top_bound = y
                break
                
        for y in range(height - 1, -1, -1):
            if row_has_content[y]:
                bottom_bound = y + 1
                break

        print(f"Crop box: {second_block_start}, {top_bound}, {right_bound}, {bottom_bound}")
        
        text_img = img.crop((second_block_start, top_bound, right_bound, bottom_bound))
        text_img.save(output_path, "PNG")
        print(f"Saved text-only logo to {output_path}")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    crop_to_text("public/full-logo-transparent.png", "public/text-logo-transparent.png")
