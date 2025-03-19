// console.log("Hello world");

import mongoose from "mongoose";
import dotenv from "dotenv";
import 'dotenv/config';
import express from "express";

const app= express();
app.use(express.json());

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

