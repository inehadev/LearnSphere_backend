
// const  Groq =  require('groq-sdk');

// const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });



// const aiResponse = async (req, res) => {
//   const { userTask }= req.body.userTask || ""
//   const {timeDuration} = req.body.timeDuration || ""
//   const { dailyTime}= req.body.dailyTime || ""

//  const response= await  groq.chat.completions.create({
  
//     messages: [
//       {
//         role: "system",
//         content: "You are an ai assitant who are experinced with building custom timetable based on user requirement , you have to breakdown the task into section with each section you have to create a todo list for that , make sure to generate the output in html format with inline css , you can make table for better dividing task section and their time alloted , use checkboxes for todos  and you can also add referece section for there todos aand provide link for their learning ",
//       },
//       {
//         role:'user',
//         content:`I want to create a schedule for ${userTask}`
//       },
//       {
//         role:'assistant',
//         content:`${timeDuration} where I can give ${dailyTime}`
//       },
//       {
//         role:'user',
//         content:`Great, I have all the necessary information. I will now generate the timetable for ${userTask}`
//       },
//       {
//         role:'assistant',
//         content:'Okhay I got all neccessry information , now i will generate the time table '
//       },
//       {
//         role:'user',
//         content:'Make sure to generate the output in html format , you can use inline css for tableas and bulletpoints or extra , make sure to generate checkbox that need to be clickable'
//       }
//     ],
//     model: "llama3-8b-8192",
//   });
 
//   // console.log("Full API Response:", response);
//   console.log(response.choices[0]?.message?.content || "");
//   const messageContent = response.choices?.[0]?.message?.content || "No response content found";
//     console.log(messageContent);

//     res.status(200).json({ message: messageContent });

// }


// module.exports = { aiResponse };




const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const aiResponse = async (req, res , next) => {
  try {
    const { stage, userTask, timeDuration, dailyTime } = req.body;

    let responseMessage = "";
    let messages = [];

    
    if (!stage || stage === "askTask") {
     
      responseMessage = "What would you like to create a schedule for?";
    } else if (stage === "askDuration" && userTask) {
      
      responseMessage = `Got it! How much time do you have to complete "${userTask}"? (e.g., 3 months, 6 months)`;
    } else if (stage === "askDailyTime" && timeDuration) {
      
      responseMessage = `Great! Now, how much time can you give daily to "${userTask}"? (e.g., 1 hour, 2 hours)`;
    } else if (stage === "generateSchedule" && dailyTime) {
     
      messages = [
        {
          role: "system",
          content: "You are an AI assistant experienced in building custom timetables based on user requirements. Break down the task into sections, create a to-do list for each section, and make sure to  generate the ressponse  in only  html  with inline CSS and use color black(background) and white(text) for the table and in table there will be day ,  task , progress (progress will be based on user ) and referece section( (add content related or per day content related reference link) and one content section in which you have to provide per day content to learn. Use tables and  use horizontal and vertical lines in tables for perfect view  to divide tasks by section and time, and include checkboxes for the to-dos   and the response will have per day content which user have to learn like if user put 2 mothns duration then the resonse will have all 60 days schedule. The response will be catchy , neat or clean and provide the response according to the user provided time duration and per day time availability like what the user have to learn at day 1 then similarly for further days"
        },
        {
          role: 'user',
          content: `I want to create a schedule for "${userTask}".`
        },
        {
          role: 'assistant',
          content: `Got it! The task is "${userTask}".`
        },
        {
          role: 'user',
          content: `I have ${timeDuration} to complete it.`
        },
        {
          role: 'assistant',
          content: `Great, you have ${timeDuration}.`
        },
        {
          role: 'user',
          content: `I can dedicate ${dailyTime} per day.`
        },
        {
          role: 'assistant',
          content: `You are an AI assistant that generates custom timetables. Generate a detailed day-by-day schedule for "${userTask}". Ensure the schedule spans ${timeDuration} days, with tasks spread evenly across each day. Each day should have its own task, progress checkbox, reference link, and content to learn. Make sure no days are skipped. Use inline CSS with a black background and white text, and generate a table with columns for "Day", "Task", "Progress", "Reference", and "Content to Learn". The tasks must be suitable for a person dedicating ${dailyTime} hours per day.`        
        },
        {
          role: 'user',
          content: 'Please generate the output in HTML format, including a detailed breakdown with tables and checkboxes.'
        }
      ];

      const response = await groq.chat.completions.create({
        messages: messages,
        model: "llama3-8b-8192",
      });

      const messageContent = response.choices?.[0]?.message?.content ||  "<p>No response content found</p>";

      return res.status(200).json({ message: messageContent });
    }

    res.status(200).json({ message: responseMessage });
  } catch (error) {
    console.error('Error in AI response generation:', error);
    res.status(500).json({ error: 'An error occurred while generating the response.' });
  }
};

module.exports = { aiResponse };







