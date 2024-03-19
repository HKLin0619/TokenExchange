require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const MNEMONIC = 'hole tongue pledge citizen exclude inmate crisp danger stove sock drill burst'; //Find your own mnemonic in Metamask
const ALCHEMY_API_KEY = 'Dbycwpijz9kYrap5YX0zSc2wUFwIdL57'; // Use your Alchemy API key
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
        if (!MNEMONIC || !ALCHEMY_API_KEY) {
          console.error("Please set MNEMONIC and ALCHEMY_API_KEY environment variables");
          return;
        }

        return new HDWalletProvider({
          mnemonic: MNEMONIC,
          providerOrUrl: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_API_KEY}`
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
