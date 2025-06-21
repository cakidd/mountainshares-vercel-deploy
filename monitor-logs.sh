#!/bin/bash
echo "🔍 MONITORING MOUNTAINSHARES LOGS"
echo "================================="
echo "Watching for Arbitrum integration events..."
echo ""

# Monitor the server logs for Arbitrum-specific events
tail -f server.log | grep --line-buffered -E "(PAYMENT SUCCESS|Arbitrum|Contract|MountainShares|Ready for minting)" --color=always
