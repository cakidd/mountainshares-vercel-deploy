const { ethers } = require('ethers');

const provider = new ethers.providers.JsonRpcProvider(process.env.ARBITRUM_RPC_URL);
const contract = new ethers.Contract(
  process.env.MOUNTAINSHARES_CONTRACT_ADDRESS,
  ABI, // Your verified contract ABI
  provider
);

// Real blockchain transaction handler
async function executeRealPurchase(amount, walletAddress) {
  const tx = await contract.purchaseMountainShares(amount, { from: walletAddress });
  return {
    success: true,
    transactionHash: tx.hash,
    arbitrumExplorer: `https://arbiscan.io/tx/${tx.hash}`,
    blockNumber: tx.blockNumber,
    gasUsed: tx.gasUsed
  };
}

module.exports = { executeRealPurchase, contract, provider };
