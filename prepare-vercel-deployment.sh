#!/bin/bash
echo "🚀 PREPARING MOUNTAINSHARES FOR VERCEL DEPLOYMENT"
echo "================================================"

# Check current deployment count (if possible)
echo "📊 Checking Vercel status..."
vercel --version && echo "✅ Vercel CLI ready" || echo "❌ Vercel CLI not found"

# Verify all files are ready for deployment
echo "📁 Verifying deployment files..."

# Check critical files exist
files_to_check=(
    "package.json"
    "next.config.js"
    ".env.local"
    "api/webhooks/stripe.js"
    "api/health.js"
    "api/create-payment-intent.js"
    "pages/buy-mountain-share.js"
    "pages/payment-success.js"
)

all_files_exist=true
for file in "${files_to_check[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file missing"
        all_files_exist=false
    fi
done

if [ "$all_files_exist" = true ]; then
    echo "✅ All critical files ready for deployment"
else
    echo "❌ Some files missing - check before deployment"
fi

# Check environment variables
echo "🔐 Checking environment variables..."
if grep -q "STRIPE_SECRET_KEY" .env.local; then
    echo "✅ Stripe secret key configured"
else
    echo "❌ Stripe secret key missing"
fi

if grep -q "STRIPE_PUBLISHABLE_KEY" .env.local; then
    echo "✅ Stripe publishable key configured"
else
    echo "❌ Stripe publishable key missing"
fi

if grep -q "STRIPE_WEBHOOK_SECRET" .env.local; then
    echo "✅ Stripe webhook secret configured"
else
    echo "❌ Stripe webhook secret missing"
fi

echo "================================================"
echo "🎯 DEPLOYMENT READINESS STATUS"
echo "Files: $([ "$all_files_exist" = true ] && echo "✅ Ready" || echo "❌ Issues")"
echo "Environment: Check above for any missing variables"
echo "Vercel CLI: $(vercel --version > /dev/null 2>&1 && echo "✅ Ready" || echo "❌ Not installed")"
echo "================================================"
