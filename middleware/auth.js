const jwt = require("jsonwebtoken");

function auth(req,res,next){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({msg:"Please login first"});
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT);
        req.user = decoded
        return next();
    }
    catch(errors){
        return res.status(401).json({msg:"Token is invalid"});
    }
}
module.exports = auth;  //export the auth function to use it in other files.  //