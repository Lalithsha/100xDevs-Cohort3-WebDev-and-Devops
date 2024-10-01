const express = require('express');
const app = express();

let users = [
    {
        name: "John",
        kidney: [
            { healthy: false },
            { healthy: true }
        ]
    }
]


/* Object.keys(users).forEach(key => {
    const value = users[key];
    console.log(`${JSON.stringify(value.kidney)}`);
}) */


app.use(express.json());

app.get("/get-user-health", function (req, res) {
    res.send(JSON.stringify(users));
});

app.post("/add-health", function (req, res) {
    const healthy = req.body.healthy;
    // console.log("health is " + JSON.stringify(healthy));
    if (healthy == true || healthy == false) {
        users[0].kidney = [...users[0].kidney, { healthy: healthy }]
    }
    else {
        res.send("Please enter a kidney");
    }
    res.send(JSON.stringify(users));
})

app.put("/update-user-health", function (req, res) {
    // res.send(JSON.stringify(users));
    let isEverythingIsTrue = true;
    users[0].kidney.map((item) => {
        if (item.healthy == false) {
            isEverythingIsTrue = false;
        }
    })
    if (isEverythingIsTrue == true) {
        return res.send({
            message: "Present kidneys are healthy.."
        })
    }
    // Getting the kidney array and then updating the first kidney as false as true
    let newUsers = users[0].kidney.map((item) => {
        if (item.healthy == false) {
            return { ...item, healthy: true }
        }
        return item;
    })
    users[0].kidney = newUsers; // Update the kidney with new kidney values
    res.send({ message: `${JSON.stringify(users)}` })
});

app.delete("/delete-user-health", function (req, res) {
    // res.send(JSON.stringify(users));
    console.log("The kidney length is :" + users[0].kidney.length);

    // Removes the last kidney from the kidney array in users
    const kidneyArrayLength = users[0].kidney.length;
    if (kidneyArrayLength > 0) {
        users[0].kidney.splice(users[0].kidney.length - 1, 1);
        res.send({
            message: "Successfully removed a kidney"
        })
    }
    else {
        res.send({
            message: "Please add a kidney and then try to delete it"
        })
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});