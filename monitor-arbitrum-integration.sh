#!/bin/bash
echo "🔍 MONITORING ARBITRUM INTEGRATION"
echo "================================="
echo "Processing a payment now will trigger:"
echo "✅ Payment Success"
echo "✅ Arbitrum Contract Connection"
echo "✅ MountainShares Token Data Reading"
echo "✅ Token Amount Calculation"
echo ""
echo "Watching logs..."
echo ""

# Monitor for Arbitrum-specific events
tail -f server.log | grep --line-buffered -E "(PAYMENT SUCCESS|Arbitrum|Contract|MountainShares|Ready for minting|0xE8A9c6fFE6b2344147D886EcB8608C5F7863B20D)" --color=always
