

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
          content: `You are an AI assistant specializing in creating optimized learning schedules OR roadmap. Your goal is to create a learning schedule or roadmap for the provided task ("${userTask}"). 
                  If a specific time duration is not provided, determine the most effective total learning time based on the complexity of the task 
                   .
                  
                    The schedule should:
                    1. Cover foundational concepts, progressing to intermediate and advanced topics.
                    2. Include practice exercises, projects, and a final project to solidify learning.
                    3. Be formatted as an HTML table with inline CSS using a black background, white text, and use  horizontal and vertical lines to make table look clean and user friendly.

                  Please include columns for  "Task," "Reference,"  "Content to Learn" and "Duration to ensure a structured learning journey that balances depth and pacing without overwhelming the user.
`
      },   
       
      {
        role: 'user',
        content: `I want to create a schedule for "${userTask}".`
      },
      {
        role: 'assistant',
        content: `okay i got it , i will create scedule for the "${userTask}".`
      },
        {
          role: 'user',
          content: 'Please generate the output in HTML format, use  white text dont generate anything else rather than schedule'
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







