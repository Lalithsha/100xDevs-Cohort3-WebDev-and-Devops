import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import jwt, {verify} from "jsonwebtoken";
import dotenv from "dotenv";
import "dotenv/config"

const app = express();
dotenv.config();
app.use(cookieParser());

async function authMiddleware(req:Request,res:Response,next:NextFunction){
    const token = req.cookies.access_token;

    if(!token) {
        res.status(403).json({
            message:"Invalid token"
        })
        return;
    }
    
    try{
        console.log(process.env.JWT_USER_SECRET);
        
        const decoded = verify(token, process.env.JWT_USER_SECRET as string)
        if(decoded){
            // @ts-ignore
            req.userId = (decoded as jwt.JwtPayload).id;

            next();
        }
        else {
            res.status(403).json({
                message:"You are not signed in"
            })
            return;
        }

    } catch(error:any){
        res.status(403).json({
            message:`Failed to decode ${error.message}`
        })
    }
}

export {
    authMiddleware
}