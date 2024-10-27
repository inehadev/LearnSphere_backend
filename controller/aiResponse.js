

const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const aiResponse = async (req, res , next) => {
  try {
    const { stage, userTask, timeDuration, dailyTime } = req.body;

    let responseMessage = "";
    let messages = [];

    
    if (!stage || stage === "askTask") {
     
      responseMessage = "What would you like to create a schedule for?";
    } 
   
      messages = [
        {
          role: "system",
          content: `You are an AI assistant experienced in creating learning schedules. Using your understanding, create a custom learning schedule for the provided ${userTask} with optimized durations for each module based on essential learning needs for beginners to intermediate learners. The schedule should cover foundational concepts, progress to more complex topics, and include practice exercises or projects, concluding with a final project to solidify learning. 

                Generate this as a table in HTML with inline CSS. Include columns for "Day," "Task," "Progress," "Reference," and "Content to Learn." Adjust the timeline for each topic to ensure effective pacing, providing enough time for skill building without overwhelming or underestimating the necessary learning duration. 
                - use horizontal and vertical line for the table `
      },   
       
      {
        role: 'user',
        content: `I want to create a schedule for "${userTask}".`
      },
      {
        role: 'assistant',
        content: `You are an AI assistant experienced in creating learning schedules. Using your understanding, create a custom learning schedule for the provided ${userTask} with optimized durations for each module based on essential learning needs for beginners to intermediate learners. The schedule should cover foundational concepts, progress to more complex topics, and include practice exercises or projects, concluding with a final project to solidify learning. 
                    Generate this as a table in HTML with inline CSS. Include columns for  "Task," "Progress," "Reference," and "Content to Learn." Adjust the timeline for each topic to ensure effective pacing, providing enough time for skill building without overwhelming or underestimating the necessary learning duration. 
`      },
        {
          role: 'user',
          content: 'Please generate the output in HTML format, use black backgorund and white text'
        }
      ];

      const response = await groq.chat.completions.create({
        messages: messages,
        model: "llama3-8b-8192",
      });

      const messageContent = response.choices?.[0]?.message?.content ||  "<p>No response content found</p>";

      return res.status(200).json({ message: messageContent });
    }
  

    
  
   catch (error) {
    console.error('Error in AI response generation:', error);
    res.status(500).json({ error: 'An error occurred while generating the response.' });
  }
};

module.exports = { aiResponse };







