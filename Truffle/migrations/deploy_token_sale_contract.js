const HDWalletProvider = require("@truffle/hdwallet-provider");
const { artifacts } = require("@truffle/hdwallet-provider"); // Import artifacts from Truffle
const TokenSaleContract = artifacts.require("TokenSaleContract");

module.exports = async function (deployer, network, accounts) {
  const mnemonic = process.env.MNEMONIC;
  const infuraKey = process.env.INFURA_KEY;

  if (!mnemonic || !infuraKey) {
    console.error("Please set MNEMONIC and INFURA_KEY environment variables");
    return;
  }

  const provider = new HDWalletProvider({
    mnemonic: mnemonic,
    providerOrUrl: `https://polygon-mumbai.g.alchemy.com/v2/F1ML4buVRkx0K-OaITs-MkUDZcSLigq9`,
  });

  try {
    await deployer.deploy(TokenSaleContract, { from: accounts[0] });
    console.log("TokenSaleContract deployed successfully.");
  } catch (error) {
    console.error("Error deploying TokenSaleContract:", error);
  }
};