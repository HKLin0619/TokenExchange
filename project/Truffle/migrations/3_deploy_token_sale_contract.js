const { artifacts } = require('truffle');

const TokenSaleContract = artifacts.require("TokenSaleContract");

module.exports = function(deployer) {
  deployer.deploy(TokenSaleContract);
};

