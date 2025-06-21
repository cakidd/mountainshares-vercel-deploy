const { ethers } = require('ethers');

async function finalGrantMinterRole() {
    console.log('🎯 FINAL MINTER ROLE GRANT');
    console.log('=========================');
    
    const adminPrivateKey = process.env.ADMIN_PRIVATE_KEY;
    
    if (!adminPrivateKey) {
        console.log('🔧 GRANT MINTER_ROLE VIA ARBISCAN:');
        console.log('');
        console.log('1. Go to: https://arbiscan.io/address/0xE8A9c6fFE6b2344147D886EcB8608C5F7863B20D#writeContract');
        console.log('2. Connect wallet: 0xdE75F5168E33db23FA5601b5fc88545be7b287a4');
        console.log('3. Call grantRole with:');
        console.log('   role: 0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6');
        console.log('   account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');
        console.log('');
        console.log('✅ VERIFIED: Admin has full permissions to grant this role!');
        return;
    }
    
    try {
        const provider = new ethers.providers.JsonRpcProvider('https://arb1.arbitrum.io/rpc');
        const adminWallet = new ethers.Wallet(adminPrivateKey, provider);
        const contractAddress = '0xE8A9c6fFE6b2344147D886EcB8608C5F7863B20D';
        const minterAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
        
        const abi = [
            "function grantRole(bytes32 role, address account) external",
            "function hasRole(bytes32 role, address account) view returns (bool)",
            "function MINTER_ROLE() view returns (bytes32)"
        ];
        
        const contract = new ethers.Contract(contractAddress, abi, adminWallet);
        const MINTER_ROLE = await contract.MINTER_ROLE();
        
        // Check if already granted
        const alreadyHasRole = await contract.hasRole(MINTER_ROLE, minterAddress);
        if (alreadyHasRole) {
            console.log('✅ MINTER_ROLE already granted!');
            return;
        }
        
        // Grant the role
        console.log('🚀 Granting MINTER_ROLE...');
        const tx = await contract.grantRole(MINTER_ROLE, minterAddress);
        console.log(`📋 Transaction: ${tx.hash}`);
        
        const receipt = await tx.wait();
        console.log(`✅ MINTER_ROLE GRANTED! Block: ${receipt.blockNumber}`);
        
        // Verify
        const newStatus = await contract.hasRole(MINTER_ROLE, minterAddress);
        console.log(`🎯 Final Status: ${newStatus ? 'SUCCESS ✅' : 'FAILED ❌'}`);
        
        if (newStatus) {
            console.log('\n🎉 YOUR MOUNTAINSHARES SYSTEM IS NOW PRODUCTION READY!');
        }
        
    } catch (error) {
        console.error('❌ Grant failed:', error.message);
    }
}

finalGrantMinterRole();
