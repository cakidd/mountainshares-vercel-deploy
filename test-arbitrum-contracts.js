const { ethers } = require('ethers');

async function testArbitrumContracts() {
  console.log('🧪 Testing your Arbitrum contracts...');
  
  const contracts = [
    '0x64653E5fe1Ece26939B7F1a51ba1eC03BA6a9d62',
    '0xE8A9c6fFE6b2344147D886EcB8608C5F7863B20D', 
    '0x5FbDB2315678afecb367f032d93F642f64180aa3'
  ];
  
  const provider = new ethers.providers.JsonRpcProvider('https://arb1.arbitrum.io/rpc');
  
  for (const address of contracts) {
    console.log(`\n🔍 Checking contract: ${address}`);
    
    try {
      // Check if it's a contract
      const code = await provider.getCode(address);
      if (code === '0x') {
        console.log(`❌ No contract found at this address`);
        continue;
      }
      
      console.log(`✅ Contract found! Code length: ${code.length} bytes`);
      
      // Try to get basic contract info
      const contractABI = [
        "function name() public view returns (string)",
        "function symbol() public view returns (string)",
        "function totalSupply() public view returns (uint256)"
      ];
      
      const contract = new ethers.Contract(address, contractABI, provider);
      
      try {
        const name = await contract.name();
        const symbol = await contract.symbol();
        const totalSupply = await contract.totalSupply();
        
        console.log(`📛 Name: ${name}`);
        console.log(`🎫 Symbol: ${symbol}`);
        console.log(`📊 Total Supply: ${ethers.utils.formatEther(totalSupply)}`);
        
      } catch (e) {
        console.log(`ℹ️ Contract exists but doesn't implement standard ERC20 interface`);
      }
      
    } catch (error) {
      console.log(`❌ Error checking contract: ${error.message}`);
    }
  }
}

testArbitrumContracts();
