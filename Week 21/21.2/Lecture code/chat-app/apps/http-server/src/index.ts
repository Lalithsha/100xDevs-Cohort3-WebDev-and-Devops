import express, { Request, Response } from "express";

const app = express();

app.use(express.json());

app.get("/signup",(req: Request,res: Response)=>{
    res.send("")
})
app.get("/signin",(req: Request,res: Response)=>{
    res.send("")
})
app.get("/chat",(req: Request,res: Response)=>{
    res.send("")
})


app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})


