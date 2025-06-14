#!/bin/bash

echo "🚀 Installing MountainShares Compliance Framework..."
echo "=================================================="

# Install dependencies
echo "📦 Installing npm dependencies..."
npm install

# Compile contracts
echo "🔧 Compiling smart contracts..."
npx hardhat compile

# Check if compilation was successful
if [ $? -eq 0 ]; then
    echo "✅ Compilation successful!"
else
    echo "❌ Compilation failed!"
    exit 1
fi

# Run tests
echo "🧪 Running tests..."
npx hardhat test

if [ $? -eq 0 ]; then
    echo "✅ All tests passed!"
else
    echo "⚠️ Some tests failed, but continuing..."
fi

echo ""
echo "🎉 Installation completed successfully!"
echo "==============================================="
echo "Next steps:"
echo "1. Copy .env.example to .env and configure"
echo "2. Start local node: npx hardhat node"
echo "3. Deploy contract: npm run deploy-local"
echo "==============================================="
