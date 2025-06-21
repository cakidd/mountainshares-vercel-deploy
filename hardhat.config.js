require("@nomicfoundation/hardhat-verify");
require("dotenv").config();

module.exports = {
  networks: {
    arbitrumOne: {
      url: "https://arb1.arbitrum.io/rpc/G3F3WHRXTH86NGDE8V73VFJZ5CJ6DEFXEH",
      accounts: process.env.PRIVATE_KEY ? [`0x${process.env.PRIVATE_KEY}`] : []
    }
  },
  etherscan: {
    apiKey: {
      arbitrumOne: process.env.ARBISCAN_API_KEY
    },
    customChains: [
      {
        network: "arbitrumOne",
        chainId: 42161,
        urls: {
          apiURL: "https://api.arbiscan.io/api",
          browserURL: "https://arbiscan.io"
        }
      }
    ]
  },
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
