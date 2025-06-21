const { ethers } = require('ethers');

async function getDeployedContractInfo() {
    console.log('🔍 ANALYZING DEPLOYED MOUNTAINSHARES CONTRACT');
    console.log('============================================');
    
    try {
        const provider = new ethers.providers.JsonRpcProvider('https://arb1.arbitrum.io/rpc');
        const contractAddress = '0xE8A9c6fFE6b2344147D886EcB8608C5F7863B20D';
        
        // Get contract bytecode
        const bytecode = await provider.getCode(contractAddress);
        console.log(`📍 Contract Address: ${contractAddress}`);
        console.log(`📊 Bytecode Length: ${bytecode.length} characters`);
        console.log(`🔗 Network: Arbitrum One`);
        
        // Try to get contract info using standard ERC20 ABI
        const abi = [
            "function name() view returns (string)",
            "function symbol() view returns (string)",
            "function decimals() view returns (uint8)",
            "function totalSupply() view returns (uint256)",
            "function hasRole(bytes32 role, address account) view returns (bool)",
            "function MINTER_ROLE() view returns (bytes32)",
            "function DEFAULT_ADMIN_ROLE() view returns (bytes32)"
        ];
        
        const contract = new ethers.Contract(contractAddress, abi, provider);
        
        console.log('\n📋 CONTRACT DETAILS:');
        const name = await contract.name();
        const symbol = await contract.symbol();
        const decimals = await contract.decimals();
        const totalSupply = await contract.totalSupply();
        
        console.log(`Name: ${name}`);
        console.log(`Symbol: ${symbol}`);
        console.log(`Decimals: ${decimals}`);
        console.log(`Total Supply: ${ethers.utils.formatEther(totalSupply)} ${symbol}`);
        
        // Check roles
        const MINTER_ROLE = await contract.MINTER_ROLE();
        const DEFAULT_ADMIN_ROLE = await contract.DEFAULT_ADMIN_ROLE();
        
        console.log(`\n🔑 ROLE CONSTANTS:`);
        console.log(`MINTER_ROLE: ${MINTER_ROLE}`);
        console.log(`DEFAULT_ADMIN_ROLE: ${DEFAULT_ADMIN_ROLE}`);
        
        // This tells us what the contract should look like
        console.log('\n💡 CONTRACT REQUIREMENTS:');
        console.log('- Must be ERC20 token');
        console.log('- Must have AccessControl');
        console.log('- Must have name "MountainShares"');
        console.log('- Must have symbol "MS"');
        console.log('- Must have 18 decimals');
        console.log('- Must have MINTER_ROLE functionality');
        console.log('- Must have mint function');
        
    } catch (error) {
        console.error('❌ Failed to analyze contract:', error.message);
    }
}

getDeployedContractInfo();
