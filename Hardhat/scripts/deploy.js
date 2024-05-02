async function main() {
    const PurchaseContract = await ethers.getContractFactory("TokenSaleContract");
  
    const purchase_contract = await PurchaseContract.deploy();
  
    console.log("Contract deployed to address: ", purchase_contract.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });