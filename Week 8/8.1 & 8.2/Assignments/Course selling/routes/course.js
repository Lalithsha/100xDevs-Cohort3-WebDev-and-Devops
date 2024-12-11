const { Router } = require("express");
const { userMiddleware } = require("../middleware/user.middleware");
const { purchasesModel, courseModel } = require("../db");

const courseRouter = Router();

courseRouter.get("/purchase", userMiddleware, async function (req, res) {

    const userId = req.userId;
    const courseId = req.courseId;

    // Should check that the user has actually paid the price.
    await purchasesModel.create({
        userId,
        courseId
    })

    res.json({
        message: "You have successfully purchased the course"
    })
});

courseRouter.get("/preview", async function (req, res) {

    const courses = await courseModel.find({})

    res.json({
        message: "Here are all the courses",
        courses
    })
});



module.exports = {
    courseRouter
}








































