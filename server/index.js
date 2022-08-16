import express from 'express';

// database;
import './database/connection';
import { UserModel } from './database';

// App name
const app = express();

// Router
app.get("/",(req,res)=>{
    res.status(200).json("Success");
});


// Server listen
app.listen(4000,()=>{
    console.log("server has been started on port 4000");
});