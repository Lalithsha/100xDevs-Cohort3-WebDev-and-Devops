// Increase the counter in each second => stop watch in each second

let counter = 0;
function callBack() {
    console.log("counter: " + counter);
    document.querySelectorAll("h3")[1].innerHTML = counter;
    counter += 1;
}

function increaseBySecond() {

    setInterval(callBack, 1000);
    // // const heading = document.getElementById('heading');
    // // console.log(heading);
    // const heading = document.querySelector("heading")
    // // heading.innerHTML(heading);
    // heading.innerHTML = counter;
}

increaseBySecond();

