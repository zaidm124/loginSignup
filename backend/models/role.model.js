const mongoose = require("mongoose");
const schema = mongoose.Schema;

const roleSchema = mongoose.Schema({
  roleName: {
    type: String,
    required: true,
  },
  permissions: [{ type: String }],
});

const roleModel = mongoose.model("Role", roleSchema);
module.exports = roleModel;
