const HDWalletProvider = require('@truffle/hdwallet-provider');
const { artifacts } = require('truffle'); // Import artifacts module from Truffle
const TokenSaleContract = artifacts.require("TokenSaleContract");

module.exports = function(deployer) {
  // Deployment logic
  deployer.deploy(TokenSaleContract);
};
