const { Web3 } = require("web3");

const web3 = new Web3("http://127.0.0.1:7545");
// const web3 = new Web3(window.ethereum);
const tokenContract = new web3.eth.Contract(require("./ContractABI.js"));
// const tokenContract = new web3.eth.Contract(require("./ContractABI"));

module.exports.web3 = web3;
module.exports.tokenContract = tokenContract;
