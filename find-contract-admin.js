const { ethers } = require('ethers');

async function findContractAdmin() {
    console.log('🔍 FINDING MOUNTAINSHARES CONTRACT ADMIN');
    console.log('======================================');
    
    try {
        const provider = new ethers.providers.JsonRpcProvider('https://arb1.arbitrum.io/rpc');
        const contractAddress = '0xE8A9c6fFE6b2344147D886EcB8608C5F7863B20D';
        
        // Get contract creation transaction
        console.log('📋 Searching for contract deployment transaction...');
        
        // Try different admin role checking methods
        const abi = [
            "function hasRole(bytes32 role, address account) view returns (bool)",
            "function DEFAULT_ADMIN_ROLE() view returns (bytes32)",
            "function MINTER_ROLE() view returns (bytes32)",
            "function getRoleAdmin(bytes32 role) view returns (bytes32)",
            "function name() view returns (string)",
            "function symbol() view returns (string)"
        ];
        
        const contract = new ethers.Contract(contractAddress, abi, provider);
        
        // Get role constants
        const DEFAULT_ADMIN_ROLE = await contract.DEFAULT_ADMIN_ROLE();
        const MINTER_ROLE = await contract.MINTER_ROLE();
        
        console.log(`🔑 DEFAULT_ADMIN_ROLE: ${DEFAULT_ADMIN_ROLE}`);
        console.log(`🔑 MINTER_ROLE: ${MINTER_ROLE}`);
        
        // Check who has admin role for MINTER_ROLE
        const minterRoleAdmin = await contract.getRoleAdmin(MINTER_ROLE);
        console.log(`👑 MINTER_ROLE Admin: ${minterRoleAdmin}`);
        
        // Common addresses to check for admin role
        const addressesToCheck = [
            '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', // Your current minter
            '0x70997970C51812dc3A010C7d01b50e0d17dc79C8', // Hardhat account 1
            '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC', // Hardhat account 2
            '0x90F79bf6EB2c4f870365E785982E1f101E93b906', // Hardhat account 3
            '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65', // Hardhat account 4
            '0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc', // Hardhat account 5
        ];
        
        console.log('\n🔍 CHECKING ADMIN PERMISSIONS:');
        for (const address of addressesToCheck) {
            try {
                const hasDefaultAdmin = await contract.hasRole(DEFAULT_ADMIN_ROLE, address);
                const hasMinterRole = await contract.hasRole(MINTER_ROLE, address);
                
                console.log(`📍 ${address}:`);
                console.log(`   Default Admin: ${hasDefaultAdmin ? '✅ YES' : '❌ NO'}`);
                console.log(`   Minter Role: ${hasMinterRole ? '✅ YES' : '❌ NO'}`);
                
                if (hasDefaultAdmin) {
                    console.log(`🎯 FOUND ADMIN! Use this address: ${address}`);
                }
            } catch (error) {
                console.log(`❌ Error checking ${address}: ${error.message}`);
            }
        }
        
        console.log('\n📋 NEXT STEPS:');
        console.log('1. Find the address that has DEFAULT_ADMIN_ROLE');
        console.log('2. Use that address to grant MINTER_ROLE');
        console.log('3. Or check your contract deployment logs for the deployer address');
        
    } catch (error) {
        console.error('❌ Failed to find contract admin:', error.message);
    }
}

findContractAdmin();
