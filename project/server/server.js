const express = require('express')
const app = express()
const database = require('./database')

app.use(express.static('public'));
app.use(express.json());

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

app.listen(5000, () => { console.log("Server started on port 5000") })