const jwt=require("jsonwebtoken")

exports.encryptAccessToken=(data)=>{
    const payload={
        static_id:data._id,
        name:data.name,
        username:data.username,
        userType:data.userType
    }

    const jwtToken=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'60d'})
    return jwtToken
}

exports.decryptAccessToken = (token, accessType = null) => {
	const decodedToken = jwt.verify(
		token,
		process.env.JWT_SECRET
	);
	return decodedToken;
};