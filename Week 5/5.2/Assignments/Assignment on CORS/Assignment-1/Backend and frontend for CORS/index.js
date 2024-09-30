const express = require("express")
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors()); // It allows background request from all the frontend hitting the /sum route.

app.post("/sum", function (req, res) {
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);

    res.json({
        answer: a + b
    })
})

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
})






















