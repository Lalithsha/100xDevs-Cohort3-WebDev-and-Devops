import mongoose from "mongoose";
import dotenv from "dotenv";
import 'dotenv/config';
import express from "express";
import cookieParser from "cookie-parser";
import { userRouter } from "./routes/user";

const app= express();
app.use(express.json());
app.use(cookieParser());

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

app.use("/api/v1/user",userRouter)



connectDB().catch(err => console.log(err));

