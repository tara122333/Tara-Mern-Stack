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
        const data = await UserModel.create(req.body.credentials);
        console.log(data);
        res.status(200).json(data);
    } catch (error) {
        res.status(501).json({Error : error.message});
    }
})
Router.post("/signin",async(req,res)=>{
    try {
        // req.body.credentials
        const data = await UserModel.fineByEmailAndPassword(req.body.credentials);
        console.log(data);
        res.status(200).json({data, message : "user login success"});
    } catch (error) {
        res.status(501).json({Error : error.message});
    }
})

export default Router;