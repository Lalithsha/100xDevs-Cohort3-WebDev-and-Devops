"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountModel = exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const userSchema = new Schema({
    username: { type: String, require: true, minLength: 3, maxLength: 20, unique: true, trim: true, lowercase: true },
    password: { type: String, require: true, minLength: 6 },
    firstname: { type: String, require: true, minLength: 3, maxLength: 20 },
    lastname: { type: String, require: true, minLength: 3, maxLength: 20 }
});
const accountSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, minLength: 3, ref: "User", require: true },
    balance: { type: Number, require: true }
});
const userModel = mongoose_1.default.model("User", userSchema);
exports.userModel = userModel;
const accountModel = mongoose_1.default.model("Account", accountSchema);
exports.accountModel = accountModel;
