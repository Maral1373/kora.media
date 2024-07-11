#!/bin/bash

# Define extensions
CSS_EXT="css"
JS_EXT="js"

# Function to process a single file
process_file() {
  filename="$1"
  file_ext="${filename##*.}"
  
  echo "Processing file: $filename"
  
  if [[ "$file_ext" == "$CSS_EXT" ]]; then
    # Process CSS file
    purgecss --input "$filename" --output "$filename" --content "**/*.html"
    cssnano "$filename" -o "$filename"
  elif [[ "$file_ext" == "$JS_EXT" ]]; then
    # Process JS file
    terser "$filename" -c -m > "$filename.min"
    mv "$filename.min" "$filename"  # Replace original with minified
  fi
}

# Export the function so it's available to subshells
export -f process_file

# Recursively process files
find . -type f \( -iname "*.$CSS_EXT" -o -iname "*.$JS_EXT" \) -exec bash -c 'process_file "{}"' \;

echo "Minified and cleaned CSS files processed in-place."
echo "Minified JS files replaced with originals."
