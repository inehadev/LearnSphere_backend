const cheerio = require('cheerio')

const taskresponse =  (htmldata)=>{
    const  html = cheerio.load(htmldata);
    const  tasks =[];

    html("table tr").each((index , row)=>{
        if(index==0) return;

        const task = html(row).find("td").first().text();
        tasks.push(task)

    })
    return tasks;
}

module.exports ={ taskresponse};