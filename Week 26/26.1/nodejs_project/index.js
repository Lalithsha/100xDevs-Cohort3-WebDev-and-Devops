import express from "express"

const app = express();

app.get("/", (req, res) => {
	res.send("Hellow world")
})

app.listen(3000, () => {
	console.log("Project running on port 3000");
})	
