#!/bin/bash

echo "🔍 Verifying MountainShares Compliance Framework Installation"
echo "============================================================"

# Check if all files exist
echo "📁 Checking file structure..."
files=(
    "package.json"
    "hardhat.config.js"
    "contracts/MountainSharesComplianceFramework.sol"
    "scripts/deploy-mountainshares-compliance.js"
    "test/MountainSharesCompliance.test.js"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "   ✅ $file"
    else
        echo "   ❌ $file (missing)"
    fi
done

# Check if node_modules exists
if [ -d "node_modules" ]; then
    echo "   ✅ node_modules (dependencies installed)"
else
    echo "   ❌ node_modules (run: npm install)"
fi

# Try to compile
echo ""
echo "🔧 Testing compilation..."
if npx hardhat compile > /dev/null 2>&1; then
    echo "   ✅ Compilation successful"
else
    echo "   ❌ Compilation failed"
fi

echo ""
echo "🎯 Installation verification complete!"
echo "============================================================"
