const { ethers } = require('ethers');

async function findContractDeployer() {
    console.log('🔍 FINDING MOUNTAINSHARES CONTRACT DEPLOYER');
    console.log('==========================================');
    
    try {
        const provider = new ethers.providers.JsonRpcProvider('https://arb1.arbitrum.io/rpc');
        const contractAddress = '0xE8A9c6fFE6b2344147D886EcB8608C5F7863B20D';
        
        console.log(`📍 Contract: ${contractAddress}`);
        console.log('🔍 Searching for deployment transaction...');
        
        // Get contract creation code
        const code = await provider.getCode(contractAddress);
        console.log(`✅ Contract exists (code length: ${code.length} bytes)`);
        
        // Try to find deployment transaction by scanning recent blocks
        // Note: This is a simplified approach - in production, use Arbiscan API
        console.log('📋 MANUAL STEPS TO FIND DEPLOYER:');
        console.log('');
        console.log('1. Visit Arbiscan:');
        console.log(`   https://arbiscan.io/address/${contractAddress}`);
        console.log('');
        console.log('2. Look for "Contract Creation" transaction');
        console.log('3. The "From" address is your contract deployer');
        console.log('4. That address should have admin rights');
        console.log('');
        
        // Check if the deployer has admin rights
        const abi = [
            "function hasRole(bytes32 role, address account) view returns (bool)",
            "function DEFAULT_ADMIN_ROLE() view returns (bytes32)"
        ];
        
        const contract = new ethers.Contract(contractAddress, abi, provider);
        const DEFAULT_ADMIN_ROLE = await contract.DEFAULT_ADMIN_ROLE();
        
        // Common deployer addresses to check (based on your Hardhat setup)
        const potentialDeployers = [
            '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', // Hardhat account 0
            '0x70997970C51812dc3A010C7d01b50e0d17dc79C8', // Hardhat account 1
            '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC', // Hardhat account 2
            '0x8ba1f109551bD432803012645Hac136c30C85bcf', // Your test address
            '0x742D35Cc6634C0532925a3b8D4C0C3F8e1C2e1B8'  // Your corrected address
        ];
        
        console.log('🔍 CHECKING POTENTIAL DEPLOYER ADDRESSES:');
        for (const address of potentialDeployers) {
            try {
                const hasAdmin = await contract.hasRole(DEFAULT_ADMIN_ROLE, address);
                console.log(`📍 ${address}: ${hasAdmin ? '✅ HAS ADMIN' : '❌ NO ADMIN'}`);
                
                if (hasAdmin) {
                    console.log(`🎯 FOUND ADMIN! Use this address: ${address}`);
                    return address;
                }
            } catch (error) {
                console.log(`❌ Error checking ${address}: ${error.message}`);
            }
        }
        
        console.log('');
        console.log('❌ NO ADMIN FOUND IN COMMON ADDRESSES');
        console.log('');
        console.log('🔧 SOLUTIONS:');
        console.log('1. Check Arbiscan for the actual deployer address');
        console.log('2. Check your deployment logs/scripts');
        console.log('3. If you have the deployer private key, use it directly');
        console.log('4. Consider redeploying the contract with proper admin setup');
        
        return null;
        
    } catch (error) {
        console.error('❌ Failed to find contract deployer:', error.message);
        return null;
    }
}

findContractDeployer();
