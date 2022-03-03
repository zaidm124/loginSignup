const mongoose = require("mongoose");
const schema = mongoose.Schema;

const groupSchema = mongoose.Schema({
  groupName: {
    type: String,
    required: true,
  },
  roles: [{ type: schema.Types.ObjectId, ref: "Role" }],
});

const groupModel = mongoose.model("Group", groupSchema);
module.exports = groupModel;
