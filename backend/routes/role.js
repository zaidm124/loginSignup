const express = require("express");
const { addRole } = require("../controllers/role");
const roleRouter = express.Router();

roleRouter.route("/addRole").post(addRole);
module.exports = roleRouter;
