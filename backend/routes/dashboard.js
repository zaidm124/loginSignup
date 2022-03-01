const express=require("express");
const { getProfile } = require("../controllers/dashboard/dashboard");
const  {userAuthentication}  = require("../middlewares/protectRoutes");
const dashboardRouter=express.Router();

dashboardRouter.route("/").get(userAuthentication(),getProfile)
module.exports=dashboardRouter