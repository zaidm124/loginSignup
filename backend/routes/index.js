const express = require("express");
const router = express.Router();

router.use("/users", require("./user"));
router.use("/profile", require("./dashboard"));
router.use("/company", require("./company/company"));
router.use("/group", require("./group"));
router.use("/role", require("./role"));

module.exports = router;
