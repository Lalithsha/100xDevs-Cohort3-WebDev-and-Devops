import express, { Request, Response, Router } from "express";
import dotenv from "dotenv";
import 'dotenv/config';
import {userModel, accountModel} from "../db";
import z from "zod";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import { authMiddleware } from "../middlewares/authMiddleware";

const userRouter = Router();
dotenv.config();
const app = express();
app.use(express.json());


userRouter.post("/signup", async (req: Request,res: Response): Promise<void>=>{
    const requireBody = z.object({
        username: z.string().min(3,{message:"Username must be greater than 3 characters"}).max(20,{message:"Username must be less than 20 characters"}),
        password: z.string().min(6,{message:"Password must be greater than 3 characters"}).max(20),
        firstname: z.string().min(3,{message:"First name must be greater than 3 characters"}).max(20,{message:"First name must be less than 20 characters"}),
        lastname: z.string().min(3,{message:"Last name must be greater than 3 characters"}).max(20,{message:"Last name must be less than 20 characters"}),
    })

    const parsedDataWithSuccess = requireBody.safeParse(req.body);
    if(!parsedDataWithSuccess.success){
        res.status(400).json({
            message:parsedDataWithSuccess.error
        })
        return;
    }

    const {username,password,firstname,lastname} = parsedDataWithSuccess.data;
   
   try {
        const hashPassword = await bcrypt.hash(password,4);
        const user = await userModel.create({
            username,
            password:hashPassword,
            firstname,
            lastname
        })

        const token = sign({id:user._id.toString()},`${process.env.JWT_USER_SECRET }`);

       const userId = user._id;
       var balance;
       balance = 1+Math.random()*10000
       await accountModel.create({
        userId,
        balance
       })
        
        res.json({
            message:"User created successfully",
            token,
            balance

        })
    } catch (error) {
        res.status(411).json({
            message:`Email already taken / Incorrect inputs ${error}`
        })
        return; 
    }    
    
})


userRouter.post("/signin", async(req: Request,res: Response)=>{
    const requiredBody = z.object({
        username: z.string().min(3,{message:"Username must be greater than 3 characters"}).max(20,{message:"Username must be less than 20 characters"}),
        password: z.string().min(6,{message:"Password must be greater than 3 characters"}).max(20),
    })

    const parsedDataWithSuccess = requiredBody.safeParse(req.body);
    if(!parsedDataWithSuccess){
        res.status(400).json({
            message:"Invalid input"
        })
    }

    const {username, password}= req.body;
    try{
        const user =  await userModel.findOne({
            username
        })

        if(!user){
            res.status(404).json({
                message:"User not found"
            })
            return;
        }

        const passwordMatch = await bcrypt.compare(password, user.password||'');
        if(!passwordMatch){
            res.json({
                message:"Password incorrect, Please try again..."
            })
            return;
        }
        else {
            const token = sign({id:user?._id.toString()},`${process.env.JWT_USER_SECRET}` );
            res.cookie("access_token",token,{
                httpOnly:true,
                // secure:true // Blocks cookies in HTTP (localhost)
                secure: process.env.NODE_ENV === 'production'
            }).status(200).json({
                message:"Sign-in successfull"
            })
            return;
        }

    } catch(error){
        res.json({
            message:`Sign up faild ${error}`
        })
    }
    
})

userRouter.put("/update", authMiddleware, async(req:Request, res:Response)=>{

    const requiredBody = z.object({
        password: z.string().min(6,{message:"Password must be greater than 3 characters"}).max(20).optional(),
        firstname: z.string().min(3,{message:"First name must be greater than 3 characters"}).max(20,{message:"First name must be less than 20 characters"}).optional(),
        lastname: z.string().min(3,{message:"Last na me must be greater than 3 characters"}).max(20,{message:"Last name must be less than 20 characters"}).optional(),
    })
    
    const parsedBodyWithSuccess = requiredBody.safeParse(req.body);
    if(!parsedBodyWithSuccess.success){
        res.status(411).json({
            message:`Error while updating information`,
            error: parsedBodyWithSuccess.error
        })
    }
    
    try{
        const id = req.userId;
        // @ts-ignore
        const {password, firstname, lastname } = parsedBodyWithSuccess.data;
        const result = await userModel.updateOne({_id:id}, {password, firstname, lastname})
        console.log("The result of updat is: ",  result);
        res.json({
            message:"Succesfully updated data"
        })

    } catch(error){
        res.status(411).json({
            message:"Unexpected error occured"
        })
    }
    
})

userRouter.get("/bulk",authMiddleware,async(req,res)=>{

   const firstOrLastName = req.query.filter;
   console.log("The first or last name is ", firstOrLastName)
   const users = await userModel.find({
        $or:[
            {
                firstname:{"$regex":firstOrLastName}
            },
            {
                lastname:{"$regex":firstOrLastName}
            }
        ]
   })
    
   res.json({
    message:"success",
    user: users.map(user=>({
        username:user.username,
        firstname:user.firstname,
        lastname:user.lastname,
        _id:user._id
    }))
   })
   return;
})



export {userModel, userRouter}






























