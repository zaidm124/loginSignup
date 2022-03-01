const mongoose=require("mongoose")
const bcrypt=require("bcrypt");

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    userType:{
        type:String,
        required:true
    }
})


userSchema.methods.checkPassword=async function(password){
	return await bcrypt.compare(password, this.password);
}
  

const User=mongoose.model("User",userSchema)
module.exports=User
