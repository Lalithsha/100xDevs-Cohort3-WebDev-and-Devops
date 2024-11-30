const { Router } = require("express");

const userRouter = Router();

// End point to sign up
userRouter.post("/signup", async function (req, res) {
    res.json({
        message: "signup endpoint"
    })
});


// End point to sign in for course selling app
userRouter.post("/signin", async function (req, res) {
    res.json({
        message: "signin endpoint"
    })
});


userRouter.get("/purchases", async function (req, res) {
    res.json({
        message: "purchased course endpoint"
    })
});

module.export = {
    userRouter
}


































