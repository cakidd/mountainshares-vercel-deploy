#!/bin/bash

echo "🚀 MountainShares Compliance Framework - Complete Deployment"
echo "============================================================"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Compile contracts
echo "🔧 Compiling contracts..."
npx hardhat compile

# Start local node in background
echo "🌐 Starting local Hardhat node..."
npx hardhat node > /dev/null 2>&1 &
NODE_PID=$!

# Wait for node to start
echo "⏳ Waiting for node to start..."
sleep 5

# Deploy contract
echo "🚀 Deploying contract to local network..."
npx hardhat run scripts/deploy-mountainshares-compliance.js --network localhost

echo ""
echo "✅ Deployment complete!"
echo "📝 Local node running (PID: $NODE_PID)"
echo "🛑 To stop local node: kill $NODE_PID"
echo "============================================================"
