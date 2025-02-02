import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";

export interface userRequest extends Request{
    userId: string;
}

/* export const userMiddleware = (req: userRequest, res: Response, next: NextFunction)=>{


    const header = req.headers["Authorization"];
    const decoded = jwt.verify(header as string, process.env.JWT_SECRET as string);
    if(decoded){
        req.userId = (decoded as jwt.JwtPayload).id;
        next();
    }
    else {
        res.json(403).json({
            message: "You are not logged in"
        })
    }
} */

export const userMilddwareWithCookie = (req:userRequest, res:Response, next:NextFunction)=>{
    const token = req.cookies?.access_token;
    console.log("The token from middleware is: ", token)
    if(!token){
        res.status(403).json({
            message:"Token not present"
        })
    }

    try{

        const decoded = jwt.verify(token,process.env.JWT_SECRET as string);
        console.log(`The decoded token is:  ${decoded}`);
        if(decoded){
            // req.userId = decoded.id;
            req.userId = (decoded as jwt.JwtPayload).id;
            next();
        }
        else {
            res.status(403).json({
                message:"You are not signed in"
            })
        }
    } catch(error){
        res.status(403).json({
            message:"You are not signed in",
            error:error
        })
    }
    
}


// override the types of the express request object

// override the types of the global object