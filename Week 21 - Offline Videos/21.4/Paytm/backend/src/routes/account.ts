import express, {Request, Response, Router} from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { accountModel, userModel } from "../db";
import z from "zod"
import mongoose from "mongoose";

const app = express();

const accountRouter = Router();


accountRouter.get("/balance", authMiddleware, async(req:Request, res:Response)=>{

    const userId = req.userId;
    
    try{
        const result = await accountModel.findOne({
            userId
        })

        if(!result){
            res.json({
                message:"Invalid result"
            })
        }
        
        console.log("The result is: ",  result);
        res.json({
            message:"Success",
            balance: result?.balance
            
        })
        
    } catch(error){
        res.status(400).json({
            message:"Failed to fetch balance"
        })
    }
})

accountRouter.post("/transfer", authMiddleware, async(req:Request,res)=>{

    const requiredBody= z.object({
        to:z.string().min(5),
        amount:z.number()
    })

    const parseDataWithSuccess = requiredBody.safeParse(req.body);
    if(parseDataWithSuccess.success){
        const {to, amount}= parseDataWithSuccess.data;
        const userId = req.userId;

        const session = await mongoose.startSession();
        session.startTransaction();
        try{
            const currAccount = accountModel.findOne(
                {userId}
            ).session(session);

            // @ts-ignore
            if(!currAccount || currAccount.balance < amount){
                await session.abortTransaction();
                res.status(400).json({
                    message:"Insufficent balance"
                })
                return;
            }
            
            const toAccount = accountModel.findOne({userId:to}).session(session);
            if(!toAccount){
                res.status(400).json({
                    message:"Invalid account"
                })
            }

            await accountModel.findOneAndUpdate({userId},{$inc:{balance:-amount}}).session(session);
            await accountModel.findOneAndUpdate({userId:to},{$inc:{balance:+amount}}).session(session);
            
            await session.commitTransaction();
            res.json({
                message:"Transaction successfull, Money transfered."
            })

        } catch(error){
            await session.abortTransaction();
            res.status(400).json({
                message:"Transaction failed",
                error:error
            })
        }
    }
    else {
        res.json({
            message:"Invalid input",
            error: parseDataWithSuccess.error
        })
    }


    
})


export {accountRouter};
