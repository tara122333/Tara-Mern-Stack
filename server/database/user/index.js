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


UserSchema.statics.fineByEmailAndMobile = async({email,phoneNumber}) => {
    const checkEmail = await UserModel.findOne({email});
    const checkPhone = await UserModel.findOne({phoneNumber});
    if(checkEmail || checkPhone){
        throw new Error("User already exits...."); 
    }
    
    return false;
}


UserSchema.statics.fineByEmailAndPassword = async ({email,password}) => {
    const checkEmail = await UserModel.findOne({email});
    if(!checkEmail) throw new Error("User not exist");
    else{
        if(checkEmail.password === password){
            return checkEmail;
        }
        throw new Error("password are not matches");
    }
}

export const UserModel = mongoose.model("user",UserSchema);