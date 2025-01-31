import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId; // mongoose.Types.ObjectId


const User = new Schema({
    username:{type:String, required:true},
    password:{type:String, required:true},
})

const Content = new Schema({
    link:{type:String, required:true},
    type:{type:String, enum:contentTypes[], required:true},
    title:{type:String, required:true},
    tags:{type:Schema.Types.ObjectId,ref:'Tag', required:true},
    userId:{type: Schema.Types.ObjectId, ref:'User', required:true}
})


// type contentTypes= ['image'|'video'|'article','audio'];
enum contentTypes{
    image='image',
    video='video',
    article='article',
    audio='audio'
}


const Tag = new Schema({
    title:{type:String, required:true},
})

const Link = new Schema({
    hash:{type:String, required:true},
    userId:{type:Schema.Types.ObjectId, ref:'User', required:true}
})