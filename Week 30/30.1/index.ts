import express from 'express';

const app = express();

app.get("/", (req,res)=>{
    res.send("Hello world from Bun!");
})


app.get("/cpu", (req, res) => {
	for (let i = 0; i < 100000000; i++) {
		Math.random();
	}
	res.send("Hello world");
});

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})

