const { ethers } = require('ethers');

async function executeMinterGrant() {
    console.log('🚀 EXECUTING MINTER ROLE GRANT TRANSACTION');
    console.log('=========================================');
    
    // NOTE: This requires the contract owner's private key
    // Replace with your actual contract owner private key
    const OWNER_PRIVATE_KEY = process.env.CONTRACT_OWNER_PRIVATE_KEY;
    
    if (!OWNER_PRIVATE_KEY) {
        console.log('❌ CONTRACT_OWNER_PRIVATE_KEY environment variable not set');
        console.log('');
        console.log('🔧 TO SET THE PRIVATE KEY:');
        console.log('export CONTRACT_OWNER_PRIVATE_KEY="your-private-key-here"');
        console.log('');
        console.log('⚠️ SECURITY WARNING:');
        console.log('- Only use this on a secure, private machine');
        console.log('- Never commit private keys to version control');
        console.log('- Consider using a hardware wallet for production');
        return;
    }
    
    try {
        // Connect to Arbitrum One with signer
        const provider = new ethers.providers.JsonRpcProvider('https://arb1.arbitrum.io/rpc');
        const wallet = new ethers.Wallet(OWNER_PRIVATE_KEY, provider);
        const contractAddress = '0xE8A9c6fFE6b2344147D886EcB8608C5F7863B20D';
        const minterAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
        
        console.log(`👑 Owner Address: ${wallet.address}`);
        console.log(`📍 Contract: ${contractAddress}`);
        console.log(`🎯 Minter: ${minterAddress}`);
        
        // Contract ABI
        const abi = [
            "function hasRole(bytes32 role, address account) view returns (bool)",
            "function grantRole(bytes32 role, address account) external",
            "function MINTER_ROLE() view returns (bytes32)",
            "function name() view returns (string)",
            "function symbol() view returns (string)"
        ];
        
        const contract = new ethers.Contract(contractAddress, abi, wallet);
        
        // 1. Verify contract
        const name = await contract.name();
        const symbol = await contract.symbol();
        console.log(`✅ Contract: ${name} (${symbol})`);
        
        // 2. Get MINTER_ROLE
        const MINTER_ROLE = await contract.MINTER_ROLE();
        console.log(`🔑 MINTER_ROLE: ${MINTER_ROLE}`);
        
        // 3. Check current status
        const hasMinterRole = await contract.hasRole(MINTER_ROLE, minterAddress);
        console.log(`📊 Current Status: ${hasMinterRole ? 'Already Granted ✅' : 'Needs Grant ❌'}`);
        
        if (hasMinterRole) {
            console.log(`✅ Minter role already granted!`);
            return;
        }
        
        // 4. Check owner balance for gas
        const balance = await wallet.getBalance();
        console.log(`💰 Owner ETH Balance: ${ethers.utils.formatEther(balance)} ETH`);
        
        if (balance.lt(ethers.utils.parseEther('0.001'))) {
            console.log(`❌ Insufficient ETH for gas. Need at least 0.001 ETH on Arbitrum One`);
            return;
        }
        
        // 5. Execute the grant transaction
        console.log(`\n🚀 Executing grantRole transaction...`);
        const tx = await contract.grantRole(MINTER_ROLE, minterAddress);
        console.log(`📋 Transaction Hash: ${tx.hash}`);
        console.log(`⏳ Waiting for confirmation...`);
        
        const receipt = await tx.wait();
        console.log(`✅ Transaction Confirmed!`);
        console.log(`📊 Block Number: ${receipt.blockNumber}`);
        console.log(`⛽ Gas Used: ${receipt.gasUsed.toString()}`);
        
        // 6. Verify the role was granted
        const newStatus = await contract.hasRole(MINTER_ROLE, minterAddress);
        console.log(`\n🎯 VERIFICATION:`);
        console.log(`Minter Role Granted: ${newStatus ? 'SUCCESS ✅' : 'FAILED ❌'}`);
        
        if (newStatus) {
            console.log(`\n🎉 MINTER ROLE SUCCESSFULLY GRANTED!`);
            console.log(`🏭 ${minterAddress} can now mint MountainShares tokens`);
            console.log(`🔗 Transaction: https://arbiscan.io/tx/${tx.hash}`);
        }
        
        return {
            success: newStatus,
            transactionHash: tx.hash,
            blockNumber: receipt.blockNumber,
            gasUsed: receipt.gasUsed.toString()
        };
        
    } catch (error) {
        console.error('❌ Failed to grant minter role:', error.message);
        return {
            success: false,
            error: error.message
        };
    }
}

executeMinterGrant();
