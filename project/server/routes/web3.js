const router = require('express').Router();

const { query } = require('../database');
const { tokenContract, web3 } = require('../web3');
const bytecode = require('../assets/bytecode');
const contractAbi = require('../assets/contractABI');

router.use((req, res, next) => {
  next();
});

router.post('/mintToken', async (req, res) => {
    const { tokenSymbol, noOfToken } = req.body;
    if (tokenSymbol === undefined || noOfToken === undefined || isNaN(noOfToken)) {
        return res.status(400).send({ status: '400', message: 'Invalid input.' });
    }

    const tokenName = await query('SELECT "Name" FROM "Token" where "Symbol" = $1;', [tokenSymbol]).then((res) => res.rows[0]);

    if (tokenName === undefined) {
        return res.status(400).send({ status: '400', message: 'Invalid token.' });
    }

    // Declare contractAddress at an outer scope
    let contractAddress;

    const result = await tokenContract.deploy({
        data: bytecode,
        arguments: [tokenName.Name, tokenSymbol, noOfToken], // Use noOfToken as totalSupply
    })
    .send({
        from: '0x340E8b57D12A8F94833E104Eb7E09351DcF98A75',
        gas: 6721975,
        gasPrice: 20000000000,
    })
    .on('receipt', (receipt) => {
        contractAddress = receipt.contractAddress; // Store the contract address here
        console.log('Contract deployed at address: ' + contractAddress);
        // You can now use 'contractAddress' for further interactions
    });

    // insert to db


    return res.status(200).send({
        status: 200,
        message: 'Successfully something',
        message: contractAddress,
        
        contractAddress: contractAddress, // Return the contract address in the response
    });
});


router.get('/viewToken', async (req, res) => {
    try {
        // From db get a list of contract address by admin
        // select * from transciton 

        // Contract address and ABI (replace with your contract details)
        const contractAddress = '0x277091b0174e3b9e83d952607c7f76f7b183676c';

        // Create a contract instance
        const contract = new web3.eth.Contract(contractAbi, contractAddress);
        // Call the contract's name() and symbol() functions
        const name = await contract.methods.name().call()

        const symbol = await contract.methods.symbol().call()
        
        const totalSupply  = await contract.methods.totalSupply().call()
        
        const ethTotallySupply = Number(totalSupply) / 10**18;

        // return res.status(200).send({name, symbol, totalSupply: JSON.stringify(totalSupply.toString())})
        return res.status(200).send({name, symbol, ethTotallySupply})
    } catch (error) {
        console.log(error)
        return res.status(400).send({status: 400, message: error})
    }
})

module.exports = router;
