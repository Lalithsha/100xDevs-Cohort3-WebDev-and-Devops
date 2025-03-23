import express, { Router } from "express";
import { userRouter } from "../routes/user";

const app = express();
const mainRouter = Router();
// app.use("/user",userRouter);
mainRouter.use("/user", userRouter);

export{mainRouter}


