#!/bin/bash

# Pre-push build verification script for Switchyard
# Run this before pushing to ensure Cloudflare Pages build will succeed

echo "🔨 Testing build before push..."
echo ""

# Clean up any old build
if [ -d "build" ]; then
  echo "🧹 Cleaning old build directory..."
  rm -rf build
fi

# Run build with CI=true (hides warnings that shouldn't break build)
echo "📦 Running production build..."
CI=true npm run build

# Check if build succeeded
if [ $? -ne 0 ]; then
  echo ""
  echo "❌ BUILD FAILED - Fix errors before pushing!"
  echo ""
  exit 1
fi

# Verify build output exists
if [ ! -d "build" ] || [ ! -f "build/index.html" ]; then
  echo ""
  echo "❌ Build output missing - expected build/index.html"
  echo ""
  exit 1
fi

# Check for critical files
if [ ! -f "build/static/js/main*.js" ] 2>/dev/null; then
  echo "⚠️  Warning: Main JS bundle not found in expected location"
fi

echo ""
echo "✅ Build successful - ready to push!"
echo ""
echo "Build output:"
ls -lh build/ | grep -E "(index.html|static)"
echo ""
exit 0
