const express = require('express')
const router = express.Router();
const aiRes= require('../controller/aiResponse');
const { verify } = require('jsonwebtoken');

function aiResponseRouter (){
    router.post('/aiResponse' , verify ,aiRes.aiResponse )
    return router;
}

module.exports=aiResponseRouter;