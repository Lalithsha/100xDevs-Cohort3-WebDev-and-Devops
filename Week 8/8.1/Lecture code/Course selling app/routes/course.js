const { Router } = require("express")

const courseRouter = Router();

courseRouter.get("/purchase", async function (req, res) {
    res.json({
        message: "purchase courses endpoint"
    })
});

courseRouter.get("/preview", async function (req, res) {
    res.json({
        message: "All courses endpoint"
    })
});



module.exports = {
    courseRouter
}








































