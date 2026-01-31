from PIL import Image
import sys
import os

def remove_white_background(input_path, output_path, tolerance=200):
    print(f"Processing {input_path}...")
    try:
        img = Image.open(input_path)
        img = img.convert("RGBA")
        datas = img.getdata()
        
        newData = []
        for item in datas:
            # Check if pixel is white-ish
            if item[0] > tolerance and item[1] > tolerance and item[2] > tolerance:
                newData.append((255, 255, 255, 0))  # Transparent
            else:
                newData.append(item)
        
        img.putdata(newData)
        img.save(output_path, "PNG")
        print(f"Saved to {output_path}")
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python remove_bg.py <input> <output>")
    else:
        remove_white_background(sys.argv[1], sys.argv[2])
