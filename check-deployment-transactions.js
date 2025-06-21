const { ethers } = require('ethers');

async function checkDeploymentTransactions() {
    console.log('🔍 CHECKING CONTRACT DEPLOYMENT TRANSACTIONS');
    console.log('==========================================');
    
    try {
        const provider = new ethers.providers.JsonRpcProvider('https://arb1.arbitrum.io/rpc');
        
        const deploymentTxs = [
            '0xd536271722f7d7eb715a5074cd8f343d8a2ce445d3ef63f4db52d877ccb82c1c',
            '0x57f26830639334a68f4be6328aa0bebb707d3a91dfc2ccffa976a210b0bcb509'
        ];
        
        const contractAddresses = [
            '0xb3dC07c05749dB59451028ad8ca7e1d50BF37b1B',
            '0xb663DCB090E83BD625E42C613A8f3aE432C6f2B5'
        ];
        
        console.log('📋 DEPLOYMENT TRANSACTION ANALYSIS:');
        
        for (let i = 0; i < deploymentTxs.length; i++) {
            try {
                const tx = await provider.getTransaction(deploymentTxs[i]);
                const receipt = await provider.getTransactionReceipt(deploymentTxs[i]);
                
                console.log(`\n🚀 DEPLOYMENT ${i + 1}:`);
                console.log(`📋 Tx Hash: ${deploymentTxs[i]}`);
                console.log(`📍 Contract: ${contractAddresses[i]}`);
                console.log(`👤 Deployer: ${tx.from}`);
                console.log(`📊 Block: ${tx.blockNumber}`);
                console.log(`⛽ Gas Used: ${receipt.gasUsed.toString()}`);
                console.log(`✅ Status: ${receipt.status === 1 ? 'Success' : 'Failed'}`);
                
                // Check if this deployer matches your known admin
                const knownAdmin = '0xdE75F5168E33db23FA5601b5fc88545be7b287a4';
                if (tx.from.toLowerCase() === knownAdmin.toLowerCase()) {
                    console.log(`🎯 MATCH! This deployer is your known admin!`);
                }
                
            } catch (error) {
                console.log(`❌ Error checking deployment ${i + 1}: ${error.message}`);
            }
        }
        
        console.log('\n🔍 COMPARING WITH YOUR CURRENT CONTRACT:');
        console.log(`Current MountainShares: 0xE8A9c6fFE6b2344147D886EcB8608C5F7863B20D`);
        console.log(`Deployment Contract 1: ${contractAddresses[0]}`);
        console.log(`Deployment Contract 2: ${contractAddresses[1]}`);
        
        if (contractAddresses.includes('0xE8A9c6fFE6b2344147D886EcB8608C5F7863B20D')) {
            console.log('✅ One of these matches your current contract!');
        } else {
            console.log('⚠️ These are different contracts from your current MountainShares');
            console.log('💡 You may have multiple contract deployments');
        }
        
    } catch (error) {
        console.error('❌ Failed to check deployment transactions:', error.message);
    }
}

checkDeploymentTransactions();
