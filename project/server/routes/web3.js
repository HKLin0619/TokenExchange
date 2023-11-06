const router = require('express').Router();

const { query } = require('../database');
const { tokenContract } = require('../web3');
const bytecode = require('../assets/bytecode');

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
        arguments: [tokenSymbol, tokenName.Name, noOfToken], // Use noOfToken as totalSupply
    })
        .send({
            from: '0x71Ea4935dAA0F90124f870DDd788AFD17c65F6F3',
            gas: 6721975,
            gasPrice: 20000000000,
        })
        .on('receipt', (receipt) => {
            contractAddress = receipt.contractAddress; // Store the contract address here
            console.log('Contract deployed at address: ' + contractAddress);
            // You can now use 'contractAddress' for further interactions
        });


  return res.status(200).send({
    
    status: 200,
    message: 'Successfully something',
    message: contractAddress,
    
    contractAddress: contractAddress, // Return the contract address in the response
  });
});

module.exports = router;
