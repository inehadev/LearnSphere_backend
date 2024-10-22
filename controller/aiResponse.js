
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

const aiResponse = async (req, res) => {
  try {
    const { stage, userTask, timeDuration, dailyTime } = req.body;

    let responseMessage = "";
    let messages = [];

    // Handle conversation flow based on the current stage
    if (!stage || stage === "askTask") {
      // Ask the user what task they want the schedule for
      responseMessage = "What would you like to create a schedule for?";
    } else if (stage === "askDuration" && userTask) {
      // Ask for the total duration once task is provided
      responseMessage = `Got it! How much time do you have to complete "${userTask}"? (e.g., 3 months, 6 months)`;
    } else if (stage === "askDailyTime" && timeDuration) {
      // Ask for daily time commitment after duration is provided
      responseMessage = `Great! Now, how much time can you give daily to "${userTask}"? (e.g., 1 hour, 2 hours)`;
    } else if (stage === "generateSchedule" && dailyTime) {
      // Generate the final schedule after all information is collected
      messages = [
        {
          role: "system",
          content: "You are an AI assistant experienced in building custom timetables based on user requirements. Break down the task into sections, create a to-do list for each section, and generate the output in html  format with inline CSS. Use tables and  use horizontal and vertical lines in tables for perfect view  to divide tasks by section and time, and include checkboxes for the to-dos."
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
          content: `Perfect, you can dedicate ${dailyTime} daily. Now I will generate a custom timetable for you.`
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

      const messageContent = response.choices?.[0]?.message?.content || "No response content found";

      return res.status(200).json({ message: messageContent });
    }

    res.status(200).json({ message: responseMessage });
  } catch (error) {
    console.error('Error in AI response generation:', error);
    res.status(500).json({ error: 'An error occurred while generating the response.' });
  }
};

module.exports = { aiResponse };







