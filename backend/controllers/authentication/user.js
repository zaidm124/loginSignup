const asyncHandler = require("../../middlewares/asyncHandler");
const User = require("../../models/user.model");
const ErrorResponse = require("../../utils/ErrorResponse");

const bcrypt = require("bcrypt");
const { encryptAccessToken } = require("./utils");

exports.registerHandler = asyncHandler(async (req, res, next) => {
  let { username, password, name, userType } = req.body;

  // Check if username and password is entered
  if (!username || !password || !name || !userType) {
    throw new ErrorResponse("Required fields missing", 400);
  }

  if (password.length < 6) {
		throw new ErrorResponse('Password must be at least 6 characters', 400);
	}

  // Duplicate checks
  let user_doc = await User.findOne({ username });
  if (user_doc) {
    throw new ErrorResponse("Username already registered", 400);
  }

  const hashPass = await bcrypt.hash(
    password,
    Number(process.env.PASSWORD_HASH_SALT_LENGTH)
  );

  user_doc = await User.create({
    name,
    username,
    password: hashPass,
    userType,
  });

  req.responseData = {
    statusCode: 201,
    message: "User registered successfully",
    doc: user_doc,
  };
  next();
});


exports.loginHandler=asyncHandler(async(req,res,next)=>{
  const {username,password}=req.body;

  // Check if username and password is entered
  if(!username || !password){
    throw new ErrorResponse("Please provide username and password",400);
  }


  const user_doc=await User.findOne({username});
  if(!user_doc)throw new ErrorResponse("invalid credentials",403);
  
  const isAuthorized=await user_doc.checkPassword(password);
  if(!isAuthorized)throw new ErrorResponse("Invalid Credentials",403)

  // Generate access token
  req.responseData={
    statusCode:201,
    message:"Sign in successfull",
    doc:user_doc
  }

  next();
})

exports.TokenResponse = asyncHandler(async (req, res, next) => {
  const { doc, statusCode, message } = req.responseData;

  // Create Token
  let accessToken = encryptAccessToken(doc);

  // Set options for Cookie
  const cookieOptions = {
    maxAge: Number(process.env.JWT_COOKIE_MAX_AGE),
    httpOnly: true,
  };

  // Send token as Cookie
  return res
    .status(statusCode)
    .cookie("ACCESS_TOKEN", accessToken, cookieOptions)
    .json({
      success: true,
      message,
      responses: {
        accessToken,
        user_details: { ...doc._doc, password: undefined },
      },
    });
});
