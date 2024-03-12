const HDWalletProvider = require('@truffle/hdwallet-provider');
const { artifacts } = require('truffle'); // Import artifacts module from Truffle
const TokenSaleContract = artifacts.require("TokenSaleContract");

module.exports = function(deployer, network, accounts) {
  const mnemonic = process.env.MNEMONIC; // Retrieve the mnemonic from environment variables or elsewhere
  const infuraKey = process.env.INFURA_KEY; // Retrieve the Infura key from environment variables or elsewhere

  if (!mnemonic || !infuraKey) {
    console.error("Please set MNEMONIC and INFURA_KEY environment variables");
    return;
  }

  // Set up HDWalletProvider with the mnemonic and Infura URL
  const provider = new HDWalletProvider(mnemonic, `https://polygon-mumbai.infura.io/v3/fa837cf8998749cf8f4afd6497a17480`);

  // Set the provider for the deployer
  deployer.deploy(TokenSaleContract, { from: accounts[0] });
};