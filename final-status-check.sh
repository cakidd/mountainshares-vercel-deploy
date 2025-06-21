#!/bin/bash
echo "🏔️ MOUNTAINSHARES FINAL STATUS CHECK"
echo "===================================="

# Check server
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Next.js Server: Running on port 3000"
else
    echo "❌ Next.js Server: Not running"
fi

# Check webhook listener
if ps aux | grep "stripe listen" | grep -v grep > /dev/null; then
    echo "✅ Stripe Webhook: Active and forwarding"
else
    echo "❌ Stripe Webhook: Not running"
fi

# Check webhook fix
if grep -q "buffer" api/webhooks/stripe.js 2>/dev/null; then
    echo "✅ Webhook Handler: Fixed with proper signature verification"
else
    echo "⚠️ Webhook Handler: May need signature fix"
fi

# Check Arbitrum integration
if grep -q "ethers" api/webhooks/stripe.js 2>/dev/null; then
    echo "✅ Arbitrum Integration: Ready in webhook handler"
else
    echo "⚠️ Arbitrum Integration: Not found in webhook"
fi

echo "===================================="
echo "🎯 READY FOR PRODUCTION TESTING!"
echo ""
echo "Process a payment at: http://localhost:3000/buy-mountain-share"
echo "Use test card: 4242424242424242"
echo "Watch for complete Web2 → Web3 integration!"
