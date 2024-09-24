const fs = require('fs');
const path = require('path');
const express = require('express')
const app = express()

app.use(express.json());
const filePath = path.join(__dirname, 'todos.json');

app.get('/', function (req, res) {
    fs.readFile(filePath, 'utf8', (err, jsonData) => {
        res.send(JSON.parse(jsonData))
    });

})

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

    fs.readFile(filePath, 'utf8', (err, jsonData) => {
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
})

app.put('/update-todo', function (req, res) {
    // res.send({ todos })
    const { id, todo } = req.body;
    /* const newTodo = todos.map((item) => {
        if (item.id == id) {
            return { ...item, todo: todo };
        }
        return item;
    }) */

    fs.readFile(filePath, 'utf8', (err, jsonData) => {
        const todos = JSON.parse(jsonData);
        const newTodo = todos.map((item) => {
            if (item.id == id) {
                return { ...item, todo: todo };
            }
            return item;
        })
        console.log(newTodo);

        fs.writeFile(filePath, JSON.stringify(newTodo), (err) => {
            if (err) throw err;
            console.log("New data added successfully");
        });
    });

    // todos = newTodo;
    return res.send("Updated the todo");
})

app.delete('/delete-todo', function (req, res) {
    const { id } = req.body;

    fs.readFile(filePath, 'utf8', (err, jsonData) => {
        const todos = JSON.parse(jsonData);
        todos.splice(id, 1);
        console.log(`Todo deleted successfully`);
        fs.writeFile(filePath, JSON.stringify(todos), (err) => {
            if (err) throw err;
            console.log("New data added successfully");
        });
    });
    return res.send("Deleted todo");

})


app.listen(3000, () => {
    console.log("Server is listening on port 3000");

})





































































