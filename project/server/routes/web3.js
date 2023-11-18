const router = require('express').Router();

const { query } = require('../database');
const { tokenContract, web3 } = require('../web3');
const bytecode = require('../assets/bytecode');
const contractAbi = require('../assets/contractABI');

router.use((req, res, next) => {
  next();
});

// MintToken to remix
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
        from: '0xA6c0909063cB3749f61EBCb2fEA8148991444aA0',
        gas: 6721975,
        gasPrice: 20000000000,
    })
    .on('receipt',  (receipt) => {
        contractAddress = receipt.contractAddress; // Store the contract address here
        console.log('Contract deployed at address: ' + contractAddress);
        // You can now use 'contractAddress' for further interactions
        
    });

    // insert to db
    const contractID = await query('INSERT INTO "Contract" ("contractID") VALUES ($1);', [contractAddress]);

    return res.status(200).send({
        status: 200,
        message: 'Successfully something',
        message: contractAddress,
        
        contractAddress: contractAddress, // Return the contract address in the response
    });
});


//View Token
router.get('/viewToken', async (req, res) => {
    try {
        // Fetch contractID from the database
        const result = await query('SELECT "contractID" FROM "Contract";');
        
        if (result.rows.length === 0) {
            return res.status(404).send({ status: 404, message: 'Contract not found.' });
        }

        // Extract the contractID value
        const contractID = result.rows[0].contractID;

        // Create a contract instance
        const contract = new web3.eth.Contract(contractAbi, contractID);

        // Call the contract's name() and symbol() functions
        const name = await contract.methods.name().call();
        const symbol = await contract.methods.symbol().call();
        const totalSupply = await contract.methods.totalSupply().call();
        const ethTotallySupply = Number(totalSupply) / 10**18;

        return res.status(200).send({ name, symbol, ethTotallySupply });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ status: 400, message: error.message });
    }
});


module.exports = router;
