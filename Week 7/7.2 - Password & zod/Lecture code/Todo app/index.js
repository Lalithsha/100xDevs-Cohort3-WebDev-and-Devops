const bcrypt = require('bcryptjs');
const express = require("express");
const { UserModel, TodoModel } = require("./db");
const { auth, JWT_SECRET } = require("./auth");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { z } = require("zod");

mongoose.connect("mongodb+srv://lalithsharma:test1234@cluster0.98btq.mongodb.net/Todo")

const app = express();
app.use(express.json());

app.post("/signup", async function (req, res) {

    const requiredBody = z.object({
        email: z.string(),
        password: z.string(),
        name: z.string()
    })

    const parsedDataWithSuccess = requiredBody.safeParse(req.body);

    if (!parsedDataWithSuccess) {
        res.json({
            message: "Incorrect format"
        })
        return;
    }

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    let errorThrown = false;

    try {
        const hashedPassword = await bcrypt.hash(password, 4);
        console.log(hashedPassword)

        await UserModel.create({
            email: email,
            password: hashedPassword,
            name: name
        });
    } catch (error) {
        res.json({
            message: "User already exists"
        })
        errorThrown = true;
    }
    if (errorThrown) {
        res.json({
            message: "You are signed up"
        })
    }
});


app.post("/signin", async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const response = await UserModel.findOne({
        email: email
    });

    if (!response) {
        res.status(403).json({
            message: "User id does not found in db"
        })
    }

    const passwordMatch = await bcrypt.compare(password, response.password);
    console.log(passwordMatch);


    if (passwordMatch) {
        const token = jwt.sign({
            id: response._id.toString()
        }, JWT_SECRET);

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
});


app.post("/todo", auth, async function (req, res) {
    const userId = req.userId;
    const title = req.body.title;
    const done = req.body.done;

    await TodoModel.create({
        userId,
        title,
        done
    });

    res.json({
        message: "Todo created"
    })
});


app.get("/todos", auth, async function (req, res) {
    const userId = req.userId;

    const todos = await TodoModel.find({
        userId
    });

    res.json({
        todos
    })
});

app.listen(3000, () => {
    console.log("app is running on port 3000");

});