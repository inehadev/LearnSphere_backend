



const cron = require('node-cron');

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
