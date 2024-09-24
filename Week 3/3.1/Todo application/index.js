let control = 1;
function addTodo() {
    console.log("button is pressed");

    // First getting the value from the input text
    const value = document.querySelector("input").value
    // Deciding what element we need to insert
    const textNode = document.createElement("li");

    textNode.setAttribute("id", control);
    control++;

    // appending value to the element
    textNode.innerHTML = value;
    // finally getting the parent element to insert the h3 which is having the value. 
    const parentElement = document.querySelector("#todoParent");
    parentElement.appendChild(textNode);
}


function deleteTodo(index) {
    const item = document.querySelector('li');
    item.parentNode.removeChild(item);
    // item.innerHTML = "";
}

function editTodo() {
    const firstTodo = document.querySelector('li');
    firstTodo.innerHTML = "updated data";
}