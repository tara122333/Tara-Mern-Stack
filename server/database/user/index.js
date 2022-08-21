import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

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
    },
    varified : {
        type:Boolean,
        default:false,
    },
    profilePic : {
        type : String,
    }
},{
    timestamps:true
});


UserSchema.statics.fineByEmailAndMobile = async({email,phoneNumber}) => {
    const checkEmail = await UserModel.findOne({email});
    // const checkPhone = await UserModel.findOne({phoneNumber});
    if(checkEmail){
        throw new Error("User already exits...."); 
    }
    
    return false;
}


UserSchema.statics.fineByEmailAndPassword = async ({email,password}) => {
    const checkEmail = await UserModel.findOne({email});
    if(!checkEmail) throw new Error("User not exist");
    const isMatch = await bcrypt.compare(password,checkEmail.password);
    if(!isMatch) throw new Error("password does not match");
    return checkEmail;
}

// Token Generate
UserSchema.methods.generateAuthToken =  function(){
    const token = jwt.sign({
        user : this._id.toString(),
    },
        "zomatoUser"
    );

    return token;
}

// bcrypt Password
UserSchema.pre("save",function(next){
    const user = this;
    if(!user.isModified("password")) return next();
    const Round = 8;
    bcrypt.genSalt(Round,(err,salt)=>{
        if(err) return next(err);
        bcrypt.hash(user.password,salt,(err,hash)=>{
            if(err) return next(err);
            user.password = hash;
            return next();
        })
    })
})


export const UserModel = mongoose.model("user",UserSchema);