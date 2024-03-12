// SPDX-License-Identifier: AGPL-3.0-only - see /LICENSE.md for Terms

/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * truffleframework.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like truffle-hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a MNEMONIC - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */
require('dotenv').config();
const {Web3} = require('web3');
const web3 = new Web3();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const NonceTrackerSubprovider = require('web3-provider-engine/subproviders/nonce-tracker');
const MNEMONIC_FILE = require('./MNEMONIC.js');
const {NETWORK_CHECK_TIMEOUT, CONFIRMATIONS, SKIP_DRY_RUN, TIME_OUT_BLOCK, POLYGON_SCAN_API_KEY } = MNEMONIC_FILE;
const RPC = process.env.HTTPS_RPC_URL_FOR_PUBLISH;
const MNEMONIC = process.env.MNEMONIC;
const NETWORK_ID = process.env.NETWORK_ID;
const GAS_FEE = (NETWORK_ID == '80001') ? 19000000 : 20000000;

// const DEV_MNEMONIC = process.env.DEV_MNEMONIC || require('./DEV_MNEMONIC.js').MNEMONIC;
// const PROD_MNEMONIC = process.env.PROD_MNEMONIC || require('./PROD_MNEMONIC.js').MNEMONIC;
// const DEV_RPC = process.env.PROD_RPC || require('./DEV_MNEMONIC.js').RPC;
// const PROD_RPC = process.env.PROD_RPC || require('./PROD_MNEMONIC.js').RPC;
// const DEV_NETWORK_ID = process.env.DEV_NETWORK_ID || require('./PROD_MNEMONIC.js').NETWORK_ID;
// const PROD_NETWORK_ID = process.env.PRODUCT_NETWORK_ID || require('./PROD_MNEMONIC.js').NETWORK_ID;
// const GAS_FEE = process.env.GAS_FEE
// const CONTRACT_ENV=process.env.CONTRACT_ENV || 'development'

// const DEV_MNEMONIC = process.env.DEV_MNEMONIC;
// const PROD_MNEMONIC = process.env.PROD_MNEMONIC;
// const DEV_RPC = process.env.DEV_RPC;
// const PROD_RPC = process.env.PROD_RPC;
// const DEV_NETWORK_ID = process.env.DEV_NETWORK_ID;
// const PROD_NETWORK_ID = process.env.PRODUCT_NETWORK_ID;
// const GAS_FEE = process.env.GAS_FEE
// const CONTRACT_ENV=process.env.CONTRACT_ENV;
const GWEI_MAINNET_1 = '80';
const GWEI_MAINNET_56 = '5'; // 5 gwei minimum [PoA validator cartel!]?! trial & error - not clear at all; <5 gwei seems to never mine...
const GWEI_MAINNET_137 = '80';
const GWEI_TESTNET_97 = '10';
const GWEI_TESTNET_80001 = '10';
const GWEI_TESTNET = '20';
const GWEI_MATIC = '40'; // https://www.polygongasstation.com/
const GWEI_FANTOM = '5';

const networkConfig = (NETWORK_ID == '80001') ?
  {
    gas: GAS_FEE, // 19m
    // gasPrice: web3.utils.toWei(GWEI_MAINNET_137, 'gwei'),
    network_id: NETWORK_ID,
    networkCheckTimeout: NETWORK_CHECK_TIMEOUT,
    confirmations: CONFIRMATIONS,
    skipDryRun: SKIP_DRY_RUN,
    timeoutBlocks: TIME_OUT_BLOCK,
    websocket: true,
    maxFeePerGas: '200000000000', // 200gwei
    maxPriorityFeePerGas: '50000000000' // 50 gwei
  }
  :
  {
    gas: GAS_FEE, // 20m
    // gasPrice: web3.utils.toWei(GWEI_TESTNET_80001, 'gwei'),
    network_id: NETWORK_ID,
    networkCheckTimeout: NETWORK_CHECK_TIMEOUT,
    confirmations: CONFIRMATIONS,
    skipDryRun: SKIP_DRY_RUN,
    timeoutBlocks: TIME_OUT_BLOCK,
    websocket: true,
    maxFeePerGas: '40000000000', // 40gwei
    maxPriorityFeePerGas: '10000000000' // 10 gwei
  } 
  

//
// https://chainid.network/chains/
//

