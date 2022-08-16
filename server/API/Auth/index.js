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