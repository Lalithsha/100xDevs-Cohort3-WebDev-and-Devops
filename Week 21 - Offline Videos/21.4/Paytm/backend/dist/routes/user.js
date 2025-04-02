"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = exports.userModel = void 0;
const express_1 = __importStar(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
require("dotenv/config");
const db_1 = require("../db");
Object.defineProperty(exports, "userModel", { enumerable: true, get: function () { return db_1.userModel; } });
const zod_1 = __importDefault(require("zod"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = require("jsonwebtoken");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requireBody = zod_1.default.object({
        username: zod_1.default.string().min(3, { message: "Username must be greater than 3 characters" }).max(20, { message: "Username must be less than 20 characters" }),
        password: zod_1.default.string().min(6, { message: "Password must be greater than 3 characters" }).max(20),
        firstname: zod_1.default.string().min(3, { message: "First name must be greater than 3 characters" }).max(20, { message: "First name must be less than 20 characters" }),
        lastname: zod_1.default.string().min(3, { message: "Last name must be greater than 3 characters" }).max(20, { message: "Last name must be less than 20 characters" }),
    });
    const parsedDataWithSuccess = requireBody.safeParse(req.body);
    if (!parsedDataWithSuccess.success) {
        res.status(400).json({
            message: parsedDataWithSuccess.error
        });
        return;
    }
    const { username, password, firstname, lastname } = parsedDataWithSuccess.data;
    try {
        const hashPassword = yield bcryptjs_1.default.hash(password, 4);
        const user = yield db_1.userModel.create({
            username,
            password: hashPassword,
            firstname,
            lastname
        });
        const token = (0, jsonwebtoken_1.sign)({ id: user._id.toString() }, `${process.env.JWT_USER_SECRET}`);
        const userId = user._id;
        var balance;
        balance = 1 + Math.random() * 10000;
        yield db_1.accountModel.create({
            userId,
            balance
        });
        res.json({
            message: "User created successfully",
            token,
            balance
        });
    }
    catch (error) {
        res.status(411).json({
            message: `Email already taken / Incorrect inputs ${error}`
        });
        return;
    }
}));
userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requiredBody = zod_1.default.object({
        username: zod_1.default.string().min(3, { message: "Username must be greater than 3 characters" }).max(20, { message: "Username must be less than 20 characters" }),
        password: zod_1.default.string().min(6, { message: "Password must be greater than 3 characters" }).max(20),
    });
    const parsedDataWithSuccess = requiredBody.safeParse(req.body);
    if (!parsedDataWithSuccess) {
        res.status(400).json({
            message: "Invalid input"
        });
    }
    const { username, password } = req.body;
    try {
        const user = yield db_1.userModel.findOne({
            username
        });
        if (!user) {
            res.status(404).json({
                message: "User not found"
            });
            return;
        }
        const passwordMatch = yield bcryptjs_1.default.compare(password, user.password || '');
        if (!passwordMatch) {
            res.json({
                message: "Password incorrect, Please try again..."
            });
            return;
        }
        else {
            const token = (0, jsonwebtoken_1.sign)({ id: user === null || user === void 0 ? void 0 : user._id.toString() }, `${process.env.JWT_USER_SECRET}`);
            res.cookie("access_token", token, {
                httpOnly: true,
                // secure:true // Blocks cookies in HTTP (localhost)
                secure: process.env.NODE_ENV === 'production'
            }).status(200).json({
                message: "Sign-in successfull"
            });
            return;
        }
    }
    catch (error) {
        res.json({
            message: `Sign up faild ${error}`
        });
    }
}));
userRouter.put("/update", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requiredBody = zod_1.default.object({
        password: zod_1.default.string().min(6, { message: "Password must be greater than 3 characters" }).max(20).optional(),
        firstname: zod_1.default.string().min(3, { message: "First name must be greater than 3 characters" }).max(20, { message: "First name must be less than 20 characters" }).optional(),
        lastname: zod_1.default.string().min(3, { message: "Last na me must be greater than 3 characters" }).max(20, { message: "Last name must be less than 20 characters" }).optional(),
    });
    const parsedBodyWithSuccess = requiredBody.safeParse(req.body);
    if (!parsedBodyWithSuccess.success) {
        res.status(411).json({
            message: `Error while updating information`,
            error: parsedBodyWithSuccess.error
        });
    }
    try {
        const id = req.userId;
        // @ts-ignore
        const { password, firstname, lastname } = parsedBodyWithSuccess.data;
        const result = yield db_1.userModel.updateOne({ _id: id }, { password, firstname, lastname });
        console.log("The result of updat is: ", result);
        res.json({
            message: "Succesfully updated data"
        });
    }
    catch (error) {
        res.status(411).json({
            message: "Unexpected error occured"
        });
    }
}));
userRouter.get("/bulk", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const firstOrLastName = req.query.filter;
    console.log("The first or last name is ", firstOrLastName);
    const users = yield db_1.userModel.find({
        $or: [
            {
                firstname: { "$regex": firstOrLastName }
            },
            {
                lastname: { "$regex": firstOrLastName }
            }
        ]
    });
    res.json({
        message: "success",
        user: users.map(user => ({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id
        }))
    });
    return;
}));
