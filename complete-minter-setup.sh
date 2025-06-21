#!/bin/bash
echo "🔧 COMPLETE MINTER ROLE SETUP PROCESS"
echo "===================================="

echo "Step 1: Check current minter role status..."
node grant-minter-role.js

echo ""
echo "Step 2: Set up contract owner environment..."
echo "⚠️ You need the private key of the contract owner to proceed"
echo ""
read -p "Do you have the contract owner private key? (y/N): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Setting up environment..."
    ./setup-contract-owner-env.sh
    
    echo ""
    echo "Step 3: Execute minter role grant..."
    node execute-minter-grant.js
    
    echo ""
    echo "Step 4: Verify minter role was granted..."
    node verify-minter-role.js
    
    echo ""
    echo "✅ Minter role setup complete!"
else
    echo ""
    echo "❌ Cannot proceed without contract owner private key"
    echo ""
    echo "🔧 ALTERNATIVE OPTIONS:"
    echo "1. Contact the contract deployer for the private key"
    echo "2. Use a multisig wallet if the contract uses one"
    echo "3. Use a hardware wallet connected to the owner address"
    echo "4. Use the contract owner's wallet interface (MetaMask, etc.)"
    echo ""
    echo "📋 MANUAL STEPS:"
    echo "1. Connect to your contract owner wallet"
    echo "2. Go to the contract on Arbiscan: https://arbiscan.io/address/0xE8A9c6fFE6b2344147D886EcB8608C5F7863B20D"
    echo "3. Use the 'Write Contract' tab"
    echo "4. Call grantRole with:"
    echo "   - role: 0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6"
    echo "   - account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
fi
