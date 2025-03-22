import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    username: { type: String, require: true, minLength:3, maxLength:20, unique: true, trim:true,lowercase:true },
    password: {type:String, require: true, minLength: 6},
    firstname: {type:String, require: true, minLength: 3, maxLength:20},
    lastname: {type:String, require: true, minLength: 3, maxLength:20}
})

export const userModel = mongoose.model("User", userSchema);    

// export default User;

module.exports={
    userModel
}