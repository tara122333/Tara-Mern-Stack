import express, { Router } from 'express';

// database;
import './database/connection';
import { UserModel } from './database';

// App name
const app = express();


// API
import Auth from './API/Auth/index';


// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// SetRouter
app.use("/auth",Auth);

// Router
app.get("/",(req,res)=>{
    res.status(200).json("Success");
});


// Server listen
app.listen(4000,()=>{
    console.log("server has been started on port 4000");
});