const cron = require('node-cron');
// const { sendNotificationToUser } = require('./notificationService');

const exportdata=()=>{
    const name= "HELLO NEHA";
    console.log(`export data ${name}`);
}
 const notifyController = (req,res)=>{
    
const cronExpression = '*/5 * * * *';
const isValid = cron.validate(cronExpression);
console.log(`the cronExpression is valid`);

cron.schedule(  cronExpression, async () => {
//   const users = await getUsersWithTasks(); 

//   for (const user of users) {
//     const nextTask = await getNextTaskForUser(user.id);

//     if (nextTask) {
//       await sendNotificationToUser(user, nextTask);
//       await markTaskAsNotified(user.id, nextTask); 
//     }
//   }
const response = exportdata();
res.status(200).json(response)

}
)

 }

 module.exports={notifyController};