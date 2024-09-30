const express = require('express');
const app = express();

const users = [
    {
        name: "John",
        kidney: [
            { healthy: false },
            { healthy: true }
        ]
    }
]

for (let key in users) {

}

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
    // console.log(JSON.stringify(healthy.length));
    users[0].kidney = [...users[0].kidney, { healthy: healthy }]
    res.send(JSON.stringify(users));
})

app.put("/get-user-health", function (req, res) {
    res.send(JSON.stringify(users));
});

app.delete("/get-user-health", function (req, res) {
    res.send(JSON.stringify(users));
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});