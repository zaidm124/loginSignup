const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("./asyncHandler");

const verifyPermission = (permission) => {
  return asyncHandler(async (req, res, next) => {
    const roles = req.user.group.roles;
    roles.map((role) => {
      console.log(role.permissions);
      if (role.permissions.includes(permission)) {
        next();
      }
    });

    // Will throw error if the required permission is not in any of the roles
    throw new ErrorResponse(
      "You are not authorized to access this resource",
      403
    );
  });
};

module.exports = verifyPermission;
