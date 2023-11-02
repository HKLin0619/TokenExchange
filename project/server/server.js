const express = require('express')
const app = express()

// app.get("/api", (req, res) => {
//     res.json({"users": ["userOne", "userTwo", "userThree"]})
// })

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/login', (req, res) => {

    const { username, password } = req.body;

})

app.listen(5000, () => { console.log("Server started on port 5000") })