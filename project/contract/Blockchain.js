const { Web3 } = require("web3");
const fs = require("fs");
const database = require('../server/database.js');

const web3 = new Web3("https://eth-sepolia.g.alchemy.com/v2/HgdQ5uEuyEkL80PxHnNkCvJgGzcioGDM");

async function initializeContract() {
    try {
        const contractABI = JSON.parse(fs.readFileSync("./TokenSaleContract.json"));
        const contractAddress = await database.query('SELECT "contractID" FROM "Contract" ORDER BY "contractID" DESC LIMIT 1;');
        const tokenContract = new web3.eth.Contract(contractABI, contractAddress);
        console.log("Contract initialized successfully."); // Add this line
        return tokenContract;
    } catch (error) {
        console.error("Error initializing contract:", error);
        throw error;
    }
}

module.exports = { web3, initializeContract };
