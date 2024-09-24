
const express = require('express')
const app = express()

app.use(express.json());

let users = {

    1: {
        todos: ['Buy groceries', 'Complete project']
    },
    2: {
        todos: ['Exercise', 'Learn JavaScript']
    }

}

app.get('/', function (req, res) {
    res.send(JSON.stringify(users));
})

app.post('/add-todo', (req, res) => {
    /* res.json({requestBody: req.body})  // <==== req.body will be a parsed JSON object */

    console.log(req.body);
    console.log("The strigify string is " + JSON.stringify(req.body));

    const todo = req.body.todo;
    const { id } = req.body;
    console.log("id is " + id);
    console.log("todo is " + todo);

    const newTodo = {
        id: {
            todo: [todo]
        }
    }


    // Checking if the users already exists or not.
    if (users[id]) {
        users[id].todos.push(todo);
    }
    // If the user does not exist then create the user and add it to the users object.
    else {

        // Object.assign(users, newTodo[0]); // Another way to do this -> this line of code is wrong but the approach is correct.

        // Using spread operator to add new property
        users = {
            ...users,
            [id]: { todos: [todo] }
            // [newTodo.id]: { todos: newTodo.todo }
        };

        // users[newTodo.id] = { todos: newTodo.todo }

    }


    // Object.keys(users).forEach(id => {
    //     console.log("Id from loop is " + id);

    //     // Access todos array for each user
    //     users[id].todos.forEach(todo => {
    //         console.log("Todo from loop is" + todo);
    //     });
    // });

    // for (let id in users) {
    //     console.log("Id is " + id); // Prints the key (e.g., 1, 2)

    //     // Access the todos array for each user
    //     for (let j = 0; j < users[id].todos.length; j++) {
    //         console.log(users[id].todos[j]); // Prints each todo
    //     }
    // }

    // return res.send(JSON.parse(users) + "\n" + "Data added successfully");
    return res.send("Data added successfully" + "\n" + JSON.stringify(users));

});

app.put('/update-todo', function (req, res) {
    // res.send({ todos })
    const { id, todo } = req.body;

    if (users[id]) {
        users[id].todos = users[id].todos.map((currTodo, index) => {
            if (index == 0) {
                return todo;
            }
            return currTodo;
        })
        res.send("Data added successfully" + "\n" + JSON.stringify(users))
    }
    else {
        res.status(404).send("User with id not found");
    }
})

app.delete('/delete-todo', function (req, res) {
    const { id, todo } = req.body;
    // todos.splice(id, 1);
    // console.log(`Todo deleted successfully`);
    // return res.send(todos);
    if (users[id]) {
        const index = users[id].todos.indexOf(todo);
        if (index !== -1) {
            users[id].todos.splice(index, 1);
            res.send(`Todo "${todo}" deleted successfully\n` + JSON.stringify(users, null, 2));
        }
        else {
            // If the todo is not found in the array
            res.status(404).send(`Todo "${todo}" not found for user ID ${id}`);
        }
    }
    else {
        res.status(404).send("User with id not found");
    }
})

app.listen(3000, () => {
    console.log("Server is listening on port 3000");

})

