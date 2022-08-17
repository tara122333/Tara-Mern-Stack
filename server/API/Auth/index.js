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