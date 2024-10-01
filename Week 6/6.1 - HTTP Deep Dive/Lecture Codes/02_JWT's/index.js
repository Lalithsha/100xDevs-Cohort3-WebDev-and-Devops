const express = require("express");
const jwt = require("jsonwebtoken")
const app = express();

const JWT_SECRET = "example4334"

app.use(express.json());

let users = [];



app.post("/signup", function (req, res) {

    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username: username,
        password: password
    })

    res.json({
        message: "You are signed up !!"
    })

})

app.post("/signin", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const foundUser = users.find(function (u) {
        if (u.username == username && u.password == password) {
            return true;
        }
        else {
            return false;
        }
    })

    if (foundUser) {
        const token = jwt.sign({
            username: username
        }, JWT_SECRET);
        // foundUser.token = token;
        res.json({
            token: token
        })
    } else {
        res.status(403).send({
            message: "Invalid username or password"
        })
    }

})

app.get("/me", function (req, res) {
    const token = req.headers.token;

    const decodedInformation = jwt.verify(token, JWT_SECRET); // {username:lalithsharma989@gmail.com}
    const username = decodedInformation.username;

    let foundUser = null;
    foundUser = users.find(function (u) {
        if (u.username == username) {
            return true;
        }
    })
    res.send({
        username: foundUser.username,
        password: foundUser.password
    })
})


app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});






















