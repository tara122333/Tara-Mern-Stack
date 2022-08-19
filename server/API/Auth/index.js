require("dotenv").config();
import express from "express";
import { UserModel, UserVerificationModel } from "../../database";
import { OTPModel } from "../../database/OTP";
import nodemailer from 'nodemailer';
import {uuid4} from "uuid4";
import bcrypt from 'bcryptjs';


const Router = express.Router();

let tranporter = nodemailer.createTransport({
    service : "gmail",
    secure: true,
    auth : {
        user : process.env.AUTH_EMAIL,
        pass : process.env.AUTH_PASS,
    }
});

tranporter.verify((error,success)=>{
    if(error){
        console.log("nodemailer verify error " + error);
    }
    else{
        console.log("ready to send email");
        console.log("success");
    }
});
const sendvarificationEmail = (({_id,email},res)=>{
    const currentUrl = "http://localhost:4000/";
    const uId = "4521354tara151";
    const uniqueString = uId + _id;
    // console.log(uniqueString);

    const mailOption = {
        from : process.env.AUTH_EMAIL,
        to : email,
        subject : "Email Varification",
        // html : `<p>
        // Email Varification <br>
        // <a href=${currentUrl}>
        //     Varifiy
        // </a>
        // </p>`
        html : `<p>
        Email Varification <br>
        <a href=${currentUrl + "auth/verify/" + _id + "/" + uniqueString}>
            Varifiy
        </a>
        </p>`
    };
    const saltRound = 10;
    bcrypt.hash(uniqueString,saltRound).then((hashUniqueString)=>{
        const newVarification = new UserVerificationModel({
            userId : _id,
            uniqueString : hashUniqueString,
            createdAt : Date.now(),
            expireAt : Date.now() + 300000,
        });
        newVarification.save().then(()=>{
            tranporter.sendMail(mailOption).then(()=>{
                console.log("mail sent and record save ||");
            }).catch((error)=>{
                console.log("mail sent error" + error);
                res.status(501).json({Error : error.message});
            });
        }).catch((error)=>{
            res.status(501).json({Error : error.message});
        })
    }).catch((error)=>{
        console.log("error in hashing data");
        res.status(501).json({Error : error.message});
    })
    
})





/* 
method = get
access = public
params = userId and uniqueString
url = /verify
des = varification using email link
*/

Router.get("/verify/:userId/:uniqueString",(req,res)=>{
    let {userId,uniqueString} = req.params;
    UserVerificationModel.find({userId}).then((result)=>{
        if(result.length > 0){
            const {expireAt} = result[0];
            const hashUniqueString = result[0].uniqueString;
            if(expireAt < Date.now()){
                UserVerificationModel.deleteOne({userId}).then((result)=>{
                    UserModel.deleteOne({_id : userId}).then(()=>{
                        console.log("user users database has been cleaning");
                    }).catch((error)=>{
                        console.log("users database not clearing for expire time");
                    res.status(501).json({Error : error.message});
                    })

                }).catch((error)=>{
                    console.log("user not clearing");
                    res.status(501).json({Error : error.message});
                })
            }
            else{
                bcrypt.compare(uniqueString,hashUniqueString).then((result)=>{

                    if(result){
                        UserModel.updateOne({_id:userId},{
                            varified : true
                        }).then(()=>{
                            console.log("user successfully verified");
                            res.status(200).json({
                                message : "Success Verification"
                            });
                        }).catch((error)=>{
                            console.log("user not update for varification");
                            res.status(501).json({Error : error.message});
                        })
                    }
                    else{
                        console.log("verification passed check your mail");
                    }

                }).catch((error)=>{
                    console.log("user uniqueString not matches");
                    res.status(501).json({Error : error.message});
                })
            }
        }
        else{
            console.log("data has been don't exist or already verified");
        }


    }).catch((error)=>{
        console.log("user not exist");
        res.status(501).json({Error : error.message});
    });
});




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
        // const otp = Math.floor((Math.random() * 100000)+ 1);
        // const now = new Date();
        // const time = now.getTime();
        // const expireTime = time + 1000 * 300;
        // const otpdata = await OTPModel.create({
        //     otp : otp,
        //     email : user.email,
        //     exp : expireTime
        // });
        const token = user.generateAuthToken();
        sendvarificationEmail(user);
        res.status(200).json({user,token,message : "Success Signup",status : "success"});
    } catch (error) {
        res.status(501).json({Error : error.message});
    }
})


/* 
method = post
access = public
params = none
url = /signin
des = signin with email and password
*/
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

/* 
method = post
access = public
params = none
url = /signin
des = signin with email and password
*/
Router.post("/otp",async(req,res)=>{
    try {
        console.log(req.body.otpData);
        const user = await OTPModel.fineByEmailAndOTP();
        // const token = user.generateAuthToken();
        // console.log(user);
        res.status(200).json({ message : "user success" , status : "success"});
    } catch (error) {
        res.status(501).json({Error : error.message});
    }
})




// /* 
// route      ==> /google
// method     ==> GET
// Des        ==> Google signin
// params     ==> none
// Access     ==> public
// */
// Router.get("/google",
//     passport.authenticate("google",{
//         scope: [
//             "https://www.googleapis.com/auth/userinfo.profile",
//             "https://www.googleapis.com/auth/userinfo.email",
//             "https://www.googleapis.com/auth/user.phonenumbers.read"
//         ],
//     }
// ));



// /*
// route      ==> /google/callback
// method     ==> GET
// Des        ==> Google signin callback
// params     ==> none
// Access     ==> public
// */


// Router.get(
//     "/google/callback",
//     passport.authenticate("google", { failureRedirect: "/" }),
//     (req, res) => {
//       // Successful authentication, redirect home.
//       return res.redirect(
//         `http://localhost:3000/google/${req.session.passport.user.token}`
//       );
//     }
//   );


export default Router;