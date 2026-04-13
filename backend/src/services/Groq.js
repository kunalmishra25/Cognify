const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API
});

async function getSummary(text) {
    try {
        const response = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: `Summarize this into clean short study notes:\n\n${text}`,
                },
            ],
            model: "llama-3.1-8b-instant"
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error("Groq Error:", error);
        throw error;
    }
}

module.exports = { getSummary };