const asyncHandler= require('express-async-handler')
require('dotenv').config()
const jwt= require('jsonwebtoken')

const validToken= asyncHandler(async(req,res,next)=>{
    let token;
    let authHeader= req.headers.authorization || req.headers.Authorization
    if(authHeader && authHeader.startsWith("Bearer")){

        token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.ACCESS_TOKEN,(err,decoded)=>{
            console.log('ACCESS_TOKEN:', process.env.ACCESS_TOKEN);

            if(err){
                res.status(401);
                throw new Error('user not authorized')
            }
            req.user = decoded.user // attach decoded token info to req.user, if needed
            console.log(decoded)
           // res.send(user)
            next();
        })
        if(!token){
            res.status(401)
            throw new Error("user is not authorized or token is missing")
        }
    }
})
module.exports= validToken