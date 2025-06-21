#!/bin/bash
echo "🔍 MONITORING FIXED WEBHOOK"
echo "=========================="
echo "Watching for successful Arbitrum integration..."
echo ""

# Monitor for successful webhook processing
tail -f server.log | grep --line-buffered -E "(PAYMENT SUCCESS|Arbitrum|Contract|MountainShares|signature verification|Ready for minting)" --color=always
