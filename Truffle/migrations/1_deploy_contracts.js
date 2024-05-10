const HDWalletProvider = require('@truffle/hdwallet-provider');
const TokenSaleContract = artifacts.require("TokenSaleContract");

module.exports = async function (deployer, network, accounts) {
  const mnemonic = "hole tongue pledge citizen exclude inmate crisp danger stove sock drill burst";
  const infuraKey = "HgdQ5uEuyEkL80PxHnNkCvJgGzcioGDM";

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
