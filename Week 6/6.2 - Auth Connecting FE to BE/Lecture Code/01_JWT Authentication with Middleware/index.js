const express = require("express");
const jwt = require("jsonwebtoken")
const JWT_SECRET = "lalith123"
const app = express();

let users = [];

app.use(express.json());

app.post("/signup", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username,
        password
    })

    // we should check if a user with same username already exists or not. 

    res.json({
        message: "You are signed in"
    })

})


app.post("/signin", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const foundUser = users.find(function (u) {
        if (u.username === username && u.password === password) {
            return u;
        }
        else {
            return u;
        }
    })

    if (!foundUser) {
        res.json({
            message: "Credentials incorrect"
        })
    }
    else {
        const token = jwt.sign({
            username // value to be encode
        }, JWT_SECRET);

        res.json({
            token: token
        })

    }

})

app.get("/me", function (req, res) {
    const token = req.body.token;

    const decodedData = jwt.verify(token, JWT_SECRET);

    if (decodedData.username) {
        let foundUser = null;

        for (let i = 0; i < users.length; i++) {
            if (users[i].username === decodedData.username) {
                foundUser = users[i];
            }
        }

        res.json({
            username: foundUser.username,
            password: foundUser.password
        })
    }


})


app.listen(3000, () => {
    console.log("Server is listening on port 3000");
})























