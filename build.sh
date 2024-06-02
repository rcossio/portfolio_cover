#!/bin/bash

# Define source and destination directories
SRC_SCSS="./scss"
SRC_CSS="./css"
DIST_CSS="./dist/css"

SRC_JS="./js"
DIST_JS="./dist/js"

SRC_HTML="./"
DIST_HTML="./dist"

SRC_IMAGES="./img"
DIST_IMAGES="./dist/img"

# Create destination directories
rm -rf $DIST_HTML
mkdir -p $DIST_HTML 
mkdir -p $DIST_CSS $DIST_JS $DIST_IMAGES

# Compile SCSS to CSS
for file in $SRC_SCSS/*.scss; do
    node-sass $file > $SRC_CSS/$(basename ${file%.*}.css)
done

# Minify CSS files
for file in $SRC_CSS/*.css; do
    csso $file --output $DIST_CSS/$(basename $file)
done

# Minify JavaScript files
for file in $SRC_JS/*.js; do
    terser $file --compress --mangle --output $DIST_JS/$(basename $file)
done

# Minify HTML files
for file in $SRC_HTML/*.html; do
    html-minifier-terser --collapse-whitespace --remove-comments --remove-redundant-attributes --remove-script-type-attributes --remove-style-link-type-attributes --use-short-doctype $file -o $DIST_HTML/$(basename $file)
done

# Minify and convert images to WebP format
for file in $SRC_IMAGES/*; do
  # if svg just copy it
  if [[ $file == *".svg" ]]; then
    cp $file $DIST_IMAGES/$(basename $file)
    continue
  fi

  # Resize images if needed (optional, comment out if not needed)
  convert $file -resize 400x400 $DIST_IMAGES/resized_$(basename $file)

  # Minify original images
  imagemin $DIST_IMAGES/resized_$(basename $file) --plugin=mozjpeg --plugin=pngquant > $DIST_IMAGES/minified_$(basename $file)
  
  # Convert to WebP
  cwebp $DIST_IMAGES/minified_$(basename $file) -o $DIST_IMAGES/$(basename ${file%.*}.webp) > /dev/null 2>&1
  rm $DIST_IMAGES/minified_$(basename $file) $DIST_IMAGES/resized_$(basename $file)
done

echo "Build completed successfully!"