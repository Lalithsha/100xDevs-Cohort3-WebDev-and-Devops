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
exports.authMiddleware = authMiddleware;
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
require("dotenv/config");
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, cookie_parser_1.default)());
function authMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.cookies.access_token;
        if (!token) {
            res.status(403).json({
                message: "Invalid token"
            });
            return;
        }
        try {
            console.log(process.env.JWT_USER_SECRET);
            const decoded = (0, jsonwebtoken_1.verify)(token, process.env.JWT_USER_SECRET);
            if (decoded) {
                // @ts-ignore
                req.userId = decoded.id;
                next();
            }
            else {
                res.status(403).json({
                    message: "You are not signed in"
                });
                return;
            }
        }
        catch (error) {
            res.status(403).json({
                message: `Failed to decode ${error.message}`
            });
        }
    });
}
