import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    username: { type: String, require: true, minLength:3, maxLength:20, unique: true, trim:true,lowercase:true },
    password: {type:String, require: true, minLength: 6},
    firstname: {type:String, require: true, minLength: 3, maxLength:20},
    lastname: {type:String, require: true, minLength: 3, maxLength:20}
})


const accountSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, minLength:3, ref:"User", require:true},
    balance:{type:Number, require:true}
})

const userModel = mongoose.model("User", userSchema);    
const accountModel = mongoose.model("Account", accountSchema);
// export default User;

export {
    userModel,  accountModel
}