const { ethers } = require('ethers');

async function checkCurrentMinterStatus() {
    console.log('🔍 CHECKING CURRENT MINTER STATUS');
    console.log('================================');
    
    try {
        const provider = new ethers.providers.JsonRpcProvider('https://arb1.arbitrum.io/rpc');
        const contractAddress = '0xE8A9c6fFE6b2344147D886EcB8608C5F7863B20D';
        const yourMinterAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
        const actualAdmin = '0xdE75F516be7b287a4'; // From Arbiscan transactions
        
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
        
        // Check actual admin from Arbiscan
        console.log('\n🔍 CHECKING ACTUAL ADMIN FROM ARBISCAN:');
        const adminHasDefaultRole = await contract.hasRole(DEFAULT_ADMIN_ROLE, actualAdmin);
        console.log(`👑 ${actualAdmin} has DEFAULT_ADMIN_ROLE: ${adminHasDefaultRole ? 'YES ✅' : 'NO ❌'}`);
        
        // Check your minter address
        console.log('\n🔍 CHECKING YOUR MINTER ADDRESS:');
        const yourAddressHasMinter = await contract.hasRole(MINTER_ROLE, yourMinterAddress);
        console.log(`🏭 ${yourMinterAddress} has MINTER_ROLE: ${yourAddressHasMinter ? 'YES ✅' : 'NO ❌'}`);
        
        // Check if admin already granted minter role to someone else
        console.log('\n🔍 CHECKING IF MINTER ROLE WAS GRANTED TO OTHER ADDRESSES:');
        const addressesToCheck = [
            actualAdmin, // Maybe admin gave themselves minter role
            '0x742D35Cc6634C0532925a3b8D4C0C3F8e1C2e1B8', // Your corrected address
            '0x8ba1f109551bD432803012645Hac136c30C85bcf' // Another test address
        ];
        
        for (const addr of addressesToCheck) {
            try {
                const hasMinter = await contract.hasRole(MINTER_ROLE, addr);
                console.log(`🏭 ${addr}: ${hasMinter ? 'HAS MINTER ROLE ✅' : 'NO MINTER ROLE ❌'}`);
                
                if (hasMinter) {
                    console.log(`🎯 FOUND ACTIVE MINTER! Address: ${addr}`);
                }
            } catch (error) {
                console.log(`❌ Error checking ${addr}: ${error.message}`);
            }
        }
        
        console.log('\n📋 SUMMARY:');
        if (yourAddressHasMinter) {
            console.log('🎉 YOUR ADDRESS ALREADY HAS MINTER ROLE!');
            console.log('✅ Your MountainShares system is ready for production minting!');
        } else if (adminHasDefaultRole) {
            console.log('🔧 Admin exists but your address needs MINTER_ROLE');
            console.log(`💡 Contact the admin (${actualAdmin}) to grant you MINTER_ROLE`);
        } else {
            console.log('⚠️ Need to investigate further');
        }
        
    } catch (error) {
        console.error('❌ Failed to check minter status:', error.message);
    }
}

checkCurrentMinterStatus();
