import express from "express";
import { UserModel } from "../../database";

const Router = express.Router();

/* 
method = post
access = public
params = none
url = /signup
des = signup with fullname, email and password
*/

Router.post("/signup",async(req,res)=>{
    try {
        // req.body.credentials
        await UserModel.fineByEmailAndMobile(req.body.credentials);
        const user = await UserModel.create(req.body.credentials);
        // console.log(user);
        const token = user.generateAuthToken();
        console.log(token);
        res.status(200).json({user,token,message : "Success Signup",status : "success"});
    } catch (error) {
        res.status(501).json({Error : error.message});
    }
})
Router.post("/signin",async(req,res)=>{
    try {
        // req.body.credentials
        const user = await UserModel.fineByEmailAndPassword(req.body.credentials);
        const token = user.generateAuthToken();
        // console.log(user);
        res.status(200).json({user,token, message : "user login success" , status : "success"});
    } catch (error) {
        res.status(501).json({Error : error.message});
    }
})


// bcrypt password


export default Router;