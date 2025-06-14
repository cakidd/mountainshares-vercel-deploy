const { ethers } = require('ethers');

// Initialize provider and contract
const provider = new ethers.providers.JsonRpcProvider(process.env.ARBITRUM_RPC_URL);
const contract = new ethers.Contract(
  process.env.MOUNTAINSHARES_CONTRACT_ADDRESS,
  require("./contract-abi").MOUNTAINSHARES_ABI,
  provider
);

// Real blockchain transaction handler
async function executeRealPurchase(amount, walletAddress) {
  try {
    // Create wallet instance for signing transactions
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const contractWithSigner = contract.connect(wallet);
    
    // Execute real blockchain transaction
    const tx = await contractWithSigner.purchaseMountainShares(amount, { 
      from: walletAddress,
      gasLimit: 300000 // Adjust based on your contract
    });
    
    // Wait for transaction confirmation
    const receipt = await tx.wait();
    
    return {
      success: true,
      transactionHash: tx.hash,
      arbitrumExplorer: `https://arbiscan.io/tx/${tx.hash}`,
      blockNumber: receipt.blockNumber,
      gasUsed: receipt.gasUsed.toString(),
      confirmations: receipt.confirmations
    };
  } catch (error) {
    console.error('Blockchain transaction failed:', error);
    throw new Error(`Transaction failed: ${error.message}`);
  }
}

// Get contract status
async function getContractStatus() {
  try {
    const blockNumber = await provider.getBlockNumber();
    const network = await provider.getNetwork();
    
    return {
      status: 'connected',
      network: network.name,
      chainId: network.chainId,
      blockNumber,
      contractAddress: process.env.MOUNTAINSHARES_CONTRACT_ADDRESS
    };
  } catch (error) {
    console.error('Contract status check failed:', error);
    return {
      status: 'disconnected',
      error: error.message
    };
  }
}

module.exports = { 
  executeRealPurchase, 
  getContractStatus, 
  contract, 
  provider 
};
