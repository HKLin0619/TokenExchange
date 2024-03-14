require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3'); // Corrected import statement
const MNEMONIC = ''; //Find your own mnemonic in Metamask
const INFURA_KEY = 'fa837cf8998749cf8f4afd6497a17480';
const MNEMONIC_FILE = require('./MNEMONIC.js');
const { NETWORK_CHECK_TIMEOUT, CONFIRMATIONS, SKIP_DRY_RUN, TIME_OUT_BLOCK, POLYGON_SCAN_API_KEY } = MNEMONIC_FILE;

const GAS_FEE = 20000000; // Adjust gas fee according to your network

const networkConfig = {
  gas: GAS_FEE,
  network_id: '80001', // Replace with your network ID
  networkCheckTimeout: NETWORK_CHECK_TIMEOUT,
  confirmations: CONFIRMATIONS,
  skipDryRun: SKIP_DRY_RUN,
  timeoutBlocks: TIME_OUT_BLOCK,
  websocket: true,
};

module.exports = {
  networks: {
    development: {
      provider: () => {
        if (!MNEMONIC || !INFURA_KEY) {
          console.error("Please set MNEMONIC and INFURA_KEY environment variables");
          return;
        }

        return new HDWalletProvider({
          mnemonic: MNEMONIC,
          providerOrUrl: `https://polygon-mumbai.infura.io/v3/${INFURA_KEY}`
        });
      },
      ...networkConfig
    },
  },
  compilers: {
    solc: {
      version: '0.8.5', // Adjust the version according to your contract's compatibility
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },
  plugins: ['truffle-plugin-verify'],
  api_keys: {
    polygonscan: POLYGON_SCAN_API_KEY,
  },
};
