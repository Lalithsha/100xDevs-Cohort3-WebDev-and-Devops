/* const express = require("express");
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

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/index.html")
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

        res.header("jwt", token);

        res.json({
            token: token
        })

    }

})

app.get("/me", function (req, res) {
    const token = req.body.token;
    let decodedData = null;
    try {
        jwt.verify(token, JWT_SECRET);

    } catch (error) {
        console.log(error.message);

    }

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
    else {
        // Send a response to the client that the user is not found
        return res.json({
            message: "User not found!",
        });
    }


})


app.listen(3000, () => {
    console.log("Server is listening on port 3000");
}) */

const express = require("express");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "lalith123";

const app = express();
app.use(express.json());

const users = [];

function logger(req, res, next) {
    console.log(req.method + " request came");
    next();
}

// localhost:3000
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
})

app.post("/signup", logger, function (req, res) {
    const username = req.body.username
    const password = req.body.password
    users.push({
        username: username,
        password: password
    })

    // we should check if a user with this username already exists

    res.json({
        message: "You are signed in"
    })
})

app.post("/signin", logger, function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    let foundUser = null;

    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
            foundUser = users[i]
        }
    }

    if (!foundUser) {
        res.json({
            message: "Credentials incorrect"
        })
        return
    } else {
        const token = jwt.sign({
            username
        }, JWT_SECRET);
        res.header("token", token);

        // res.header("random", "harkirat");

        res.json({
            token: token
        })
    }
})

function auth(req, res, next) {
    const token = req.headers.token;
    let decodedData = null;
    if (token === undefined || token === null) {
        res.json({
            message: "You are not logged in"
        })
    }
    console.log("token value is: " + JSON.stringify(token));


    // console.log("inside the check");
    decodedData = jwt.verify(token, JWT_SECRET);

    if (decodedData.username) {
        // req = {status, headers...., username, password, userFirstName, random; ":123123"}
        req.username = decodedData.username
        next()
    } else {
        res.json({
            message: "You are not logged in"
        })
    }
}

// Create a get request for the me route
app.get("/me", logger, auth, function (req, res) {
    // Get the current user from the request object
    const currentUser = req.username;

    // Find the user in the users array with the given username
    const foundUser = users.find((user) => user.username === currentUser);

    // Check if the user is found or not
    if (foundUser) {
        // Send a response to the client with the username and password of the user
        return res.json({
            username: foundUser.username,
            password: foundUser.password,
        });
    } else {
        // Send a response to the client that the user is not found
        return res.json({
            message: "User not found!",
        });
    }
});


app.listen(3000);






















