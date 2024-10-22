const express = require('express');
const app = express();
const PORT = 3000
const db = require('../backend/config/dbConfig')
const dotenv=require('dotenv');
const { userRouter } = require('./routes/userRoute');
const aiResponseRouter = require('./routes/aiResponseRouter');
const cors = require('cors')


app.use(cors())
dotenv.config();

db();

app.use(express.json());
app.use('/',userRouter());
app.use('/',aiResponseRouter());
app.listen(PORT , (req,res)=>{
    console.group(`server is running at ${PORT}`)
})