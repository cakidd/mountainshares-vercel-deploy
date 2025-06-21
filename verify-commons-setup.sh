#!/bin/bash
echo "🏛️ THE COMMONS + MOUNTAINSHARES INTEGRATION STATUS"
echo "================================================="

# Check The Commons website
if curl -s http://localhost:8080 > /dev/null; then
    echo "✅ The Commons Website: http://localhost:8080"
else
    echo "❌ The Commons Website: Not running"
fi

# Check MountainShares backend
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ MountainShares Backend: http://localhost:3000"
else
    echo "❌ MountainShares Backend: Not running"
fi

# Check health endpoint with proper Commons integration detection
if curl -s http://localhost:3000/api/health | grep -q "commonsIntegration.*true"; then
    echo "✅ Commons Integration: Enabled in backend"
else
    echo "❌ Commons Integration: Not detected in health endpoint"
fi

# Check webhook handler
if grep -q "THE COMMONS COMMUNITY PURCHASE" api/webhooks/stripe.js; then
    echo "✅ Webhook Handler: Commons detection enabled"
else
    echo "❌ Webhook Handler: Commons detection missing"
fi

# Check if The Commons directory exists
if [ -d "commons-integration" ]; then
    echo "✅ Commons Directory: Created"
else
    echo "❌ Commons Directory: Missing"
fi

# Test actual health endpoint response
echo ""
echo "🔍 HEALTH ENDPOINT TEST:"
if curl -s http://localhost:3000/api/health | jq '.mountainshares.commonsIntegration' 2>/dev/null | grep -q "true"; then
    echo "✅ Health endpoint returns Commons integration: true"
else
    echo "❌ Health endpoint missing Commons integration flag"
fi

echo "================================================="
echo "🎯 INTEGRATION STATUS SUMMARY"
echo ""
echo "📋 TO COMPLETE SETUP:"
echo "1. Both servers should be running (ports 3000 and 8080)"
echo "2. Visit: http://localhost:8080"
echo "3. Test backend connection in The Commons interface"
echo "4. Enter wallet address and test purchase"
echo "5. Watch for 'THE COMMONS COMMUNITY PURCHASE' in logs"
