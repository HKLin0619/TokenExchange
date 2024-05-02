const hre = require("hardhat");
const ContractJson = require("../artifacts/contracts/PurchaseContract.sol/TokenSaleContract.json");

const abi = ContractJson.abi;

async function main() {
  const alchemy = new hre.ethers.providers.AlchemyProvider(
    "maticmum",
    process.env.ALCHEMY_API_KEY
  );

  const userWallet = new hre.ethers.Wallet(process.env.PRIVATE_KEY, alchemy);

  const Greeter = new hre.ethers.Contract(
    process.env.CONTRACT_ADDRESS,
    abi,
    userWallet
  );

  const mint = await Greeter.mint("DBX", 1000);
  await mint.wait();
  console.log(
    "You have successfull mint the token" + (await Greeter.callFunction())
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });