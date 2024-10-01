// Create HTTP route using express

const express = require('express')
const app = express()

let todos = [];

// Data inside todos looks like:
/* const newTodo = {
    todo: "todo",
    id: id
} */

app.use(express.json());

app.get('/', function (req, res) {
    res.send(todos)
    // for (let i = 0; i < todos.length; i++) {
    //     res.send(todos[i]);
    // }
})

app.post('/add-todo', (req, res) => {
    /* res.json({
        requestBody: req.body
    })  // <==== req.body will be a parsed JSON object */
    // todo.push(req.body);
    console.log(req.body);
    console.log("The strigify string is " + JSON.stringify(req.body));

    const todo = req.body.todo;
    const { id } = req.body;
    console.log("id is " + id);
    console.log("todo is " + todo);

    // const ans = JSON.stringify(result);
    // console.log("Stringfy string is " + ans);

    if (!id) {
        res.send("Id cannot be empty")
    }

    if (todo.length <= 3) {
        res.send("Todo is invalid/empty");
    }

    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id == id) {
            res.send("Todo with same id exits, Please enter a new id");
        }
    }


    const newTodo = {
        todo: "todo",
        id: id
    }

    todos.push(newTodo);
    res.send("Added successfully")
    // todos.forEach((item) => {
    //     console.log(`From the array: ${item} `);

    // })
})

app.put('/update-todo', function (req, res) {
    // res.send({ todos })
    const { id, todo } = req.body;
    const newTodo = todos.map((item) => {
        if (item.id == id) {
            return { ...item, todo: todo };
        }
        return item;
    })

    todos = newTodo;
    return res.send(todos);
})

app.delete('/delete-todo', function (req, res) {
    const { id } = req.body;
    todos.splice(id, 1);
    console.log(`Todo deleted successfully`);
    return res.send(todos);
})

// function generateRandomId() {
//     return Math.floor(Math.random() * 1000000);
// }



app.listen(3000, () => {
    console.log("Server is listening on port 3000");

})



