import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    fullname : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String
    },
    phoneNumber : {
        type : Number,
    }
});

const UserModel = mongoose.model("user",UserSchema);