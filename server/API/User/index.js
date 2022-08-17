import express from 'express';
import passport from "passport";

const Router = express.Router();
import { UserModel } from "../../database";

/*
route      ==> /
method     ==> GRT
Des        ==> GET User
params     ==> _id
Access     ==> public
body       ==> none
*/
Router.get("/",passport.authenticate("jwt"), async(req,res)=>{
    try {
        const { email, fullname, phoneNumber, address } = req.session.passport.user._doc;
        return res.json({ user: { email, fullname, phoneNumber, address } });
    } catch (error) {
        return res.status(500).json({error : error.message});
    }
});

export default Router;