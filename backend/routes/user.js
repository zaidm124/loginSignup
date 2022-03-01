const express=require("express");
const { registerHandler, TokenResponse, loginHandler } = require("../controllers/authentication/user");
const userRouter=express.Router();

userRouter.route("/register").post(registerHandler,TokenResponse)
userRouter.route("/login").post(loginHandler,TokenResponse)
module.exports=userRouter