const { Router } = require("express");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const { userModel } = require("../db");
const userRouter = Router();
const bcrypt = require('bcryptjs');
import { JWT_USER_PASSWORD } from "../config"

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


userRouter.get("/purchases", async function (req, res) {
    res.json({
        message: "purchased course endpoint"
    })
});

module.exports = {
    userRouter
}

































