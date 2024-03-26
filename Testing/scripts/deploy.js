async function main() {
  const deployContract = await ethers.getContractFactory("TokenSaleContract");

  const deploy_contract = await deployContract.deploy();

  console.log("Contract deployed to address: ", deploy_contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

module.exports = main;
