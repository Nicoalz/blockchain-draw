/* eslint-disable @typescript-eslint/no-require-imports */
require('@nomicfoundation/hardhat-toolbox');
require('@nomicfoundation/hardhat-ethers');
require('dotenv').config();

module.exports = {
  solidity: '0.8.19',
  networks: {
    baseSepolia: {
      url: `https://base-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
    base: {
      url: `https://base-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
  sourcify: {
    enabled: true,
  },
  etherscan: {
    apiKey: {
      baseSepolia: process.env.ETHERSCAN_API_KEY,
    },
  },
};
