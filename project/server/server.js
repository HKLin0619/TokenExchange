const express = require('express')
const app = express()
const database = require('./database')

app.use(express.static('public'));
app.use(express.json());

app.post('/login', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    database.query('SELECT * FROM "User" WHERE "userName" = $1 AND "password" = $2', [username, password]).then(result => {
        if (result.rows.length === 1) {
            const userType = result.rows[0].userType;
            return res.status(200).json({ success: true, userType });
            // return res.status(200).send({status: 200, message: 'Login Successful!'});
        } else {
            return res.status(400).send({status: 400, message: 'Login Unsuccessful!'});
        }
    }).catch(error => {
        res.json({ success: false });
        console.error('Database Error: ', error);
        return res.status(401).send({status: 401, message: 'Login failed and a database error occurred!'});
    });


});

// Web3.js route
app.use('/web3', require('./routes/web3'))



app.listen(5000, () => { console.log("Server started on port 5000") })