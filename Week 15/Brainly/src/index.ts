import express, { Request, Response } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { userModel, contentModel, tagModel, linkModel } from "./db";
// import bcrypt from 'bcryptjs';
import bcrypt,{hash, compare} from 'bcryptjs';
import { userMilddwareWithCookie } from "./middleware/middleware";
import 'dotenv/config'
import { z } from "zod";
import { userRequest } from "./middleware/middleware";

const app = express();
app.use(express.json());

app.post("/api/v1/signup", async(req,res):Promise<any>=>{


  const requiredBody = z.object({
    username: z.string().min(4,{message:"Minimum 4 characters required"}).max(20,{message:"username should be less than 20 characters"}),
    password: z.string().min(8).max(20)
  })
  // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,{message:"Password should contain atleast 1 uppercase, 1 lowercase, 1 specical character and 1 number"})
  const parsedDataWithSuccess = requiredBody.safeParse(req.body);
  console.log(`The parsed data is:  ${JSON.stringify(parsedDataWithSuccess)}`);

  if(!parsedDataWithSuccess.success){
    return res.json({
      message: "Incorrect format",
      error: parsedDataWithSuccess.error
    })
  }
  
  const { username, password } = req.body;
  
  try{
     const hashPassword = await bcrypt.hash(password,3);

     await userModel.create(
       username,
       hashPassword
    );  

    return res.json({
        message:"Sign up successfull"
    })
     
  } catch(error:any) {

    if(error.code ===11000){  
      res.status(400).json({
        message:"Username already exists"
      })
    }else{    
      res.status(500).json({
          message:"An error occurred during signup",
          error: error.message
      })
    }
  }
})

app.post("/api/v1/signin", async (req: Request, res: Response<any, Record<string, any>>):Promise<any>=>{

  const { username, password} = req.body;

  try {

    const existingUser =  await userModel.findOne({username});

    console.log("user: ",existingUser);

    if(existingUser && existingUser.password){
      const passwordMatch = await bcrypt.compare(password,existingUser?.password);

      if(passwordMatch){
        const token = jwt.sign({
          id: existingUser._id.toString()
        }, process.env.JWT_SECRET as string);

        /* res.json({
          message:"Login successfull",
          token
        }) */

          return res.cookie("access_token",token,{
            httpOnly:true,
            secure:true
            // secure = process.env.NODE_ENV === 'production'
          }).status(200).json({
            message:"Login successfull" 
          })
      }
      else {
        res.status(403).json({
          message:"Invalid credentials"
        })
      }
      
    }
    else {
      res.status(400).json({
        message:"Invalid username or password"
      })
    }
  } catch(err) {
    res.status(500).json({
      message:"An error occurred during signin",
      error: err
    })
  }
})

/* app.post("/api/v1/content", userMilddwareWithCookie as any, async (req, res:Response)=>{
  const userReq = req as userRequest;
  const { type, link, title, tags} = req.body;
  await contentModel.create({
    type,
    link,
    title,
    tags,
    // userId: req.userId
    userId: userReq.userId
  })  

  return res.json({
    message:"Content added successfully"
  })

}) */

app.get("/api/v1/content", userMilddwareWithCookie as any, async (req, res: Response) => {
  const userReq = req as userRequest;

  const userId = userReq.userId;
  const content = await contentModel.find({
    userId
  }).populate("userId","username")
  
  res.json({
    content
  })

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





