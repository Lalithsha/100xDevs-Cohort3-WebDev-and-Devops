"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMilddwareWithCookie = void 0;
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
const userMilddwareWithCookie = (req, res, next) => {
    var _a;
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.access_token;
    console.log("The token from middleware is: ", token);
    if (!token) {
        res.status(403).json({
            message: "Token not present"
        });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_USER_SECRET);
        console.log(`The decoded token is:  ${decoded}`);
        if (decoded) {
            // req.userId = decoded.id;
            req.userId = decoded.id;
            next();
        }
        else {
            res.status(403).json({
                message: "You are not signed in"
            });
        }
    }
    catch (error) {
        res.status(403).json({
            message: "Error occurred during token verification",
            error: error
        });
    }
};
exports.userMilddwareWithCookie = userMilddwareWithCookie;
// override the types of the express request object
// override the types of the global object
