const express = require("express");

const app = express();



app.use(middleware);

function middleware(req, res, next) {
    const url = req.originalUrl;
    const methodType = req.method;
    const date = new Date();
    res.send(`The url is ${url} \n The method Type is ${methodType}\n The date is ${date}`);
}

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

app.get("/divide", function (req, res) {
    const a = req.query.a;
    const b = req.query.b;
    res.json({
        ans: a / b
    })

});

app.get("/subtract", function (req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    res.json({
        ans: a - b
    })
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");

});