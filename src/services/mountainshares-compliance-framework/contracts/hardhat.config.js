
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  networks: {
    arbitrum: {
      url: "https://arb1.arbitrum.io/rpc",
      accounts: ["0x" + process.env.PRIVATE_KEY]
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
