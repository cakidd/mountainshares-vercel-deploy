#!/bin/bash
echo "🏛️ MONITORING THE COMMONS + MOUNTAINSHARES INTEGRATION"
echo "====================================================="
echo ""

while true; do
    echo "$(date): Checking system status..."
    
    # Check The Commons website
    if curl -s http://localhost:8080 > /dev/null; then
        echo "✅ The Commons: Running on port 8080"
    else
        echo "❌ The Commons: Not responding"
    fi
    
    # Check MountainShares backend
    if curl -s http://localhost:3000 > /dev/null; then
        echo "✅ MountainShares: Running on port 3000"
    else
        echo "❌ MountainShares: Not responding"
    fi
    
    # Check for Commons purchases in logs
    if grep -q "THE COMMONS COMMUNITY PURCHASE" ~/mountainshares-vercel-deploy/server.log; then
        echo "🏛️ Commons purchases detected in logs!"
    fi
    
    echo "---"
    sleep 30
done
