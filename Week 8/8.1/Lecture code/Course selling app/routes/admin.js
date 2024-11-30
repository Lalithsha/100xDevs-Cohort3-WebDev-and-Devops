const { Router } = require("express");
const adminRouter = Router();

adminRouter.post("/signup", async function (req, res) {
    res.json({
        message: "signup endpoint"
    })
});


// End point to sign in for course selling app
adminRouter.post("/signin", async function (req, res) {
    res.json({
        message: "signin endpoint"
    })
});

// End point to sign in for course selling app
adminRouter.post("/course", async function (req, res) {
    res.json({
        message: "signin endpoint"
    })
});

// End point to sign in for course selling app
adminRouter.put("/course", async function (req, res) {
    res.json({
        message: "signin endpoint"
    })
});

// End point to sign in for course selling app
adminRouter.post("/course/bulk", async function (req, res) {
    res.json({
        message: "signin endpoint"
    })
});


module.export = {
    adminRouter
}























