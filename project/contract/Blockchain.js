const { Web3 } = require("web3");
const ContractABI = require('C:/Users/ACER/Documents/GitHub/TokenExchange/project/Truffle/build/contracts/TokenSaleContract.json');
const fetch = require('node-fetch');

// Replace the Infura URL with your Alchemy endpoint URL
const alchemyUrl = `https://polygon-mumbai.g.alchemy.com/v2/Dbycwpijz9kYrap5YX0zSc2wUFwIdL57`;

// Create a Web3 instance using the Alchemy endpoint URL
const web3 = new Web3(alchemyUrl);

const tokenContract = new web3.eth.Contract(ContractABI.abi); // Accessing the ABI array
module.exports = { web3, tokenContract };

fetch("https://polygon-mumbai.g.alchemy.com/v2/Dbycwpijz9kYrap5YX0zSc2wUFwIdL57", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    method: "eth_blockNumber",
    params: [],
    id: 1
  })
})
.then(response => response.json())
.then(data => {
  console.log(data);
})
.catch(error => {
  console.error(error);
});

// Assuming you want to filter functions from the ABI
const functionsAbi = ContractABI.abi.filter(abi => abi.type === 'function');
// console.log(functionsAbi);
