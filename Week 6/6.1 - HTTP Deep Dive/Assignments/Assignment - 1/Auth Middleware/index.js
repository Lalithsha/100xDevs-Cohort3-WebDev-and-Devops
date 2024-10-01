const express = require("express");
const jwt = require("jsonwebtoken")
const app = express();

const JWT_SECRET = "example4334"

app.use(express.json());

let users = [];

function auth(req, res, next) {
    const token = req.headers.token
    if (token != null && token.length > 0) {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).send({
                    message: "Unauthoized"
                })
            }
            else {
                req.user = decoded
                next();
            }
        })
    }
    else {
        res.status(403).send({
            message: "you are not authenticated"
        })
    }
}


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

app.get("/me", auth, function (req, res) {
    const user = req.user;
    res.send({
        username: user.username
    })

})


app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});






