module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run develop or test. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  networks: {
    //
    // DEPLOYMENT TIMEOUTS/LIMITS
    // web3 waits a maximum of 50 blocks for TX receipt (https://github.com/trufflesuite/truffle/issues/594)
    // gweiDeployment MUST BE HIGH ENOUGH TO RELIABLY CONFIRM WITHIN 50 BLOCKS, otherwise deployments will fail
    //

    // Useful for testing. The development name is special - truffle uses it by default
    // if it's defined here and no other network is specified at the command line.
    // You should run a client (like ganache-cli, geth or parity) in a separate terminal
    // tab if you use this network and you must also set the host, port and network_id
    // options below to some value.
    //
    // development: { // for "truffle develop"  (built-in ganache, max 10 accounts)
    //     host: "127.0.0.1",
    //     port: 9545,
    //     network_id: "*",
    // },
    development: {
      // for "truffle test" -- use with "ganache-cli -a 1000" (1000 test accounts)
      //  host: process.env.GANACHE_HOST || '127.0.0.1',
      //  port: 8545,
      //  network_id: '*', // see: getTestContextWeb3() for dev network_id convention
      //  gas: 7900000,
      //  gasPrice: web3.utils.toWei(GWEI_MAINNET_56, 'gwei'), // we use mainnet pricing for accurate logGas() fiat cost estimates
      provider: () => {
        var wallet = new HDWalletProvider(MNEMONIC, RPC, 0, 1000);
        var nonceTracker = new NonceTrackerSubprovider();
        wallet.engine._providers.unshift(nonceTracker);
        nonceTracker.setEngine(wallet.engine);
        return wallet;
      },
      ...networkConfig
    },
    // // Fantom Testnet
    // fantom_testnet: {
    //   provider: function () {
    //     var wallet = new HDWalletProvider(
    //       DEV_MNEMONIC,
    //       'https://rpc.testnet.fantom.network', // https://docs.fantom.foundation/tutorials/set-up-metamask-testnet
    //       0,
    //       1000,
    //     );
    //     var nonceTracker = new NonceTrackerSubprovider();
    //     wallet.engine._providers.unshift(nonceTracker);
    //     nonceTracker.setEngine(wallet.engine);
    //     return wallet;
    //   },
    //   gas: 8000000, // 8m
    //   gasPrice: web3.utils.toWei(GWEI_FANTOM, 'gwei'),
    //   network_id: '4002',
    //   networkCheckTimeout: 90000,
    //   confirmations: 1,
    //   skipDryRun: false,
    //   timeoutBlocks: 200,
    // },

    // Another network with more advanced options...
    // advanced: {
    // port: 8777,             // Custom port
    // network_id: 1342,       // Custom network
    // gas: 8500000,           // Gas sent with each transaction (default: ~6700000)
    // gasPrice: 20000000000,  // 20 gwei (in wei) (default: 100 gwei)
    // from: <address>,        // Account to send txs from (default: accounts[0])
    // websockets: true        // Enable EventEmitter interface for web3 (default: false)
    // },

    // Useful for deploying to a public network.
    // NB: It's important to wrap the provider as a function.
    // ropsten: {
    // provider: () => new HDWalletProvider(MNEMONIC, https://ropsten.infura.io/v3/YOUR-PROJECT-ID),
    // network_id: 3,       // Ropsten's id
    // gas: 5500000,        // Ropsten has a lower block limit than mainnet
    // confirmations: 2,    // # of confs to wait between deployments. (default: 0)
    // timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
    // skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    // },

    // Useful for private networks
    // private: {
    // provider: () => new HDWalletProvider(MNEMONIC, https://network.io),
    // network_id: 2111,   // This network is yours, in the cloud.
    // production: true    // Treats this network as if it was a public net. (default: false)
    // }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    timeout: 0,
    enableTimeouts: false,

    // on ropsten:
    // * "ERROR: eth-gas-reporter was unable to resolve a client url from the provider available in your test context.
    // Try setting the url as a mocha reporter option (ex: url='http://localhost:8545')"
    /*reporter: 'eth-gas-reporter',
     reporterOptions: {
       currency: 'usd',
       gasPrice: 10
       // *
       //, url: 'https://ac-dev0.net:9545'
     }*/
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: '0.8.5', // Contract code size exceeds 24576 bytes (a limit introduced in Spurious Dragon)
      docker: false, // Use "0.5.8" you've installed locally with docker (default: false)
      settings: {
        // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 1,
        },
        evmVersion: 'byzantium',
      },
    },
  },

  all: false,
  compileAll: false,
  plugins: ['truffle-plugin-verify'],
  api_keys: {
    polygonscan: POLYGON_SCAN_API_KEY,
  },
};