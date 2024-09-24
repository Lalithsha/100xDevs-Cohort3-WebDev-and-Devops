/* 
node index.js add <todo> -> eg: node index.js add go-to-gym
node index.js delete <todo> -> eg: node index.js delete go-to-gym
node index.js mark <todo, boolean> -> eg: node index.js delete go-to-gym true
*/

const fs = require('fs');
const path = require('path');
const { Command } = require('commander');
const program = new Command();
let counter = 0;

function main() {

    program
        .name('Todo with CLI')
        .description('Add, delete, mark as done to todos using CLI ')


    program.command('add')
        .description('Add a todo into file ')
        .argument('<String>', 'text to be added')
        .action((data) => {

            const filePath = path.join(__dirname, 'todos.json');

            fs.readFile(filePath, 'utf8', (err, jsonData) => {
                if (err) {

                    const newTodo = [
                        {
                            "id": 1,
                            "todo": data,
                            "done": false
                        }
                    ];
                    fs.writeFile(filePath, JSON.stringify(newTodo), (err) => {
                        if (err) throw err;
                        console.log("New data added successfully");
                    });

                } else {

                    const todos = JSON.parse(jsonData);
                    console.log(todos);

                    const newId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
                    console.log("New id is : " + newId);

                    const newTodo = {
                        "id": newId,
                        "todo": data,
                        "done": false
                    }
                    todos.push(newTodo);
                    fs.writeFile(filePath, JSON.stringify(todos), (err) => {
                        if (err) throw err;
                        console.log("New data added successfully");
                    });

                }

            });
        });

    program.command('delete')
        .description('Delete a todo into file ')
        .argument('<String>', 'text to be deleted')
        .action((data) => {
            const filePath = path.join(__dirname, 'todos.json');

            fs.readFile(filePath, 'utf8', (err, jsonData) => {
                console.log("json data length is " + jsonData.length);

                jsonData = JSON.parse(jsonData);

                for (let i = 0; i < jsonData.length; i++) {
                    if (jsonData[i].todo == data) {
                        const result = jsonData.splice(i, 1);
                        console.log(result[i]);

                        fs.writeFile(filePath, JSON.stringify(jsonData), (err) => {
                            if (err) throw err;
                            console.log("New data added successfully");
                        });
                    }
                }
            });
        });

    program.command('mark')
        .description('Mark a todo as done ')
        .argument('<String>', 'text to be marked as done')
        .argument('<boolean>', 'Mark true or false')
        .action((todo, value) => {
            const filePath = path.join(__dirname, 'todos.json');

            fs.readFile(filePath, 'utf8', (err, jsonData) => {
                jsonData = JSON.parse(jsonData);
                for (let i = 0; i < jsonData.length; i++) {
                    if (jsonData[i].todo == todo) {
                        jsonData[i].done = value;
                    }
                }
                fs.writeFile(filePath, JSON.stringify(jsonData), (err) => {
                    if (err) throw err;
                    console.log(`Todo marked as ${value}`);
                });
            });
        });

    program.parse();

}



function appendDataToFile(data) {

    const date = getDate();

    fs.appendFile('todos.json', data + "\n", (err) => {

        // In case of a error throw err.
        if (err) throw err
        else {
            console.log(`${data} added sccessfully`);
        }
    })

}


main();