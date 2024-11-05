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
          content: `You are an AI assistant specializing in creating personalized learning schedules. When a user provides a task, 
                    analyze its relevance to education, technology, or programming. If the task is irrelevant (such as a name, place,
                     or non-educational concept), respond only with the message:
                     "I apologize, but '{userTask}' is not a task or subject related to education, technology, or programming. Therefore, 
                     a learning schedule is not relevant for this task. However, if you'd like to provide a different task or subject, I'd be
                      happy to assist you in creating a personalized learning schedule."
                     
                     Do not generate any example tables or additional information in this case.
                     
                     If the task is relevant, proceed to create a detailed HTML table schedule formatted with inline CSS for a black background 
                     and white text with clean borders for readability. The table should include:
                     - **Day**: Sequential day of the schedule.
                     - **Task**: Daily learning task description.
                     - **Content to Learn**: Key concepts or skills for the day.
                     - **Reference**: Useful resources (like official docs or popular tutorials , provide official docs links).
                     - **Duration**: Estimated time for each day’s task.`
        },
        
      {
        role: "user",
        content: `Please create a schedule for "${userTask}".`,
      },
      {
        role: "assistant",
        content: `I’ll first check if "${userTask}" is appropriate for a structured learning schedule. If it is, I’ll proceed with creating it.`,
      },
      {
        role: "user",
        content: "Generate the schedule as an HTML table with white text on a black background, please.",
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
