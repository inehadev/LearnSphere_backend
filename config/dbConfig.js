const mongoose = require('mongoose')

const dbConnect =async()=>{
    try {
        const connected=await mongoose.connect(process.env.MONGO_URI)
        console.log(`database is connected sucessfylly ${connected.connection.host}`)
        
    } catch (error) {
        console.log(`database connection error ${error}`)
        
    }
   

}

module.exports=dbConnect;
