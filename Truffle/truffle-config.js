// Import necessary modules and configurations
require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const MNEMONIC = "hole tongue pledge citizen exclude inmate crisp danger stove sock drill burst";
const ALCHEMY_API_KEY = "HgdQ5uEuyEkL80PxHnNkCvJgGzcioGDM";
const { NETWORK_CHECK_TIMEOUT, CONFIRMATIONS, SKIP_DRY_RUN, TIME_OUT_BLOCK, POLYGON_SCAN_API_KEY } = require('./MNEMONIC.js');

const GAS_FEE = 20000000; // Adjust gas fee according to your network

const networkConfig = {
  gas: GAS_FEE,
  networkCheckTimeout: NETWORK_CHECK_TIMEOUT,
  confirmations: CONFIRMATIONS,
  skipDryRun: SKIP_DRY_RUN,
  timeoutBlocks: TIME_OUT_BLOCK,
  websocket: true,
  maxFeePerGas: '200000000000', // 200gwei
  maxPriorityFeePerGas: '50000000000' // 50 gwei
};

module.exports = {
  networks: {
    ethereum_sepolia: {
      provider: () => {
        if (!MNEMONIC || !ALCHEMY_API_KEY) {
          console.error("Please set MNEMONIC and ALCHEMY_API_KEY environment variables");
          return;
        }

        return new HDWalletProvider({
          mnemonic: MNEMONIC,
          providerOrUrl: `wss://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`
        });
      },
      network_id: '11155111', // Ethereum Sepolia network id
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
};