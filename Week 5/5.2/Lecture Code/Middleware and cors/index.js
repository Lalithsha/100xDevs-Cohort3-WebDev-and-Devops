const express = require("express");

const app = express();

let requestCount = 0;

function requestIncreser() {
    requestCount = requestCount + 1;
    console.log("Total number of request = " + requestCount);

}

app.get("/sum", function (req, res) {
    requestIncreser();
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans: a + b
    })
});

app.get("/multiply", function (req, res) {
    requestIncreser();
    const a = req.query.a;
    const b = req.query.b;
    res.json({
        ans: a * b
    })
});



app.listen(3000);