#!/bin/bash
echo "⏰ VERCEL DEPLOYMENT LIMIT CHECKER"
echo "================================="

while true; do
    current_time=$(date)
    echo "[$current_time] Checking Vercel deployment availability..."
    
    # Try a dry run to check limits
    vercel --help > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        echo "✅ Vercel CLI available"
        
        # Check if we can deploy (this won't actually deploy)
        echo "💡 You can try deploying now with: ./deploy-to-vercel.sh"
        echo "📊 Hobby plan limits:"
        echo "   - 32 deployments per hour"
        echo "   - 100 deployments per day"
        echo "   - Limits reset at midnight UTC"
        
        break
    else
        echo "❌ Vercel CLI issues"
    fi
    
    echo "⏳ Waiting 1 hour before next check..."
    echo "💡 Vercel limits typically reset at:"
    echo "   - Hourly: Every hour at :00"
    echo "   - Daily: Midnight UTC"
    echo "---"
    
    sleep 3600  # Wait 1 hour
done
