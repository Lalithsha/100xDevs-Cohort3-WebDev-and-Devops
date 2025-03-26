import express, { Router } from "express";
import { userRouter } from "../routes/user";
import { accountRouter } from "./account";
const app = express();
const router = Router();

router.use("/user", userRouter);
router.use("/account", accountRouter)

export{router}