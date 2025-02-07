import mongoose, {model, Schema}  from "mongoose";
// const Schema = Schema;
const ObjectId = mongoose.Types.ObjectId; // mongoose.Types.ObjectId

// UserSchema
const User = new Schema({
    username:{type:String, required:true, unique:true},
    password:{type:String, required:true},
})

// type contentTypes= ['image'|'video'|'article','audio'];
enum contentTypes{
    image='image',
    video='video',
    article='article',
    audio='audio'
}

const Content = new Schema({
    link:{type:String, required:true},
    type:{type:String, enum:Object.values(contentTypes), required:true},
    title:{type:String, required:true},
    // tags:[{type: ObjectId, ref:'Tag', required:true}], // Tags are array of tag id's referencing the tag model
    tags:[{type: String, ref:'Tag', required:true}], // Tags are array of tag id's referencing the tag model
    userId:{type: ObjectId, ref:'user', required:true}
})

const Tag = new Schema({
    title:{type:String, required:true},
})

const Link = new Schema({
    hash:{type:String, required:true},
    userId:{type: ObjectId, ref:'User', required:true, unique:true}
})

// export const userModel = mongoose.model('user',User);
export const userModel = model('user', User);
export const contentModel = mongoose.model('content', Content);
export const tagModel = mongoose.model('tag', Tag);
export const linkModel = mongoose.model('link', Link);