const express=require('express')
const jwt = require('jsonwebtoken')

const verify = async(req,res,next)=>{
   try {
    const token = req.headers('x-auth-token');
    if(!token){
        console.log("token not found");
        res.status(401).json({message:"token not found"});
    }

    const isverified = jwt.verify(token , (process.env.SECRET_KEY));
    if(!isverified){
        console.log("token not verfied");
        res.status(401).json({message:"token not verified"});
    }
     
    req.user= isverified.userId;
    console.log(req.user);
    next();
    
   } catch (error) {
    console.log("error in verify user" , error);
    res.status(500).json({message:"error at verify token" , error})
    
   }
}

module.exports= verify;