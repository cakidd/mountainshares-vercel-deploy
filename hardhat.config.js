require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

const privateKey = process.env.PRIVATE_KEY;
if (!privateKey || privateKey.length !== 64) {
  console.log("⚠️  PRIVATE_KEY missing or invalid in .env file");
  console.log("   Expected: 64-character hex string (32 bytes)");
  console.log("   Current length:", privateKey ? privateKey.length : "undefined");
}

module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    // Ethereum Mainnet
    mainnet: {
      url: process.env.ETH_RPC_URL || "https://eth.llamarpc.com",
      accounts: privateKey && privateKey.length === 64 ? [privateKey] : [],
      chainId: 1,
      gasPrice: 25000000000, // 25 gwei
      confirmations: 2,
      timeoutBlocks: 200
    },
    // Ethereum Sepolia Testnet
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "https://rpc.sepolia.dev",
      accounts: privateKey && privateKey.length === 64 ? [privateKey] : [],
      chainId: 11155111,
      gasPrice: 20000000000 // 20 gwei
    },
    // Polygon (your previous network)
    polygon: {
      url: "https://polygon-rpc.com",
      accounts: privateKey && privateKey.length === 64 ? [privateKey] : [],
      chainId: 137,
      gasPrice: 35000000000
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};
