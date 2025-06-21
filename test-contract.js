const { ethers } = require('ethers');

async function testContract() {
    try {
        console.log('🔍 Testing Arbitrum contract connection...');
        
        const provider = new ethers.providers.JsonRpcProvider('https://arb1.arbitrum.io/rpc');
        const contractAddress = '0xE8A9c6fFE6b2344147D886EcB8608C5F7863B20D';
        
        // Test network connection
        const network = await provider.getNetwork();
        console.log(`✅ Connected to network: ${network.name} (Chain ID: ${network.chainId})`);
        
        // Test contract exists
        const code = await provider.getCode(contractAddress);
        if (code === '0x') {
            throw new Error('Contract not found at address');
        }
        console.log('✅ Contract found at address');
        
        // Test contract ABI (basic)
        const abi = [
            "function name() view returns (string)",
            "function symbol() view returns (string)",
            "function totalSupply() view returns (uint256)"
        ];
        
        const contract = new ethers.Contract(contractAddress, abi, provider);
        
        const name = await contract.name();
        const symbol = await contract.symbol();
        const supply = await contract.totalSupply();
        
        console.log(`✅ Contract Name: ${name}`);
        console.log(`✅ Contract Symbol: ${symbol}`);
        console.log(`✅ Total Supply: ${ethers.utils.formatEther(supply)}`);
        
        console.log('🎉 All contract tests passed!');
        
    } catch (error) {
        console.error('❌ Contract test failed:', error.message);
        process.exit(1);
    }
}

testContract();
