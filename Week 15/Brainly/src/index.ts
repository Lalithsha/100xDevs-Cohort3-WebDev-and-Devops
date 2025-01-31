import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const app = express();

app.post("/api/v1/signup",(req,res)=>{
    
})
app.post("/api/v1/signin",(req,res)=>{

})
app.post("/api/v1/content",(req,res)=>{

})
app.delete("/api/v1/delete",(req,res)=>{

})

app.post("/api/v1/brain/share",(req,res)=>{

})

app.get("/api/v1/brain/:shareLink",(req,res)=>{

})


async function main() {
    // await mongoose.connect("mongodb+srv://lalithsharma:test1234@cluster0.98btq.mongodb.net/Course-selling-app")
    await mongoose.connect(`${process.env.MONGODB_URI}`)
    console.log(process.env.MONGODB_URI)
    app.listen(3000, () => {
        console.log("app is running on port 3000");
    });
    console.log("Connected to database");
}


main();





