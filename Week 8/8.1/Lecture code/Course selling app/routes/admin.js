const { Router } = require("express");
const adminRouter = Router();
const { z } = require("zod");
const bcrypt = require('bcryptjs');
const { adminModel, courseModel } = require("../db")
const jwt = require("jsonwebtoken");
import { JWT_ADMIN_PASSWORD } from "../config"
import { adminMiddleware } from "../middleware/admin.middleware";

adminRouter.post("/signup", async function (req, res) {

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

        adminModel.create({
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
            message: "admin already exists"
        })
    }

});


// End point to sign in for course selling app
adminRouter.post("/signin", async function (req, res) {
    const { email, password } = req.body;

    try {

        const admin = await adminModel.findOne({
            email
        })
        console.log(`The admin looks like this ${admin}`);

        const passwordMatch = await bcrypt.compare(password, admin.password);
        console.log("Password match is ", passwordMatch);



        if (passwordMatch) {
            const token = jwt.sign({
                id: admin._id.toString()
            }, JWT_ADMIN_PASSWORD)
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

// End point to sign in for course selling app
adminRouter.post("/course", adminMiddleware, async function (req, res) {
    const adminId = req.userId;

    const { title, description, imageUrl, price } = req.body;

    const course = await courseModel.create({
        title,
        description,
        imageUrl,
        price,
        creatorId: adminId
    })

});

// End point update a title, description, imageUrl, price of a course.
adminRouter.put("/course", adminMiddleware, async function (req, res) {
    const adminId = req.userId;

    const { title, description, imageUrl, price, courseId } = req.body;

    const course = await courseModel.updateOne({
        // finds the course based on id based and only updates the value where createrId is himself (admin). cannot update any one admin's course
        _id: courseId,
        createrId: adminId
    }, {
        title,
        description,
        imageUrl,
        price
    })

    res.json({
        message: "course updated successfully",
        courseId: course._id
    })

});

// End point to sign in for course selling app
adminRouter.post("/course/bulk", async function (req, res) {
    res.json({
        message: "signin endpoint"
    })
});


module.exports = {
    adminRouter
}























