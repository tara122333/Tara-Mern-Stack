import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const OPTSchema = mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    otp : {
        type : Number,
        required : true
    },
    exp : {
        type :Number
    }
},{
    timestamps:true
});

OPTSchema.statics.fineByEmailAndOTP = async({email,otp})=>{
    const checkEmail = await OTPModel.findOne({email});
    if(!checkEmail) throw new Error("User not exist");
    const checkOtp = await OTPModel.findOne({otp : checkEmail.otp});
    if(!checkOtp) throw new Error("Otp not Match");
    return checkEmail;
}


export const OTPModel = mongoose.model("otp",OPTSchema);