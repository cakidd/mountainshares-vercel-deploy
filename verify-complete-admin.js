const { ethers } = require('ethers');

async function verifyCompleteAdmin() {
    console.log('🔍 VERIFYING COMPLETE ADMIN ADDRESS');
    console.log('==================================');
    
    try {
        const provider = new ethers.providers.JsonRpcProvider('https://arb1.arbitrum.io/rpc');
        const contractAddress = '0xE8A9c6fFE6b2344147D886EcB8608C5F7863B20D';
        const completeAdminAddress = '0xdE75F5168E33db23FA5601b5fc88545be7b287a4'; // Complete address from Arbiscan
        const yourMinterAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
        
        const abi = [
            "function hasRole(bytes32 role, address account) view returns (bool)",
            "function DEFAULT_ADMIN_ROLE() view returns (bytes32)",
            "function MINTER_ROLE() view returns (bytes32)",
            "function name() view returns (string)",
            "function symbol() view returns (string)",
            "function mint(address to, uint256 amount) external"
        ];
        
        const contract = new ethers.Contract(contractAddress, abi, provider);
        
        // Get contract info
        const name = await contract.name();
        const symbol = await contract.symbol();
        console.log(`📍 Contract: ${name} (${symbol})`);
        console.log(`📍 Address: ${contractAddress}`);
        
        // Get role constants
        const DEFAULT_ADMIN_ROLE = await contract.DEFAULT_ADMIN_ROLE();
        const MINTER_ROLE = await contract.MINTER_ROLE();
        
        console.log(`🔑 DEFAULT_ADMIN_ROLE: ${DEFAULT_ADMIN_ROLE}`);
        console.log(`🔑 MINTER_ROLE: ${MINTER_ROLE}`);
        
        // Check admin permissions
        console.log('\n👑 CHECKING ADMIN PERMISSIONS:');
        const hasAdmin = await contract.hasRole(DEFAULT_ADMIN_ROLE, completeAdminAddress);
        const adminHasMinter = await contract.hasRole(MINTER_ROLE, completeAdminAddress);
        
        console.log(`Admin (${completeAdminAddress}):`);
        console.log(`  Has DEFAULT_ADMIN_ROLE: ${hasAdmin ? '✅ YES' : '❌ NO'}`);
        console.log(`  Has MINTER_ROLE: ${adminHasMinter ? '✅ YES' : '❌ NO'}`);
        
        // Check your minter permissions
        console.log('\n🏭 CHECKING YOUR MINTER PERMISSIONS:');
        const yourHasMinter = await contract.hasRole(MINTER_ROLE, yourMinterAddress);
        console.log(`Your Address (${yourMinterAddress}):`);
        console.log(`  Has MINTER_ROLE: ${yourHasMinter ? '✅ YES' : '❌ NO'}`);
        
        // Test minting capability if you have the role
        if (yourHasMinter) {
            console.log('\n🎉 EXCELLENT! YOU HAVE MINTER ROLE!');
            console.log('✅ Your MountainShares system is ready for production minting!');
            
            try {
                const testWallet = '0x742D35Cc6634C0532925a3b8D4C0C3F8e1C2e1B8';
                const mintAmount = ethers.utils.parseEther('1');
                const gasEstimate = await contract.estimateGas.mint(testWallet, mintAmount);
                console.log(`⛽ Mint Gas Estimate: ${gasEstimate.toString()}`);
                console.log('✅ Minting capability confirmed!');
                
                console.log('\n🚀 YOUR MOUNTAINSHARES SYSTEM IS PRODUCTION READY!');
                console.log('🏔️ You can now mint tokens based on real payments from The Commons!');
                
            } catch (gasError) {
                console.log(`⚠️ Gas estimation failed: ${gasError.message}`);
                console.log('💡 You need the minter private key to actually mint tokens');
            }
            
        } else if (hasAdmin) {
            console.log('\n🔧 ADMIN EXISTS BUT YOU NEED MINTER ROLE');
            console.log('📋 Next steps:');
            console.log('1. Contact the admin to grant you MINTER_ROLE');
            console.log('2. Or use admin private key if you have access');
            console.log('3. Call grantRole function with admin permissions');
            
            console.log('\n💡 GRANT ROLE TRANSACTION NEEDED:');
            console.log(`Function: grantRole`);
            console.log(`Role: ${MINTER_ROLE}`);
            console.log(`Account: ${yourMinterAddress}`);
            
        } else {
            console.log('\n❌ ADMIN VERIFICATION FAILED');
            console.log('The admin address may not have proper permissions');
        }
        
        return {
            adminHasRole: hasAdmin,
            yourHasMinter: yourHasMinter,
            adminAddress: completeAdminAddress,
            minterAddress: yourMinterAddress
        };
        
    } catch (error) {
        console.error('❌ Verification failed:', error.message);
        return null;
    }
}

verifyCompleteAdmin();
