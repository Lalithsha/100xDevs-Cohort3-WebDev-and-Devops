const express = require("express");
const { Router } = require("express");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const { userModel } = require("../db");
const userRouter = Router();
const bcrypt = require('bcryptjs');
// import { JWT_USER_PASSWORD } from "../config"
const { JWT_USER_PASSWORD } = require("../config");
const { userMiddleware, userMiddlewareWithCookie } = require("../middleware/user.middleware");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
// const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD;
// End point to sign up
userRouter.post("/signup", async function (req, res) {

    const requiredBody = z.object({
        email: z.string().min(7, { message: 'Must have at least 7 character' }).email(),
        password: z.string().min(5).max(50).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/),
        firstName: z.string().min(3).max(75),
        lastName: z.string().min(3).max(75)
    })


    const parsedDataWithSuccess = requiredBody.safeParse(req.body);
    console.log(`The parsed data is:  ${JSON.stringify(parsedDataWithSuccess)}`);

    if (!parsedDataWithSuccess.success) {
        res.json({
            message: "Incorrect format",
            error: parsedDataWithSuccess.error
        })
        return;
    }

    const { email, password, firstName, lastName } = req.body;

    try {

        const hashedPassword = await bcrypt.hash(password, 3);

        userModel.create({
            email,
            password: hashedPassword,
            firstName,
            lastName
        })

        res.json({
            message: "Sign up successfull"
        })

    } catch (error) {
        res.json({
            message: "User already exists"
        })
    }

});


// End point to sign in for course selling app
userRouter.post("/signin", async function (req, res) {

    const { email, password } = req.body;

    try {

        const user = await userModel.findOne({
            email
        })
        console.log(`The User looks like this ${user}`);

        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log("Password match is ", passwordMatch);



        if (passwordMatch) {
            const token = jwt.sign({
                id: user._id.toString()
            }, JWT_USER_PASSWORD)
            console.log(`The signed token is: ${token}`)
            // TODO: Do cookie logic
            res.json({
                message: "Login successfull",
                token
            })

        }
        else {
            // TODO: Do cookie logic
            res.status(403).json({
                message: "Incorrect email or password",
            })
        }



    } catch (error) {
        res.json({
            message: "Login failed"
        })
    }

});


userRouter.post("/login", async function (req, res) {

    const { email, password } = req.body;

    try {

        const user = await userModel.findOne({
            email
        })
        console.log(`The User looks like this ${user}`);

        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log("Password match is ", passwordMatch);



        if (passwordMatch) {
            console.log("Inside the password match")
            // console.log(process.env.JWT_USER_PASSWORD)
            const token = jwt.sign({
                id: user._id.toString()
            }, "dd82nd")
            console.log(`The signed token is: ${token}`)


            return res.cookie("access_token", token, {
                httpOnly: true,
                secure: true
                // secure: process.env.NODE_ENV === "production",
            }).status(200).json({
                message: "Logged in successfully"
            })

        }
        else {
            // TODO: Do cookie logic
            res.status(403).json({
                message: "Incorrect email or password",
            })
        }



    } catch (error) {
        res.json({
            message: "Login failed"
        })
    }

})


userRouter.get("/purchases", userMiddlewareWithCookie, async function (req, res) {

    const userId = req.userId;

    const purchases = await userModel.find({
        userId
    })

    res.json({
        message: "purchased course endpoint",
        purchases
    })
});


userRouter.get("/logout", userMiddlewareWithCookie, (req, res) => {
    return res.clearCookie("access_token").status(200).json({
        message: "successfully logged out"
    })
})


module.exports = {
    userRouter
}

































