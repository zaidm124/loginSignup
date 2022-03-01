const asyncHandler = require("../../middlewares/asyncHandler");

exports.getProfile=asyncHandler(async(req,res,next)=>{
    return res.status(200).json({sucess:true,user:req.user})
})