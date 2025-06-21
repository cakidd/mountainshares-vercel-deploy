const { ethers } = require('ethers');

async function checkContractInteractions() {
    console.log('🔍 CHECKING MOUNTAINSHARES CONTRACT INTERACTIONS');
    console.log('===============================================');
    
    try {
        const provider = new ethers.providers.JsonRpcProvider('https://arb1.arbitrum.io/rpc');
        const contractAddress = '0xE8A9c6fFE6b2344147D886EcB8608C5F7863B20D';
        
        const abi = [
            "function hasRole(bytes32 role, address account) view returns (bool)",
            "function MINTER_ROLE() view returns (bytes32)",
            "function DEFAULT_ADMIN_ROLE() view returns (bytes32)",
            "function name() view returns (string)",
            "function symbol() view returns (string)"
        ];
        
        const contract = new ethers.Contract(contractAddress, abi, provider);
        
        // Get contract info
        const name = await contract.name();
        const symbol = await contract.symbol();
        console.log(`📍 Contract: ${name} (${symbol})`);
        
        // Get role constants
        const MINTER_ROLE = await contract.MINTER_ROLE();
        const DEFAULT_ADMIN_ROLE = await contract.DEFAULT_ADMIN_ROLE();
        
        console.log(`🔑 MINTER_ROLE: ${MINTER_ROLE}`);
        console.log(`👑 DEFAULT_ADMIN_ROLE: ${DEFAULT_ADMIN_ROLE}`);
        
        // Based on Arbiscan, check potential complete admin addresses
        const potentialAdmins = [
            // Common patterns for the truncated address 0xdE75F516be7b287a4
            '0xdE75F516be7b287a4000000000000000000000000', // Zero-padded
            '0xdE75F516be7b287a41234567890123456789012345', // Example completion
            // Check if it might be one of these common addresses
            '0xdE75F516be7b287a4f123456789012345678901234',
            '0xdE75F516be7b287a4abcdef1234567890abcdef12',
        ];
        
        console.log('\n🔍 CHECKING POTENTIAL ADMIN ADDRESSES:');
        console.log('(Note: We need the complete address from Arbiscan)');
        
        // Also check your known addresses
        const knownAddresses = [
            '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', // Your minter
            '0x742D35Cc6634C0532925a3b8D4C0C3F8e1C2e1B8', // Your corrected address
            '0x70997970C51812dc3A010C7d01b50e0d17dc79C8', // Hardhat account 1
            '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC', // Hardhat account 2
        ];
        
        console.log('\n🔍 CHECKING YOUR KNOWN ADDRESSES:');
        for (const address of knownAddresses) {
            try {
                const hasDefaultAdmin = await contract.hasRole(DEFAULT_ADMIN_ROLE, address);
                const hasMinterRole = await contract.hasRole(MINTER_ROLE, address);
                
                console.log(`📍 ${address}:`);
                console.log(`   Default Admin: ${hasDefaultAdmin ? '✅ YES' : '❌ NO'}`);
                console.log(`   Minter Role: ${hasMinterRole ? '✅ YES' : '❌ NO'}`);
                
                if (hasDefaultAdmin || hasMinterRole) {
                    console.log(`🎯 FOUND ROLE! Address: ${address}`);
                }
            } catch (error) {
                console.log(`❌ Error checking ${address}: ${error.message}`);
            }
        }
        
        console.log('\n📋 NEXT STEPS:');
        console.log('1. Get the complete admin address from Arbiscan transaction details');
        console.log('2. The truncated address 0xdE75F516be7b287a4 needs to be completed');
        console.log('3. Check the "From" field in the Grant Role transactions');
        console.log('4. Use the complete address to check roles and grant minter permissions');
        
    } catch (error) {
        console.error('❌ Failed to check contract interactions:', error.message);
    }
}

checkContractInteractions();
