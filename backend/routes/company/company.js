const express = require("express");
const PERMISSIONS = require("../../config/permission");
const {
  registerCompany,
  allCompanies,
  updateCompany,
  deleteCompany,
} = require("../../controllers/company/company");
const { userAuthentication } = require("../../middlewares/protectRoutes");
const verifyPermission = require("../../middlewares/verifyPermission");
const companyRouter = express.Router();

companyRouter
  .route("/getCompany")
  .get(userAuthentication(), verifyPermission(PERMISSIONS.READ), allCompanies);

companyRouter
  .route("/register")
  .post(
    userAuthentication(),
    verifyPermission(PERMISSIONS.WRITE),
    registerCompany
  );

companyRouter
  .route("/updateCompany")
  .put(
    userAuthentication(),
    verifyPermission(PERMISSIONS.UPDATE),
    updateCompany
  );

companyRouter
  .route("/deleteCompany")
  .delete(
    userAuthentication(),
    verifyPermission(PERMISSIONS.DELETE),
    deleteCompany
  );

module.exports = companyRouter;
