// const cron = require('node-cron');
// const { sendNotificationToUser } = require('./notificationService'); // Function to notify the user

// // Run every 24 hours
// cron.schedule('0 0 * * *', async () => {
//   const users = await getUsersWithTasks(); // Fetch users who have tasks

//   for (const user of users) {
//     const nextTask = await getNextTaskForUser(user.id); // Get the next unnotified task

//     if (nextTask) {
//       await sendNotificationToUser(user, nextTask); // Notify the user about the task
//       await markTaskAsNotified(user.id, nextTask); // Mark task as notified
//     }
//   }
// }