// import 'dotenv/config'
// const bcrypt = require('bcryptjs');
const express = require("express");
// const { UserModel, TodoModel } = require("./db");
// const { auth, JWT_SECRET } = require("./auth");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
// const { z } = require("zod");
const cookieParser = require("cookie-parser");
const { userRouter } = require("./routes/user")
const { courseRouter } = require("./routes/course")
const { adminRouter } = require("./routes/admin")

require('dotenv').config()


const app = express();
app.use(express.json());


app.use(cookieParser());

app.use("/api/v1/user", userRouter)
app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/course", courseRouter)

async function main() {
    // await mongoose.connect("mongodb+srv://lalithsharma:test1234@cluster0.98btq.mongodb.net/Course-selling-app")
    await mongoose.connect(`${process.env.MONGODB_URI}`)
    console.log(process.env.MONGODB_URI)
    app.listen(3000, () => {
        console.log("app is running on port 3000");
    });
    console.log("Connected to database");
}


main();
