import type {Request, Response, NextFunction} from "express";

export function middleware(req:Request, res:Response, next:NextFunction){
    const startTime = Date.now();
    next();
    const endTime = Date.now();
    const duration = endTime - startTime;
    console.log(`Request took ${duration}ms`, `Method: ${req.method}, URL: ${req.route.path}`, `Status: ${res.statusCode}`, `IP: ${req.ip}`);
}
