const express = require("express");

const app = express();

app.get("/sum", function (req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    const ans = a + b;
    // res.send(ans.toString());
});

app.get("/multiply", function (req, res) {
    const a = req.query.a;
    const b = req.query.b;
    const ans = a * b;
    res.json(ans.toString());
});

app.get("/divide", function (req, res) {

    const a = req.query.a;
    const b = req.query.b;
    const ans = a / b;
    res.send(
        { ans: ans }
    );
});

app.get("/subtract", function (req, res) {
    const a = req.query.a;
    const b = req.query.b;
    res.send(
        {
            ans: a - b
        }
    )
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");

});