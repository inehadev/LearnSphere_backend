const express = require ('express');
const responseModel = require('../models/responsemodel')
const cheerio = require('cheerio');

const parseResponse =async(htmlTable , userId)=>{

    const {htmlTable , userId}=req.body;
    const $ = cheerio.load(htmlTable);

    $('tr').each((i,row)=>{
        if(i===0)return;

        const col = $(row).find('td');

        const day = $(col[0]).text().trim();
        const task = $(col[1]).text.trim();
        const contentToLearn = $(col[2]).text.trim();
        const Reference = $(col[3]).text.trim();
        const Duration = $(col[4]).text.trim();

        const taskDate = new Date();

        taskDate.setDate(taskDate.getDate()+(i-1));

        const schedule =  new responseModel({
            userId ,
            task,
            contentToLearn,
            Reference,
            Duration,
            date:taskDate

        })

       const response=  schedule.save()
       .then(() => console.log(`Schedule saved for Day ${day}`))
       .catch((error) => console.error(`Error saving schedule for Day ${day}:`, error));


    })

}

module.exports = {parseResponse};