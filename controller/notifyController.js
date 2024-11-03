// const cron = require('node-cron');
// // const { sendNotificationToUser } = require('./notificationService');

// const exportdata=()=>{
//     const name= "HELLO NEHA";
//     console.log(`export data ${name}`);
// }
//  const notifyController = (req,res)=>{
    
// const cronExpression = '*/5 * * * *';
// const isValid = cron.validate(cronExpression);
// console.log(`the cronExpression is valid ${isValid}`);

// cron.schedule(  cronExpression, async () => {
// //   const users = await getUsersWithTasks(); 

// //   for (const user of users) {
// //     const nextTask = await getNextTaskForUser(user.id);

// //     if (nextTask) {
// //       await sendNotificationToUser(user, nextTask);
// //       await markTaskAsNotified(user.id, nextTask); 
// //     }
// //   }
// const response = exportdata();


// }
// )

//  }

//  module.exports={notifyController};




const cron = require('node-cron');
// const { sendNotificationToUser } = require('./notificationService');

const exportdata = () => {
    const name = "HELLO NEHA";
    console.log(`export data: ${name}`);
};


const notifyController = (req, res) => {
    const cronExpression = '0 0 * * *';
    const isValid = cron.validate(cronExpression);
    console.log(`The cron expression is valid: ${isValid}`);

    if (isValid) {
        res.status(200).json({ message: "Cron job scheduled successfully." });
    } else {
        res.status(400).json({ message: "Invalid cron expression." });
    }
};


const cronExpression = '0 0 * * *';
if (cron.validate(cronExpression)) {
    cron.schedule(cronExpression, () => {
        exportdata(); 
    });
}

module.exports = { notifyController };
