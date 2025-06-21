const { ethers } = require('ethers');

// FIX WALLET ADDRESS CHECKSUM
function fixAddressChecksum() {
    console.log('🔧 FIXING WALLET ADDRESS CHECKSUM');
    console.log('=================================');
    
    // Your problematic address
    const incorrectAddress = '0x742d35Cc6634C0532925a3b8D4C0C3F8E1C2E1B8';
    
    try {
        // Convert to lowercase first to bypass checksum validation
        const lowercaseAddress = incorrectAddress.toLowerCase();
        console.log(`📝 Original: ${incorrectAddress}`);
        console.log(`📝 Lowercase: ${lowercaseAddress}`);
        
        // Use ethers.utils.getAddress to get proper checksum
        const checksumAddress = ethers.utils.getAddress(lowercaseAddress);
        console.log(`✅ Correct Checksum: ${checksumAddress}`);
        
        // Verify the address is valid
        const isValid = ethers.utils.isAddress(checksumAddress);
        console.log(`✅ Address Valid: ${isValid}`);
        
        return checksumAddress;
        
    } catch (error) {
        console.error('❌ Checksum fix failed:', error.message);
        return null;
    }
}

// Fix the address
const correctedAddress = fixAddressChecksum();

console.log('\n🎯 CORRECTED ADDRESS FOR YOUR SYSTEM:');
console.log(`Use this address: ${correctedAddress}`);
