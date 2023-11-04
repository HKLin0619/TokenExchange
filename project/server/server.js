const express = require('express')
const app = express()
const database = require('./database')

app.use(express.static('public'));
app.use(express.json());

app.post('/login', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    // database.query('SELECT * FROM "User" WHERE "userName" = $1 AND "password" = $2', [username, password]).then(result => {
    //     if (result.rows.length === 1) {
    //         const userType = result.rows[0].userType;
    //         res.json({ success: true, userType });
    //         //res.send('Login Successful !');
    //     } else {
    //         if (result.rows.length === 0) {
    //             res.send('u');
    //         } else {
    //             res.send('p');
    //         }
    //         //res.json({ success: false });
    //         //res.send('Login failed, please check username and password !');
    //     }
    // }).catch(error => {
    //     console.error('Database Error: ', error);
    //     res.json({ success: false });
    //     //res.send('Login failed and a database error occurred !')
    // });


    database.query('SELECT * FROM "User" WHERE "userName" = $1', [username]).then(result => {

        if (result.rows.length === 1) {

            const dbPassword = result.rows[0].password;

            if (dbPassword === password) {

                const userType = result.rows[0].userType
                res.json({ success: true, userType });

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

app.listen(5000, () => { console.log("Server started on port 5000") })