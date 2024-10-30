const express = require('express');
const app = express();
const PORT = 3000
const db = require('../backend/config/dbConfig')
const dotenv=require('dotenv');
const { userRouter } = require('./routes/userRoute');
const aiResponseRouter = require('./routes/aiResponseRouter');
const cors = require('cors');
const { notifyRouter } = require('./routes/notifyRoute');


app.use(cors())
dotenv.config();

db();

app.use(express.json());
app.use('/',userRouter());
app.use('/',aiResponseRouter());
app.use('/', notifyRouter())
app.listen(PORT , (req,res)=>{
    console.group(`server is running at ${PORT}`)
})