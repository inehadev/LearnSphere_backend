const express=require('express')
const notify = require('../controller/notifyController');

const router = express.Router();

function notifyRouter(){
   router.post('/notify' , notify.notifyController )
 
   return router
}


module.exports= {notifyRouter};