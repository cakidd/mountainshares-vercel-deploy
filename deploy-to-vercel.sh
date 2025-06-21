#!/bin/bash
echo "🚀 DEPLOYING MOUNTAINSHARES TO VERCEL"
echo "====================================="

# Check if we can deploy
echo "📊 Checking Vercel deployment status..."
vercel --version || { echo "❌ Vercel CLI not installed"; exit 1; }

# Verify we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Not in the correct project directory"
    exit 1
fi

echo "✅ Ready to deploy from $(pwd)"

# Check deployment limits (this will show current usage)
echo "📈 Current Vercel status:"
vercel teams list 2>/dev/null || echo "Using personal account"

# Pre-deployment checks
echo "🔍 Pre-deployment verification..."

# Check if all critical files exist
critical_files=("api/webhooks/stripe.js" "api/health.js" "api/create-payment-intent.js")
for file in "${critical_files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ Critical file missing: $file"
        exit 1
    fi
done

echo "✅ All critical files present"

# Check environment variables are set in Vercel
echo "🔐 Checking Vercel environment variables..."
echo "💡 Make sure you've run: ./setup-vercel-env.sh"

# Deploy to Vercel
echo "🚀 Starting deployment..."
echo "📝 This will create a new deployment - make sure you haven't hit limits"

# Deploy with production settings
vercel --prod --confirm || {
    echo "❌ Deployment failed"
    echo "💡 Possible reasons:"
    echo "   - Hit deployment limits (wait for reset)"
    echo "   - Environment variables not set"
    echo "   - Build errors"
    exit 1
}

echo "✅ Deployment completed!"
echo "🌐 Your MountainShares app should now be live on Vercel"
echo "📋 Next steps:"
echo "   1. Update Stripe webhook URL to your new Vercel domain"
echo "   2. Test the payment flow on production"
echo "   3. Update The Commons integration to use production URL"

