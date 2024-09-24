const express = require('express')
const app = express()

const todo = [];

app.get('/', function (req, res) {
    res.send('Hello World')
})
app.listen(3000)