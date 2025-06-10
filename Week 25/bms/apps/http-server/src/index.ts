import express, { Request, Response } from "express";
import {client} from "@repo/db/client";

const app = express();
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("Hello world");
})

app.post("/signup", async (req:Request, res:Response):Promise<any>=>{
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).send("Username and password are required");
    }

    try {
        const user = await client.user.create({
            data: {
                username,
                password, // In a real application, make sure to hash the password
            },
        });
        res.status(201).json({
            message:"Sign up successful", 
            user: {
                id: user.id,
                username: user.username,
            },
        });
        return;
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Internal Server Error");
        return;
    }
    
    
})

app.listen(3002,()=>{
    console.log("Server is running on port 3002")
})
