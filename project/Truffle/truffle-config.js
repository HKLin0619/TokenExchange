const HDWalletProvider = require('@truffle/hdwallet-provider');
const mnemonic = require('./MNEMONIC'); // Import the mnemonic from MNEMONIC.js

module.exports = {
  networks: {
    mumbai: {
      provider: function() {
        return new HDWalletProvider({
          mnemonic: mnemonic,
          providerOrUrl: 'https://polygon-mumbai.infura.io/v3/fa837cf8998749cf8f4afd6497a17480'
        });
      },
      network_id: 80001,       // Mumbai testnet's network id
      confirmations: 1,        // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,      // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: false        // Skip dry run before migrations? (default: false for public nets )
    }
  },
  compilers: {
    solc: {
      version: "^0.8.0",    // Fetch exact version from solc-bin (default: truffle's version)
      settings: {
        // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: false,
          runs: 200
        },
      }
    }
  },
};
