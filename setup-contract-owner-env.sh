#!/bin/bash
echo "🔐 SETTING UP CONTRACT OWNER ENVIRONMENT"
echo "========================================"

echo "⚠️ SECURITY WARNING:"
echo "- Only run this on a secure, private machine"
echo "- Never share your private key"
echo "- Consider using a hardware wallet for production"
echo ""

read -p "Enter your contract owner private key (without 0x): " -s PRIVATE_KEY
echo ""

if [ ${#PRIVATE_KEY} -ne 64 ]; then
    echo "❌ Invalid private key length. Should be 64 characters."
    exit 1
fi

# Add 0x prefix if not present
if [[ $PRIVATE_KEY != 0x* ]]; then
    PRIVATE_KEY="0x$PRIVATE_KEY"
fi

# Export for current session
export CONTRACT_OWNER_PRIVATE_KEY="$PRIVATE_KEY"

# Add to .bashrc for persistence (optional)
echo ""
read -p "Add to .bashrc for persistence? (y/N): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "export CONTRACT_OWNER_PRIVATE_KEY=\"$PRIVATE_KEY\"" >> ~/.bashrc
    echo "✅ Added to .bashrc"
    echo "⚠️ Remember to remove this after use for security!"
fi

echo "✅ Environment variable set for current session"
echo "🚀 You can now run: node execute-minter-grant.js"
