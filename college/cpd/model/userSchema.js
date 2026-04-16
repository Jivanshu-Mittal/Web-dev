const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose")

const userSchema = new mongoose.Schema({
    email:String,
    usertype:String,
    cart:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        }
    ]
   
},{timestamps:true})

userSchema.plugin(passportLocalMongoose.default)

const User = mongoose.model("User", userSchema);
module.exports = User;