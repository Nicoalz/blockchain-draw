/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

function exportAddresses(contractName, address, network) {
  const addressesDir = path.join(__dirname, '../../src/config/contracts');

  if (!fs.existsSync(addressesDir)) {
    fs.mkdirSync(addressesDir, { recursive: true });
  }

  const filePath = path.join(addressesDir, `${network}.json`);

  let addresses = {};
  if (fs.existsSync(filePath)) {
    addresses = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }

  addresses[contractName] = address;

  fs.writeFileSync(filePath, JSON.stringify(addresses, null, 2));
  console.log(`Exported ${contractName} address to frontend config`);
}

module.exports = { exportAddresses };
