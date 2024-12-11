const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId; // mongoose.Types.ObjectId

// Define the user schema
const User = new Schema({
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String
})

const Course = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: ObjectId
})

const Admin = new Schema({
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String
})


const Purchases = new Schema({
    /* courseId: ObjectId,
    userId: ObjectId */
    courseId: { type: Schema.Types.ObjectId, ref: 'course' },
    userId: { type: Schema.Types.ObjectId, ref: 'user' }
})

/* course content , video 1, video 2, pdf 1, pdf 2 */

const userModel = mongoose.model("user", User);
const courseModel = mongoose.model("course", Course)
const adminModel = mongoose.model("admin", Admin);
const purchasesModel = mongoose.model("purchase", Purchases);

module.exports = {
    userModel,
    courseModel,
    adminModel,
    purchasesModel
}

























