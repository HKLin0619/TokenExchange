const HDWalletProvider = require('@truffle/hdwallet-provider');
const TokenSaleContract = artifacts.require("TokenSaleContract");
const database = require('../../project/server/database.js'); // Adjust the path as needed

module.exports = async function (deployer, network, accounts) {
  const mnemonic = "hole tongue pledge citizen exclude inmate crisp danger stove sock drill burst";
  const alchemyKey = "HgdQ5uEuyEkL80PxHnNkCvJgGzcioGDM";

  if (!mnemonic || !alchemyKey) {
    console.error("Please set MNEMONIC and ALCHEMY_KEY environment variables");
    return;
  }

  const provider = new HDWalletProvider({
    mnemonic: mnemonic,
    providerOrUrl: `https://eth-sepolia.g.alchemy.com/v2/${alchemyKey}`,
  });

  try {
    await deployer.deploy(TokenSaleContract, { from: accounts[1] });
    const deployed = await TokenSaleContract.deployed(); // Get the deployed contract instance
    console.log("TokenSaleContract deployed successfully at:", deployed.address);
    
    // Insert contract address into database
    await database.query(
      'INSERT INTO "Contract" ("contractID") VALUES ($1);',
      [deployed.address]
    );
    
    console.log("Contract address inserted into the database successfully");
  } catch (error) {
    console.error("Error deploying TokenSaleContract:", error);
  }
};
