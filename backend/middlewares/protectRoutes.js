const { decryptAccessToken } = require("../controllers/authentication/utils");
const User = require("../models/user.model");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("./asyncHandler");

exports.userAuthentication = () =>
  asyncHandler(async (req, res, next) => {
    let accessToken;

    // Check request headers has a "authorization" key
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      // Set token from request headers
      accessToken = req.headers.authorization.split(" ")[1]; // Bearer tokenXXX
    } else if (req.cookies?.ACCESS_TOKEN) {
      // Set token form cookie
      accessToken = req.cookies?.ACCESS_TOKEN;
    }

    // check token exists or not
    if (!accessToken) {
      throw new ErrorResponse(
        `You are not authorized to access this resource`,
        401
      );
    }

    // Decode and Verify the token
    const decodedToken = decryptAccessToken(accessToken);
    // console.log(decodedToken);

    // Find User from payload
    const requested_user = await User.findOne({
      username: decodedToken.username,
      _id: decodedToken.static_id,
    }).populate({ path: "group", populate: { path: "roles" } });

    console.log(JSON.stringify(requested_user));

    if (!requested_user) {
      throw new ErrorResponse("No user found", 403);
    }

    req.user = requested_user;
    next();
  });
