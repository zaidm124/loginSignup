const express = require("express");
const { addGroup } = require("../controllers/group");
const groupRouter = express.Router();

groupRouter.route("/addGroup").post(addGroup);
module.exports = groupRouter;
