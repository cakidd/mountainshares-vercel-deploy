const { ethers } = require('ethers');

async function checkDeployerAdminRights() {
    console.log('🔍 CHECKING DEPLOYER ADMIN RIGHTS ON CURRENT CONTRACT');
    console.log('===================================================');
    
    try {
        const provider = new ethers.providers.JsonRpcProvider('https://arb1.arbitrum.io/rpc');
        const currentContract = '0xE8A9c6fFE6b2344147D886EcB8608C5F7863B20D';
        
        // Get deployer addresses from the deployment transactions
        const deploymentTxs = [
            '0xd536271722f7d7eb715a5074cd8f343d8a2ce445d3ef63f4db52d877ccb82c1c',
            '0x57f26830639334a68f4be6328aa0bebb707d3a91dfc2ccffa976a210b0bcb509'
        ];
        
        console.log(`📍 Checking admin rights on: ${currentContract}`);
        
        const abi = [
            "function hasRole(bytes32 role, address account) view returns (bool)",
            "function DEFAULT_ADMIN_ROLE() view returns (bytes32)",
            "function MINTER_ROLE() view returns (bytes32)"
        ];
        
        const contract = new ethers.Contract(currentContract, abi, provider);
        const DEFAULT_ADMIN_ROLE = await contract.DEFAULT_ADMIN_ROLE();
        const MINTER_ROLE = await contract.MINTER_ROLE();
        
        console.log(`🔑 DEFAULT_ADMIN_ROLE: ${DEFAULT_ADMIN_ROLE}`);
        console.log(`🔑 MINTER_ROLE: ${MINTER_ROLE}`);
        
        // Check each deployment transaction's deployer
        for (let i = 0; i < deploymentTxs.length; i++) {
            try {
                const tx = await provider.getTransaction(deploymentTxs[i]);
                const deployerAddress = tx.from;
                
                console.log(`\n👤 DEPLOYER ${i + 1}: ${deployerAddress}`);
                
                // Check admin rights
                const hasDefaultAdmin = await contract.hasRole(DEFAULT_ADMIN_ROLE, deployerAddress);
                const hasMinterRole = await contract.hasRole(MINTER_ROLE, deployerAddress);
                
                console.log(`   Has DEFAULT_ADMIN_ROLE: ${hasDefaultAdmin ? '✅ YES' : '❌ NO'}`);
                console.log(`   Has MINTER_ROLE: ${hasMinterRole ? '✅ YES' : '❌ NO'}`);
                
                if (hasDefaultAdmin) {
                    console.log(`🎯 FOUND ADMIN! Deployer ${deployerAddress} has admin rights!`);
                    console.log(`💡 You can use this address to grant MINTER_ROLE`);
                }
                
            } catch (error) {
                console.log(`❌ Error checking deployer ${i + 1}: ${error.message}`);
            }
        }
        
        // Also check your known admin
        const knownAdmin = '0xdE75F5168E33db23FA5601b5fc88545be7b287a4';
        console.log(`\n👑 KNOWN ADMIN: ${knownAdmin}`);
        const knownAdminHasRole = await contract.hasRole(DEFAULT_ADMIN_ROLE, knownAdmin);
        console.log(`   Has DEFAULT_ADMIN_ROLE: ${knownAdminHasRole ? '✅ YES' : '❌ NO'}`);
        
    } catch (error) {
        console.error('❌ Failed to check deployer admin rights:', error.message);
    }
}

checkDeployerAdminRights();
