require("dotenv").config();
import express from 'express';
import passport from 'passport';
require("./database/connection");

// // database;
const session = require('express-session');
import cors from 'cors';  //cors
import helmet from 'helmet';  //helmet


import routeConfig from './config/route.config';
import googleAuthConfig from "./config/google.config";


// App name
const app = express();


// API
import Auth from './API/Auth/index';
import User from './API/User/index';
import Mail from './API/Mail/index';


// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'bla bla bla' 
  }));
app.use(helmet());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());


routeConfig(passport);
googleAuthConfig(passport);

// SetRouter
app.use("/auth",Auth);
app.use("/user",User);
app.use("/mail",Mail);

// Router
app.get("/",(req,res)=>{
    res.status(200).json("Success");
});


// Server listen
app.listen(4000,()=>{
    console.log("server has been started on port 4000");
});