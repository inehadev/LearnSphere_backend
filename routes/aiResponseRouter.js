const express = require('express')
const router = express.Router();
const aiRes= require('../controller/aiResponse')

function aiResponseRouter (){
    router.post('/aiResponse' ,aiRes.aiResponse )
    return router;
}

module.exports=aiResponseRouter;