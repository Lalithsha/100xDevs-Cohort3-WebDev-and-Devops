"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const userSchema = new Schema({
    username: { type: String, require: true, minLength: 3, maxLength: 20, unique: true },
    password: { type: String, require: true, minLength: 6, maxLength: 20 },
    firstname: { type: String, require: true, minLength: 3, maxLength: 20 },
    lastname: { type: String, require: true, minLength: 3, maxLength: 20 }
});
exports.userModel = mongoose_1.default.model("User", userSchema);
// export default User;
module.exports = {
    userModel: exports.userModel
};
