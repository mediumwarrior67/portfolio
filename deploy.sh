#!/bin/bash
# Deploy script for GitHub Pages

echo "🚀 Building portfolio..."
npm run build

if [ -d "dist" ]; then
    echo "✅ Build successful!"
    echo "📤 Deploying to GitHub Pages..."
    npm run deploy
    echo "✨ Deployment complete!"
    echo "📍 Visit: https://mediumwarrior67.github.io/portfolio/"
    echo "⏳ Wait 2-3 minutes for GitHub to update the site"
else
    echo "❌ Build failed - dist folder not found"
    exit 1
fi
