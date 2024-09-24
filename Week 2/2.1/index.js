// Async JS

function sum(n) {
    let ans = 0;
    for (let i = 0; i < n; i++) {
        ans += i;
    }
    return ans;
}

// sum(5);
console.log(sum(5));

const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(console.log("Something"))
    }, 1000);
    return;
})

console.log(p);

// const promise = new Promise((resolve, reject) => {
//     const result = fetch("http://api.github.com/users/lalithsha");

//     if (result) {
//         resolve(result)
//     }
//     else {
//         reject((e) => {
//             console.log(e);
//         })
//     }
//     console.log(result)
// })

// console.log(promise);

// const promise = new Promise((resolve, reject) => {
//     fetch("http://api.github.com/users/lalithsha")
//         .then((response) => {
//             if (!response.ok) {
//                 reject(response.status);
//             }
//             return response.json();
//         })
//         .then((data) => {
//             resolve(data);
//         })
//         .catch((error) => {
//             console.error(error);
//             reject(error);
//         })
// })

// console.log(promise);

const promise = new Promise((resolve, reject) => {
    fetch("http://api.github.com/users/lalithsha")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            return response.json(); // Parse the response body as JSON
        })
        .then((data) => {
            resolve(data); // Resolve with the parsed data
        })
        .catch((error) => {
            console.error(error.message); // Handle any errors
            reject(error); // Reject the promise
        });
});
// console.log(promise);d

promise
    .then((userData) => {
        console.log("User data:", userData);
    })
    .catch((error) => {
        console.error("Error fetching user data:", error);
    });

