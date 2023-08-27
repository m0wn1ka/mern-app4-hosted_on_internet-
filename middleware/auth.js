const jwt=require('jsonwebtoken');
const data = require('../config/default.json');
const secret = data.secret;
module.exports=function(req,res,next){
    const token=req.header('x-auth-token');
    if(!token){
        return res.status(405).json({msg:"why dont u givmee the token"})
    }
    try{
        const decoded=jwt.verify(token,secret);
        req.user=decoded.user;
        next();
    }
    catch(err){
        return res.status(403).json({msg:"invalid tokennn"});
    }
}