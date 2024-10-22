const express=require('express')
const user = require('../controller/usercontroller');

const router = express.Router();

function userRouter(){
   router.post('/register' , user.register)
   router.post('/login' ,user.login)
   return router
}


module.exports= {userRouter};