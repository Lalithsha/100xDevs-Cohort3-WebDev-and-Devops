// const bcrypt = require('bcryptjs');
const express = require("express");
// const { UserModel, TodoModel } = require("./db");
// const { auth, JWT_SECRET } = require("./auth");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
// const { z } = require("zod");

mongoose.connect("mongodb+srv://lalithsharma:test1234@cluster0.98btq.mongodb.net/Course-selling-app")

const app = express();
app.use(express.json());

app.post("/user/signup", async function (req, res) {
    res.json({
        message: "signup endpoint"
    })
});


app.post("/user/signin", async function (req, res) {
    res.json({
        message: "signin endpoint"
    })
});


app.get("/user/purchases", async function (req, res) {
    res.json({
        message: "purchased course endpoint"
    })
});


app.get("/course/purchase", async function (req, res) {
    res.json({
        message: "purchase courses endpoint"
    })
});

app.get("/courses", async function (req, res) {
    res.json({
        message: "All courses endpoint"
    })
});

app.listen(3000, () => {
    console.log("app is running on port 3000");

});