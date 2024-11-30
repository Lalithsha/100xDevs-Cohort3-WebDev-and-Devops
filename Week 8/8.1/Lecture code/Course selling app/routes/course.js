const { Router } = require("express")

const courseRouter = Router();

app.get("/purchase", async function (req, res) {
    res.json({
        message: "purchase courses endpoint"
    })
});

app.get("/preview", async function (req, res) {
    res.json({
        message: "All courses endpoint"
    })
});



module.export = {
    courseRouter
}








































