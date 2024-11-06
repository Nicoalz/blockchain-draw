/* eslint-disable @typescript-eslint/no-require-imports */
const { ethers } = require('hardhat');
const { exportAddresses } = require('./export-addresses');

async function main() {
  const LotteryPlatform = await ethers.getContractFactory('LotteryPlatform');
  const lotteryPlatform = await LotteryPlatform.deploy();

  await lotteryPlatform.waitForDeployment();

  const address = await lotteryPlatform.getAddress();
  // Export address to frontend
  exportAddresses(
    'LotteryPlatform',
    address,
    process.env.HARDHAT_NETWORK || 'localhost',
  );
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
