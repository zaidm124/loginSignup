const asyncHandler = require("../middlewares/asyncHandler");
const groupModel = require("../models/group.model");

exports.addGroup = asyncHandler(async (req, res, next) => {
  const { groupName, roles } = req.body;
  const group = await groupModel({
    groupName,
    roles,
  }).save();
  return res.status(200).json({ success: true, group });
});
