import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { userModel, contentModel, tagModel, linkModel } from "./db";
// import bcrypt from 'bcryptjs';
import bcrypt,{hash, compare} from 'bcryptjs';
const app = express();

app.post("/api/v1/signup", async(req,res)=>{
  const { username, password } = req.body;
  
  try{
     const hashPassword = await bcrypt.hash(password,3);
     userModel.create(
       username,
       hashPassword
    );  

    res.json({
        message:"Sign up successfull"
    })
     
  } catch(error){
    res.status(500).json({
        message:"An error occurred during signup",
        error: error
    })
  }
})

app.post("/api/v1/signin", async(req,res)=>{

  const { username, password} = req.body;

  try{
    const user =  await userModel.findOne({username});
    console.log("user: ",user);
    if(user && user.password){
      const passwordMatch = await bcrypt.compare(password,user?.password);
    }
    else {
      res.status(400).json({
        message:"Invalid username or password"
      })
    }

    
  }catch(err){
    res.status(500).json({
      message:"An error occurred during signin",
      error: err
    })
  }
  

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
    await mongoose.connect(`${process.env.MONGODB_URI}`)
    console.log(process.env.MONGODB_URI)
    app.listen(3000, () => {
        console.log("app is running on port 3000");
    });
    console.log("Connected to database");
}


main();





