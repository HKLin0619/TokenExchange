const express = require('express')
const app = express()
const database = require('./database')

app.use(express.static('public'));
app.use(express.json());

const { tokenContract, web3 } = require('../contract/Blockchain');
const byteCode = require('../contract/Bytecode');
const contractABI = require('../contract/ContractABI');

app.post('/login', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    database.query('SELECT * FROM "User" WHERE "userName" = $1', [username]).then(result => {

        if (result.rows.length === 1) {

            const dbPassword = result.rows[0].password;

            if (dbPassword === password) {

                const userData = result.rows[0]
                res.json({ success: true, userData});

            } else {

                res.json({ success: false, errorType: 'password' });

            }

        } else {

            res.json({ success: false, errorType: 'username' });

        }

    }).catch(error => {

        console.error('Database Error: ', error);
        res.json({ success: false });

    })

});

app.post('/signup', (req, res) => {

    const userType = req.body.userType;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    database.query('SELECT * FROM "User" WHERE "userName" = $1', [username]).then(result => {

        if (result.rows.length === 1) {

            res.json({ success: false, errorType: 'usernameTaken' });

        } else {

            if (userType === 'Roles') {

                res.json({ success: false, errorType: 'userType' });

            } else if (!username) {

                res.json({ success: false, errorType: 'username' });

            } else if (!email) {

                res.json({ success: false, errorType: 'email' });

            } else if (!password) {

                res.json({ success: false, errorType: 'password' });

            } else if (!confirmPassword) {

                res.json({ success: false, errorType: 'confirmPassword' });
                   
            } else if (password !== confirmPassword) {

                res.json({ success: false, errorType: 'passwordInconsistency' });

            } else {

                database.query('INSERT INTO "User" ("userName", "email", "password", "userType") VALUES ($1, $2, $3, $4) RETURNING *', [username, email, password, userType.toLowerCase()]).then(result => {
                
                    res.json({ success: true });
    
                }).catch(error => {
    
                    console.error('Database Error: ', error);
                    res.json({ success: false });
            
                })
                
            }

        }

    }).catch(error => {

        console.error('Database Error: ', error);
        res.json({ success: false });

    })

});

app.post('/tokenminting', async (req, res) => {

    const tokenSymbol = req.body.tokenSymbol;
    const numberOfToken = req.body.numberOfToken;
    const tokenName = await database.query('SELECT "Name" FROM "Token" where "Symbol" = $1;', [tokenSymbol]).then((res) => res.rows[0]);
 
    if (!tokenSymbol) {

        res.json({ success: false, errorType: 'tokenSymbol' });
        console.log('tokenSymbol');
        return;
        
    } else if (!tokenName) {

        res.json({ success: false, errorType: 'tokenName' });
        console.log('tokenName');
        return;

    } else if (!numberOfToken) {

        res.json({ success: false, errorType: 'numberOfToken' });
        console.log('numberOfToken');
        return;

    } else if (isNaN(numberOfToken)) {

        res.json({ success: false, errorType: 'numberError' });
        console.log('numberError');
        return;
    }

    let contractAddress;

    const deployedContract = await tokenContract.deploy({
        data: byteCode,
        arguments: [tokenName.Name, tokenSymbol, numberOfToken],
    })
    .send({
        from: '0xD14d1085Afdd2248F9665C92C073C9a59AFd97db',
        gas: 6721975,
        gasPrice: 20000000000,
    })
    .on ('receipt', (receipt) => {
        contractAddress = receipt.contractAddress;
        console.log('Contract deployed at address: ' + contractAddress);
        res.json({ success: true });
    });

    const contractID = await database.query('INSERT INTO "Contract" ("contractID") VALUES ($1);', [contractAddress]);

});


// View Token
app.get('/viewtoken', async (req, res) => {
    try {
        // Fetch contractID from the database
        const result = await database.query('SELECT "contractID" FROM "Contract";');

        
        if (result.rows.length === 0) {
            return res.status(404).send({ status: 404, message: 'Contract not found.' });
        }

        // Extract the contractID value
        const contractID = result.rows[0].contractID;

        // Create a contract instance
        const contract = new web3.eth.Contract(contractABI, contractID);


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

app.listen(5000, () => { console.log("Server started on port 5000") })