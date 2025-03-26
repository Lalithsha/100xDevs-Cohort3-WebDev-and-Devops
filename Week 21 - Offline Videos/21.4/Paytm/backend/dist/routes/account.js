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
exports.accountRouter = void 0;
const express_1 = __importStar(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const db_1 = require("../db");
const zod_1 = __importDefault(require("zod"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const accountRouter = (0, express_1.Router)();
exports.accountRouter = accountRouter;
accountRouter.get("/balance", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    try {
        const result = yield db_1.accountModel.findOne({
            userId
        });
        if (!result) {
            res.json({
                message: "Invalid result"
            });
        }
        console.log("The result is: ", result);
        res.json({
            message: "Success",
            balance: result === null || result === void 0 ? void 0 : result.balance
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Failed to fetch balance"
        });
    }
}));
accountRouter.post("/transfer", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requiredBody = zod_1.default.object({
        to: zod_1.default.string().min(5),
        amount: zod_1.default.number()
    });
    const parseDataWithSuccess = requiredBody.safeParse(req.body);
    if (parseDataWithSuccess.success) {
        const { to, amount } = parseDataWithSuccess.data;
        const userId = req.userId;
        const session = yield mongoose_1.default.startSession();
        session.startTransaction();
        try {
            const currAccount = db_1.accountModel.findOne({ userId }).session(session);
            // @ts-ignore
            if (!currAccount || currAccount.balance < amount) {
                yield session.abortTransaction();
                res.status(400).json({
                    message: "Insufficent balance"
                });
                return;
            }
            const toAccount = db_1.accountModel.findOne({ userId: to }).session(session);
            if (!toAccount) {
                res.status(400).json({
                    message: "Invalid account"
                });
            }
            yield db_1.accountModel.findOneAndUpdate({ userId }, { $inc: { balance: -amount } }).session(session);
            yield db_1.accountModel.findOneAndUpdate({ userId: to }, { $inc: { balance: +amount } }).session(session);
            yield session.commitTransaction();
            res.json({
                message: "Transaction successfull, Money transfered."
            });
        }
        catch (error) {
            yield session.abortTransaction();
            res.status(400).json({
                message: "Transaction failed",
                error: error
            });
        }
    }
    else {
        res.json({
            message: "Invalid input",
            error: parseDataWithSuccess.error
        });
    }
}));
