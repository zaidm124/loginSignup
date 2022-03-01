const express=require("express")
const router=express.Router()

router.use("/users",require("./user"))
router.use("/profile",require("./dashboard"))

module.exports=router