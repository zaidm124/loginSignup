const express = require("express");
const PERMISSIONS = require("../config/permission");
const { getProfile } = require("../controllers/dashboard/dashboard");
const { userAuthentication } = require("../middlewares/protectRoutes");
const verifyPermission = require("../middlewares/verifyPermission");
const dashboardRouter = express.Router();

dashboardRouter
  .route("/")
  .get(userAuthentication(), verifyPermission(PERMISSIONS.READ), getProfile);
module.exports = dashboardRouter;
