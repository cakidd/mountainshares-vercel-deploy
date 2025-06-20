#!/bin/bash

echo "🚀 MountainShares Auto-Deploy Script"

# Add all changes
git add .

# Commit with descriptive message
if [ -z "$1" ]; then
    git commit -m "Update MountainShares: $(date '+%Y-%m-%d %H:%M:%S')"
else
    git commit -m "$1"
fi

# Push to GitHub (triggers auto-deployment)
git push origin master

echo "✅ Changes pushed to GitHub"
echo "🔄 Auto-deployment triggered via GitHub Actions"
echo "📱 Frontend: https://mountainshares-frontend-lexiuidu1-cakidds-projects.vercel.app"
echo "🔗 Backend: https://mountainshares-vercel-deploy.vercel.app"
