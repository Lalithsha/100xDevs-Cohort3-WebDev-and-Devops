"use strict";
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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
// import bcrypt from 'bcryptjs';
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const middleware_1 = require("./middleware/middleware");
require("dotenv/config");
const zod_1 = require("zod");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requiredBody = zod_1.z.object({
        username: zod_1.z.string().min(4, { message: "Minimum 4 characters required" }).max(20, { message: "username should be less than 20 characters" }),
        password: zod_1.z.string().min(8).max(20)
    });
    // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,{message:"Password should contain atleast 1 uppercase, 1 lowercase, 1 specical character and 1 number"})
    const parsedDataWithSuccess = requiredBody.safeParse(req.body);
    console.log(`The parsed data is:  ${JSON.stringify(parsedDataWithSuccess)}`);
    if (!parsedDataWithSuccess.success) {
        return res.json({
            message: "Incorrect format",
            error: parsedDataWithSuccess.error
        });
    }
    const { username, password } = req.body;
    try {
        const hashPassword = yield bcryptjs_1.default.hash(password, 3);
        yield db_1.userModel.create(username, hashPassword);
        return res.json({
            message: "Sign up successfull"
        });
    }
    catch (error) {
        if (error.code === 11000) {
            res.status(400).json({
                message: "Username already exists"
            });
        }
        else {
            res.status(500).json({
                message: "An error occurred during signup",
                error: error.message
            });
        }
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const existingUser = yield db_1.userModel.findOne({ username });
        console.log("user: ", existingUser);
        if (existingUser && existingUser.password) {
            const passwordMatch = yield bcryptjs_1.default.compare(password, existingUser === null || existingUser === void 0 ? void 0 : existingUser.password);
            if (passwordMatch) {
                const token = jsonwebtoken_1.default.sign({
                    id: existingUser._id.toString()
                }, process.env.JWT_SECRET);
                /* res.json({
                  message:"Login successfull",
                  token
                }) */
                return res.cookie("access_token", token, {
                    httpOnly: true,
                    secure: true
                    // secure = process.env.NODE_ENV === 'production'
                }).status(200).json({
                    message: "Login successfull"
                });
            }
            else {
                res.status(403).json({
                    message: "Invalid credentials"
                });
            }
        }
        else {
            res.status(400).json({
                message: "Invalid username or password"
            });
        }
    }
    catch (err) {
        res.status(500).json({
            message: "An error occurred during signin",
            error: err
        });
    }
}));
/* app.post("/api/v1/content", userMilddwareWithCookie as any, async (req, res:Response)=>{
  const userReq = req as userRequest;
  const { type, link, title, tags} = req.body;
  await contentModel.create({
    type,
    link,
    title,
    tags,
    // userId: req.userId
    userId: userReq.userId
  })

  return res.json({
    message:"Content added successfully"
  })

}) */
app.get("/api/v1/content", middleware_1.userMilddwareWithCookie, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userReq = req;
    const userId = userReq.userId;
    const content = yield db_1.contentModel.find({
        userId
    }).populate("userId", "username");
    res.json({
        content
    });
}));
app.delete("/api/v1/delete", (req, res) => {
});
app.post("/api/v1/brain/share", (req, res) => {
});
app.get("/api/v1/brain/:shareLink", (req, res) => {
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect(`${process.env.MONGODB_URI}`);
        console.log(process.env.MONGODB_URI);
        app.listen(3000, () => {
            console.log("app is running on port 3000");
        });
        console.log("Connected to database");
    });
}
main();
