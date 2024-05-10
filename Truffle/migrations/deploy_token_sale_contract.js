const HDWalletProvider = require("@truffle/hdwallet-provider");
const { artifacts } = require("@truffle/hdwallet-provider"); // Import artifacts from Truffle
const TokenSaleContract = artifacts.require("TokenSaleContract");

module.exports = async function (deployer, network, accounts) {
  const mnemonic = process.env.MNEMONIC;
  const infuraKey = process.env.INFURA_KEY;

  if (!mnemonic || !infuraKey) {
    console.error("Please set MNEMONIC and AlCHEMY_KEY environment variables");
    return;
  }

  const provider = new HDWalletProvider({
    mnemonic: mnemonic,
    providerOrUrl: `https://eth-sepolia.g.alchemy.com/v2/HgdQ5uEuyEkL80PxHnNkCvJgGzcioGDM`,
  });

  try {
    const deployed = await deployer.deploy(TokenSaleContract, { from: accounts[0] });
    console.log("TokenSaleContract deployed successfully at:", deployed.address);
  } catch (error) {
    console.error("Error deploying TokenSaleContract:", error);
  }
};
