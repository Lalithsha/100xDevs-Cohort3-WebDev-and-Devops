const fs = require('fs');
const path = require('path');
const express = require('express')
const app = express()

app.use(express.json());
const filePath = path.join(__dirname, 'todos.json');

let users = {
    1: {
        todos: []
    },
    2: {
        todos: []
    }
}

app.post('/add-todo', (req, res) => {
    /* res.json({requestBody: req.body})  // <==== req.body will be a parsed JSON object */
    // todo.push(req.body);

    console.log(req.body);
    console.log("The strigify string is " + JSON.stringify(req.body));

    const todo = req.body.todo;
    const { id } = req.body;
    console.log("id is " + id);
    console.log("todo is " + todo);

    /*  if (!id) {
         res.send("Id cannot be empty")
     } */

    if (todo.length <= 3) {
        res.send("Todo is invalid/empty");
    }


    if (err || jsonData.length == 0 || jsonData == "" || jsonData === "") {

        const newTodo = [
            {
                "id": 1,
                "todo": todo,
                "done": false
            }
        ];
        fs.writeFile(filePath, JSON.stringify(newTodo), (err) => {
            if (err) throw err;
            console.log("New data added successfully");
        });

    } else {
        const todos = JSON.parse(jsonData);

        const newId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
        console.log("New id is : " + newId);

        const newTodo = {
            "id": newId,
            "todo": todo,
            "done": false
        }
        todos.push(newTodo)

        fs.writeFile(filePath, JSON.stringify(todos), (err) => {
            if (err) throw err;
            console.log("New data added successfully");
        });

    }
    return res.send("Added successfully")

});
