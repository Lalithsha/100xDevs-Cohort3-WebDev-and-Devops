const express = require("express");

const app = express();



let requestCounter = 0;

// Middleware
function middleware(req, res, next) {
    requestCounter = requestCounter + 1;
    console.log(req.hostname);
    next();
}

app.use(middleware); // This middleware will be executed when any route and with any HTTP method.

app.get("/sum", function (req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans: a + b
    })
});

app.get("/multiply", function (req, res) {
    const a = req.query.a;
    const b = req.query.b;
    res.json({
        ans: a * b
    })
});


app.get("/get-request-count", function (req, res) {
    res.json({
        totalServerRequestCount: requestCounter
    })
})

app.listen(3000, () => {
    console.log("Server is listening on port 3000");

});