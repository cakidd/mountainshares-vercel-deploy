const { ethers } = require('ethers');

async function grantMinterRole() {
    console.log('🔑 GRANTING MINTER ROLE TO MOUNTAINSHARES CONTRACT');
    console.log('================================================');
    
    try {
        // Connect to Arbitrum One
        const provider = new ethers.providers.JsonRpcProvider('https://arb1.arbitrum.io/rpc');
        const contractAddress = '0xE8A9c6fFE6b2344147D886EcB8608C5F7863B20D';
        const minterAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
        
        // Contract ABI with role management functions
        const abi = [
            "function hasRole(bytes32 role, address account) view returns (bool)",
            "function grantRole(bytes32 role, address account) external",
            "function MINTER_ROLE() view returns (bytes32)",
            "function DEFAULT_ADMIN_ROLE() view returns (bytes32)",
            "function owner() view returns (address)",
            "function name() view returns (string)",
            "function symbol() view returns (string)"
        ];
        
        const contract = new ethers.Contract(contractAddress, abi, provider);
        
        // 1. Verify contract connection
        const name = await contract.name();
        const symbol = await contract.symbol();
        console.log(`✅ Connected to: ${name} (${symbol})`);
        console.log(`📍 Contract: ${contractAddress}`);
        console.log(`🎯 Minter Address: ${minterAddress}`);
        
        // 2. Get role constants
        const MINTER_ROLE = await contract.MINTER_ROLE();
        const DEFAULT_ADMIN_ROLE = await contract.DEFAULT_ADMIN_ROLE();
        console.log(`🔑 MINTER_ROLE: ${MINTER_ROLE}`);
        console.log(`👑 DEFAULT_ADMIN_ROLE: ${DEFAULT_ADMIN_ROLE}`);
        
        // 3. Check current minter role status
        const hasMinterRole = await contract.hasRole(MINTER_ROLE, minterAddress);
        console.log(`📊 Current Minter Role Status: ${hasMinterRole ? 'GRANTED ✅' : 'NOT GRANTED ❌'}`);
        
        if (hasMinterRole) {
            console.log(`✅ Minter role already granted to ${minterAddress}`);
            return {
                success: true,
                alreadyGranted: true,
                minterAddress: minterAddress,
                contractAddress: contractAddress
            };
        }
        
        // 4. Check who can grant roles (contract owner)
        try {
            const owner = await contract.owner();
            console.log(`👑 Contract Owner: ${owner}`);
        } catch (error) {
            console.log(`⚠️ Could not determine contract owner: ${error.message}`);
        }
        
        // 5. Create transaction data for granting role
        console.log(`\n🔧 TRANSACTION DATA TO GRANT MINTER ROLE:`);
        console.log(`Contract: ${contractAddress}`);
        console.log(`Function: grantRole(bytes32,address)`);
        console.log(`Role: ${MINTER_ROLE}`);
        console.log(`Address: ${minterAddress}`);
        
        // 6. Generate the transaction data
        const iface = new ethers.utils.Interface(abi);
        const txData = iface.encodeFunctionData('grantRole', [MINTER_ROLE, minterAddress]);
        console.log(`\n📋 ENCODED TRANSACTION DATA:`);
        console.log(`To: ${contractAddress}`);
        console.log(`Data: ${txData}`);
        
        // 7. Estimate gas for the transaction
        try {
            const gasEstimate = await provider.estimateGas({
                to: contractAddress,
                data: txData
            });
            console.log(`⛽ Estimated Gas: ${gasEstimate.toString()}`);
        } catch (gasError) {
            console.log(`⚠️ Gas estimation failed: ${gasError.message}`);
        }
        
        console.log(`\n🎯 NEXT STEPS TO GRANT MINTER ROLE:`);
        console.log(`1. Connect to your contract owner wallet`);
        console.log(`2. Call: grantRole("${MINTER_ROLE}", "${minterAddress}")`);
        console.log(`3. Or use the transaction data above in a wallet/script`);
        console.log(`4. Verify the role was granted successfully`);
        
        return {
            success: true,
            needsGrant: true,
            minterRole: MINTER_ROLE,
            minterAddress: minterAddress,
            contractAddress: contractAddress,
            transactionData: txData
        };
        
    } catch (error) {
        console.error('❌ Failed to check/grant minter role:', error.message);
        return {
            success: false,
            error: error.message
        };
    }
}

grantMinterRole();
