import express from "express";
import { middleware } from "./middleware";
const app = express();

app.use(express.json());
app.use(middleware);

app.get('/cpu', (req, res) => {

    for(let i =0; i<1000000000; i++){
        const x = Math.random();
    }
    
    res.send({
        message:"CPU intensive task completed",
    });
});


app.get('/user',(req,res)=>{
    res.send({
        message:"User data fetched successfully",
    })
})


app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})