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
        email: z.string().min(7, { message: 'Must have at least 7 character' }).email(),
        password: z.string().min(5).max(50).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/),
        name: z.string().min(3).max(75)
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

    console.log(`the response looks like this ${response}`)
    const passwordMatch = await bcrypt.compare(password, response.password);
    console.log(passwordMatch);


    if (passwordMatch) {
        const token = jwt.sign({
            id: response._id.toString()
        }, JWT_SECRET);
        console.log(`The signed token is: ${token}`)
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
    const createdAt = new Date();

    await TodoModel.create({
        userId,
        title,
        done,
        createdAt
    });

    res.json({
        message: "Todo created"
    })
});

// Get all the todos
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

app.post("/markAsDone", auth, async function (req, res) {
    const userId = req.userId;
    const id = { userId };
    console.log(id);
    console.log(userId);
    try {
        const result = await TodoModel.findOneAndUpdate(id,
            { done: true }

        )

        res.json({
            result
        });
    } catch (e) {
        console.log(e.message)
    }
})

app.delete("/delete", auth, async function (req, res) {
    const userId = req.userId;

    try {
        const result = await TodoModel.deleteOne({ userId })
        console.log(result);
        if (!result) {
            res.status(404).json({
                message: "failed to delete"
            })
        }
        else {
            res.json({
                message: "successfully deleted"
            })
        }
    } catch (error) {
        console.log(error.message);
    }

})


















