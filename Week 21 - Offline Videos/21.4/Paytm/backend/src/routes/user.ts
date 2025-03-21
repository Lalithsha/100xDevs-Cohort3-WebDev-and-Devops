import mongoose from "mongoose";
import express, { NextFunction, Request, Response, Router } from "express";
import dotenv from "dotenv";
import {userModel} from "../db";
import z from "zod";
import bcrypt from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import cookieParser from "cookie-parser";

const userRouter = Router();
dotenv.config();
const app = express();
app.use(express.json());


userRouter.post("/signup", async (req: Request,res: Response, next: NextFunction): Promise<void>=>{
    const requireBody = z.object({
        username: z.string().min(3,{message:"Username must be greater than 3 characters"}).max(20,{message:"Username must be less than 20 characters"}),
        password: z.string().min(6,{message:"Password must be greater than 3 characters"}).max(20),
        firstName: z.string().min(3,{message:"First name must be greater than 3 characters"}).max(20,{message:"First name must be less than 20 characters"}),
        lastName: z.string().min(3,{message:"Last name must be greater than 3 characters"}).max(20,{message:"Last name must be less than 20 characters"}),
    })

    const parsedDataWithSuccess = requireBody.safeParse(req.body);
    if(!parsedDataWithSuccess.success){
        res.status(400).json({
            message:parsedDataWithSuccess.error
        })
        return;
    }

    const {username,password,firstName,lastName} = parsedDataWithSuccess.data;
   
   try {
        const hashPassword = await bcrypt.hash(password,4);
        await userModel.create({
            username,
            password:hashPassword,
            firstName,
            lastName
        })
        res.json({
            message:"Sign up successfull"
        })
    } catch (error) {
        res.json({
            message:`User already exists ${error}`
        })
        return; 
    }    
    
})


userRouter.post("/signin", async(req: Request,res: Response, next: NextFunction)=>{
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
            const token = sign({id:user?._id.toString()},"adfas");
            res.cookie("access_token",token,{
                httpOnly:true,
                secure:true
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

app.post("/")



export {userModel, userRouter}






























