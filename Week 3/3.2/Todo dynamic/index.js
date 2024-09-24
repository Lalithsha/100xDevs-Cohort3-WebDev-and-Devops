let todos = [];
let counter = 0;
function addTodo() {
    todos.push({
        id: counter,
        title: document.querySelector("input").value
    })
    render();
    counter += 1;
}

function deleteTodo(id) { // both the logic works for deleting a todo.
    // todos = todos.filter((element) => {
    //     return element.id != id;
    // })
    todos.splice(id, 1);
    render();
}

function render() {
    document.querySelector("#parentTodo").innerHTML = "";
    todos.forEach(element => {
        const textNode = document.createElement("div")
        const deleteNode = document.createElement("button");
        deleteNode.innerHTML = "Delete";
        textNode.innerHTML = element.title;
        textNode.setAttribute("id", counter);
        const parentElement = document.querySelector("#parentTodo");
        parentElement.appendChild(textNode);
        parentElement.appendChild(deleteNode);

        // delete logic
        deleteNode.addEventListener("click", () => {
            deleteTodo(element.id);
        })

    });
}





























