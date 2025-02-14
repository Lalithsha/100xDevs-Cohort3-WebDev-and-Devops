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
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkModel = exports.tagModel = exports.contentModel = exports.userModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// const Schema = Schema;
const ObjectId = mongoose_1.default.Types.ObjectId; // mongoose.Types.ObjectId
// UserSchema
const User = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
// type contentTypes= ['image'|'video'|'article','audio'];
var contentTypes;
(function (contentTypes) {
    contentTypes["image"] = "image";
    contentTypes["video"] = "video";
    contentTypes["article"] = "article";
    contentTypes["audio"] = "audio";
})(contentTypes || (contentTypes = {}));
const Content = new mongoose_1.Schema({
    link: { type: String, required: true },
    // type:{type:String, enum:Object.values(contentTypes), required:true},
    type: { type: String },
    title: { type: String, required: true },
    // tags:[{type: ObjectId, ref:'Tag', required:true}], // Tags are array of tag id's referencing the tag model
    tags: [{ type: String, ref: 'Tag', required: true }], // Tags are array of tag id's referencing the tag model
    userId: { type: ObjectId, ref: 'user', required: true }
});
const Tag = new mongoose_1.Schema({
    title: { type: String, required: true },
});
const Link = new mongoose_1.Schema({
    hash: { type: String, required: true },
    userId: { type: ObjectId, ref: 'User', required: true, unique: true }
});
// export const userModel = mongoose.model('user',User);
exports.userModel = (0, mongoose_1.model)('user', User);
exports.contentModel = mongoose_1.default.model('content', Content);
exports.tagModel = mongoose_1.default.model('tag', Tag);
exports.linkModel = mongoose_1.default.model('link', Link);
