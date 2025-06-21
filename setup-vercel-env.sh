#!/bin/bash
echo "🔐 SETTING UP VERCEL ENVIRONMENT VARIABLES"
echo "=========================================="

# Read from local .env.local file
if [ -f ".env.local" ]; then
    echo "📁 Found .env.local file"
    
    # Extract environment variables
    STRIPE_SECRET_KEY=$(grep "STRIPE_SECRET_KEY" .env.local | cut -d '=' -f2)
    STRIPE_PUBLISHABLE_KEY=$(grep "STRIPE_PUBLISHABLE_KEY" .env.local | cut -d '=' -f2)
    STRIPE_WEBHOOK_SECRET=$(grep "STRIPE_WEBHOOK_SECRET" .env.local | cut -d '=' -f2)
    
    echo "🔑 Environment variables extracted from .env.local"
    echo "📋 Ready to set in Vercel (run these commands when deploying):"
    echo ""
    echo "vercel env add STRIPE_SECRET_KEY production"
    echo "vercel env add STRIPE_PUBLISHABLE_KEY production"
    echo "vercel env add STRIPE_WEBHOOK_SECRET production"
    echo ""
    echo "💡 You'll be prompted to enter the values when running these commands"
    
else
    echo "❌ .env.local file not found"
    echo "Create .env.local with your Stripe keys before deployment"
fi

echo "=========================================="
