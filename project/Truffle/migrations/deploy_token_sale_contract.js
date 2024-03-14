const HDWalletProvider = require('@truffle/hdwallet-provider');
const { artifacts } = require('truffle');
const TokenSaleContract = artifacts.require("TokenSaleContract");

module.exports = function(deployer, network, accounts) {
  const mnemonic = process.env.MNEMONIC;
  const infuraKey = process.env.INFURA_KEY;

  if (!mnemonic || !infuraKey) {
    console.error("Please set MNEMONIC and INFURA_KEY environment variables");
    return;
  }

  const provider = new HDWalletProvider({
    mnemonic: mnemonic,
    providerOrUrl: `https://polygon-mumbai.infura.io/v3/fa837cf8998749cf8f4afd6497a17480`
  });

  deployer.deploy(TokenSaleContract, { from: accounts[0] });
};
