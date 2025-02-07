import express, { Request, Response } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { userModel, contentModel, tagModel, linkModel } from "./db";
// import bcrypt from 'bcryptjs';
import bcrypt,{hash, compare} from 'bcryptjs';
import { userMilddwareWithCookie } from "./middleware/middleware";
import 'dotenv/config'
import { z } from "zod";
import cookieParser from "cookie-parser";
import { random } from "./utils";
const app = express();
app.use(express.json());
app.use(cookieParser());
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

     await userModel.create({
       username,
       password: hashPassword
      }
    );  

    return res.json({
        message:"Sign up successfull"
    })
     
  } catch(error:any) {

    if(error.code === 11000){  
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

const jwtSecret = process.env.JWT_SECRET;
console.log(jwtSecret)

app.post("/api/v1/signin", async (req: Request, res: Response<any, Record<string, any>>):Promise<any>=>{

  const { username, password} = req.body;

  try {

    const existingUser =  await userModel.findOne({username});

    console.log("user: ",existingUser);

    if(existingUser){
      console.log("inside the existing user")
      const passwordMatch = await bcrypt.compare(password,existingUser?.password);
      console.log("password match done: ",passwordMatch);
      
      
      if(passwordMatch){
        const token = jwt.sign({
          id: existingUser._id.toString()
        }, process.env.JWT_USER_SECRET as string);
        console.log(token)
        /* res.json({
          message:"Login successfull",
          token
        }) */

          return res.cookie("access_token",token,{
            httpOnly:true,
            // secure:true
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

app.post("/api/v1/content", userMilddwareWithCookie as any, async (req, res:Response):Promise<any>=>{
  const userReq = req;
  const { type, link, title, tags} = req.body;
  await contentModel.create({
    type,
    link,
    title,
    tags,
    userId: userReq.userId
  })  

  return res.json({
    message:"Content added successfully"
  })

})

app.get("/api/v1/content", userMilddwareWithCookie as any, async (req, res: Response) => {

  const userId = req.userId;
   
  try{
      const content = await contentModel.find({
        userId
      }).populate("userId","username")
      
      res.json({
        content
      })
  } catch(error:any){
    console.log("The error is: ", error);
      res.json({
        message:"An error occurred during fetching content",
        error:error.message
      })
  }


})

app.delete("/api/v1/delete", userMilddwareWithCookie as any ,  async (req,res):Promise<any>=>{
  const userReq = req;
  const contentId = req.body.contentId;

  await contentModel.deleteMany({
    contentId,
    userId: userReq.userId
  })

  return res.json({
    message:"Content deleted successfully"
  })
  
})

app.post("/api/v1/brain/share",userMilddwareWithCookie , async (req,res):Promise<any>=>{
  const {share} = req.body;

  if(share){

    // check before hand if the user has already created a share-able link
    const existingLink = await linkModel.findOne({
      userId: req.userId
    })
    
    if(existingLink){
      return res.json({
        hash: existingLink.hash
      })
    }

    const hash =  random(9);
    await linkModel.create({
      userId: req.userId,
      hash
    })

    return res.json({
      message:"/share/ "+hash
    })
    
  }
  else {
    linkModel.deleteOne({
      userId: req.userId
    })

    return res.json({
      message:"Removed Link"
    })
    
  }
  
})

app.get("/api/v1/brain/:shareLink", async (req,res):Promise<any>=>{
  const hash = req.params.shareLink; 

  const link = await linkModel.findOne({
    hash
  })
  
  if(!link){
    return res.status(404).json({
      message:"Incorrect input"
    })
  }
  
  const content = await contentModel.find({
    userId: link.userId
  })
  
  const user = await userModel.findOne({
    // userId: link.userId
    _id: link.userId
  })
  
  if(!user){
    return res.status(404).json({
      message:"user not found, error should not ideally occur"
    })
  }
  
  return res.json({
    /* message: "Content fetched successfully",
    content:{
      user,
      ...content
    } */
    username:user?.username,
    content
  })
  
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





