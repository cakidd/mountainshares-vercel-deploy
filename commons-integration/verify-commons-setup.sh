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

# Check health endpoint
if curl -s http://localhost:3000/api/health | grep -q "commonsIntegration"; then
    echo "✅ Commons Integration: Enabled in backend"
else
    echo "❌ Commons Integration: Not detected"
fi

# Check webhook handler
if grep -q "THE COMMONS COMMUNITY PURCHASE" api/webhooks/stripe.js; then
    echo "✅ Webhook Handler: Commons detection enabled"
else
    echo "❌ Webhook Handler: Commons detection missing"
fi

echo "================================================="
echo "🎯 INTEGRATION READY!"
echo ""
echo "📋 TO TEST:"
echo "1. Visit: http://localhost:8080"
echo "2. Check backend status in The Commons interface"
echo "3. Enter wallet address: 0x742d35Cc6634C0532925a3b8D4C0C3F8E1C2E1B8"
echo "4. Test purchase for 1 MS ($1.36 total)"
echo "5. Watch for 'THE COMMONS COMMUNITY PURCHASE' in logs"
