async function getRecentPost() {
    console.log("Before sending data");
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    const data = await response.json();
    console.log(data);
    console.log("Request has been processed");
    document.getElementById("posts").innerHTML = data.body;
}

async function getRecentPostUsingAxios() {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts/1");
    document.getElementById("posts").innerHTML = response.data.body;
    console.log("Response added successfully using axios");
}


// getRecentPost();
getRecentPostUsingAxios();