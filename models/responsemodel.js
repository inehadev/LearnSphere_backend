const mongoose = require('mongoose')

const responseSchema = new mongoose.Schema ({
    userId:{
        type: mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    task:{
        type:string,
        required:true
    },
    task:{
        type:string,
        required:true
    },
    contentToLearn:{
        type:string,
        required:true
    },
    reference:{
        type:string,
        required:true
    },
    duration:{
        type:string,
        required:true

    },
    date: {
        type: Date,
        required: true
      },
      isNotified: {
        type: Boolean,
        default: fals
      }

})

const response = mongoose.models('response' , responseSchema)