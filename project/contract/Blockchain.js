const { Web3 } = require("web3");
const ContractABI = require('C:/Users/ACER/Documents/GitHub/TokenExchange/project/Truffle/build/contracts/TokenSaleContract.json');
const fetch = require('node-fetch');

const infuraUrl = `https://polygon-mumbai.infura.io/v3/fa837cf8998749cf8f4afd6497a17480`;

const web3 = new Web3(infuraUrl);

const tokenContract = new web3.eth.Contract(ContractABI.abi); // Accessing the ABI array
module.exports = { web3, tokenContract };

fetch("https://polygon-mumbai.infura.io/v3/fa837cf8998749cf8f4afd6497a17480", {
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

