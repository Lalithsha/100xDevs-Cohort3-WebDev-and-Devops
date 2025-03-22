import mongoose from "mongoose";
import dotenv from "dotenv";
import 'dotenv/config';
import express from "express";
import cookieParser from "cookie-parser";
// import { userRouter } from "./routes/user";
import {mainRouter} from "./routes/index"
// var cors = require('cors')
import cors from "cors";

const app= express();
app.use(express.json());
app.use(cookieParser());

// Cors from localhost
let corsOption = {
    origin:['http//localhost:5173']
}

app.use(cors(corsOption))

const result =  dotenv.config();
if(result.error){
    console.log(result.error);
}

console.log("Environment variables loaded", result.parsed);

async function connectDB(){
    console.log(process.env.MONGODB_URI)
    await mongoose.connect(process.env.MONGODB_URI||"").then(()=>{
        console.log("Connected to mongoDB")
    });
}

connectDB().catch(err => console.log(err));
// app.use("/api/v1/user", userRouter)
app.use("/api/v1/", mainRouter)
app.listen(3000,()=>{
    console.log("Server is listening on port 3000");
})



