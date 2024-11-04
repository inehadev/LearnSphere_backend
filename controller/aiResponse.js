const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const aiResponse = async (req, res, next) => {
  try {
    const { stage, userTask } = req.body;

    let responseMessage = "";
    let messages = [];

    if (!stage || stage === "askTask") {
      responseMessage = "What would you like to create a schedule for?";
    }

    

    messages = [
      {
        role: "system",
        content: `You are an AI assistant specializing in creating optimized learning schedules or roadmaps. 
                  Your goal is to create a learning schedule for the provided task ("${userTask}"). 
                  Analyze whether this ${userTask} is suitable for a learning schedule. 
                  If it is not related to scheduling, respond that this ${userTask} is not suitable and do not generate a schedule.
                  
                  If the ${userTask} is valid, create a schedule using general topics instead of specific names. 
                  Avoid using the term "Neha" or any specific product or service name. 
                  Create a structured schedule based on foundational concepts, intermediate, and advanced topics, 
                  including practice exercises and projects. Format the output as an HTML table with inline CSS using a black background, white text, and clear horizontal and vertical lines.
    
                  Include columns for "Day", "Task", "Reference", "Content to Learn", and "Duration".`
      },
      {
        role: "user",
        content: `I want to create a schedule for "${userTask}".`,
      },
      {
        role: "assistant",
        content: `First, let's analyze if "${userTask}" is suitable for creating a learning schedule. 
                  If it is related to learning topics, I will proceed to create a schedule. 
                  Otherwise, I will inform the user that this task is not suitable.`,
      },
      {
        role: "assistant",
        content: `okay i got it , i will create scedule for the "${userTask}".`,
      },
      
      {
        role: "assistant",
        content: `You only need to generate output if the task is related to technology otherwise return i am not unable to process this".`,
      },
      
      {
        role: "user",
        content:
          "Please generate the output in HTML format, use  white text dont generate anything else rather than schedule",
      },
      
    ];

    const response = await groq.chat.completions.create({
      messages: messages,
      model: "llama3-8b-8192",
    });

    const messageContent =
      response.choices?.[0]?.message?.content ||
      "<p>No response content found</p>";

    return res.status(200).json({ message: messageContent });
  } catch (error) {
    console.error("Error in AI response generation:", error);
    res
      .status(500)
      .json({ error: "An error occurred while generating the response." });
  }
};

module.exports = { aiResponse };
