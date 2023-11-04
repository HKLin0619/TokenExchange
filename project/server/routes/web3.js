const router = require('express').Router()

const { query } = require('../database');

const { tokenContract } = require('../web3')
const bytecode = require('../assets/bytecode')

router.use((req, res, next) => { next()});

router.post('/mintToken', async (req, res) => {
    const { tokenSymbol, noOfToken } = req.body
    if(tokenSymbol === undefined || noOfToken === undefined || isNaN(noOfToken)){
        return res.status(400).send({status: '400', message: 'Invalid input.'})
    }

    const tokenName = await query('SELECT "Name" FROM "Token" where "Symbol" = $1;', [tokenSymbol]).then((res) => res.rows[0])

    if(tokenName === undefined){
        return res.status(400).send({status: '400', message: 'Invalid token.'})
    }

    const result = await tokenContract.deploy({
        data: bytecode,
        arguments: [tokenSymbol, tokenName.Name , noOfToken]
    }).send({
        from: "0x59f646aa857AA5E6a6dff4e834acD91C7Fbe667E",
        gas: 6721975,
        gasPrice: 20000000000
    })

    const contractAddress = result.options.address

    return res.status(200).send({
        status: 200,
        message: 'Successfully something',
        contractAddress: contractAddress
    })
})



module.exports = router;