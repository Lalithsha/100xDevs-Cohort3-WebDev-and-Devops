function promisifiedSetTimeout(time) {
    const p = new Promise((resolve, reject) => {
        if (time > 0) {
            setTimeout(() => {
                console.log("Resolved");
                return resolve();
            }, time)
        }
        else {
            reject((e) => {
                console.log("The error is: " + e);

            })
        }
    }

    )
    return p;
}

const p = promisifiedSetTimeout(1000);
p.then((data) => {
    console.log(data);

})

function promisifiedFetch() {
    // console.log(JSON.stringify(user));
    return new Promise((resolve, reject) => {
        fetch("https://api.github.com/users/lalithsha")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    throw new Error("Error fetching Data");
                }
            })
            .then((data) => {
                console.log(data);
                return resolve(data)

            })
            .catch((err) => {
                throw new Error(err);
            })

    })


}

console.log(promisifiedFetch());

// Read file using promise
function readFile() {

    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, 'a.txt');

    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                // console.log(" You have " + data.length + " words in this file");
                return resolve(data.length)
            }
        });
    })

}
readFile().then((data) => {
    console.log(" You have " + data.length + " words in this file");

})