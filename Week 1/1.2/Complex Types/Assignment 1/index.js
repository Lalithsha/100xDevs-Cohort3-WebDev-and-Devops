/* function index() {
    const user = prompt("Enter your name: ");
    console.log(`hello yourname is: ${user}`);
}

index();
 */


// Take input in node js environment : readline module,
/* const readline = require('readline');
const r1 = readline.createInterface({ input: process.stdin, output: process.stdout });

// Ask the user for their name
rl.question('Enter your name: ', (name) => {
    console.log(`Hello, ${name}!`);
    // You can add more code here if needed
    rl.close(); // Close the interface
}); */


function greet(user) {
    if (user.gender === 'M' && user.age >= 18) {
        console.log("Hi Mr " + user.name + " your age is " + user.age);

    }
    else if (user.gender === "F" && user.age >= 18) {
        console.log("Hi Mrs " + user.name + " your age is " + user.age);
    }
    else {
        console.log("😑");

    }
}

let user = {
    name: "Lalith",
    age: 22,
    gender: 'M'
}

// greet(user);

function temp(newUser) {

    /* newUser.forEach((user) => {
        if (user.age > 18) {
            console.log("Name of the user is " + user.name + " and " + user.gender);
        }
    }); */

    const adults = newUser.filter((user) => user.age >= 18)
    // console.log(newUser);

    adults.forEach(user => {
        console.log("Name of the user is " + user.name + " and " + user.gender);
    });
}


let newUser = [
    /* "hello",
    {
        myName: "Lalith",
        address: ["street", "city", "state"]
    } */
    {
        name: "John",
        age: 18,
        gender: 'M'
    },
    {
        name: "find",
        age: 4,
        gender: 'F'
    },
    {
        name: "contact",
        age: 53,
        gender: 'F'
    },
    ["first", "second", "third"]
]


temp(newUser);








