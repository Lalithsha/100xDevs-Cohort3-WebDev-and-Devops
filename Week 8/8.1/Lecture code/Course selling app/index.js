// const bcrypt = require('bcryptjs');
const express = require("express");
// const { UserModel, TodoModel } = require("./db");
// const { auth, JWT_SECRET } = require("./auth");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
// const { z } = require("zod");

const { userRouter } = require("./routes/user")
const { courseRouter } = require("./routes/course")
const { adminRouter } = require("./routes/admin")

mongoose.connect("mongodb+srv://lalithsharma:test1234@cluster0.98btq.mongodb.net/Course-selling-app")

const app = express();
app.use(express.json());

app.use("/user", userRouter)
app.use("/admin", adminRouter)
app.use("/course", courseRouter)


app.listen(3000, () => {
    console.log("app is running on port 3000");
});