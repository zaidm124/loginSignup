const asyncHandler = require("../middlewares/asyncHandler");
const roleModel = require("../models/role.model");

exports.addRole = asyncHandler(async (req, res, next) => {
  const { roleName, permissions } = req.body;
  const role = await roleModel({
    roleName,
    permissions,
  }).save();
  return res.status(200).json({ success: true, role });
});
