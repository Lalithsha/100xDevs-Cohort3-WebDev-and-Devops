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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// import { userRouter } from "./routes/user";
const index_1 = require("./routes/index");
// var cors = require('cors')
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// Cors from localhost
let corsOption = {
    origin: ['http://localhost:5173'],
    credentials: true,
    sameSite: 'lax' // Add this for localhost
};
app.use((0, cors_1.default)(corsOption));
const result = dotenv_1.default.config();
if (result.error) {
    console.log(result.error);
}
console.log("Environment variables loaded", result.parsed);
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(process.env.MONGODB_URI);
        yield mongoose_1.default.connect(process.env.MONGODB_URI || "").then(() => {
            console.log("Connected to mongoDB");
        });
    });
}
connectDB().catch(err => console.log(err));
// app.use("/api/v1/user", userRouter)
app.use("/api/v1/", index_1.router);
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
