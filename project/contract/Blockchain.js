const { Web3 } = require("web3");
const ContractABI = require('./ContractABI.js');

// const web3 = new Web3("http://127.0.0.1:7545");
// // const web3 = new Web3(window.ethereum);
// const tokenContract = new web3.eth.Contract(require("./ContractABI.js"));
// // const tokenContract = new web3.eth.Contract(require("./ContractABI"));

// module.exports.web3 = web3;
// module.exports.tokenContract = tokenContract;

const infuraUrl = `https://polygon-mumbai.infura.io/v3/fa837cf8998749cf8f4afd6497a17480`;

const web3 = new Web3(infuraUrl);

const tokenContract = new web3.eth.Contract(ContractABI);

module.exports = { web3, tokenContract };
