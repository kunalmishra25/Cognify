const Groq = require("groq-sdk");
const { model } = require("mongoose");

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

async function generateFlashcards(text) {
    try {
        const response = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: `
                        You are an AI study assistant.

                            Generate exactly 10 flashcards from the following text.

                            Return ONLY valid JSON.     

                                Format: 
                                    [
                                        {
                                            "question": "Question here",
                                            "answer": "Answer here"
                                    }
                                        ]
                                            Text:${text},`
                },
            ],
            model: "llama-3.1-8b-instant"
        });

        return response.choices[0].message.content;
    }
    catch (error) {
        console.error("Groq Error:", error);
        throw error;
    }
}

async function generateQuiz(text) {
    try {
        const response = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: `
Create exactly 10 multiple-choice questions from the study material below.

Return ONLY valid JSON.
Do not include markdown, code fences, explanations, or extra text.

The JSON must be an array in this exact format:

[
    {
        "question": "Question here",
        "options": [
            "Option A",
            "Option B",
            "Option C",
            "Option D"
        ],
        "correctAnswer": "Option A"
    }
]

Rules:
- Create exactly 10 questions.
- Each question must have exactly 4 options.
- Only one option should be correct.
- The correctAnswer must exactly match one of the options.
- Questions should be based only on the provided study material.
- Keep questions clear and suitable for students.

Study material:

${text}
                    `,
                },
            ],
            model: "llama-3.1-8b-instant",
        });

        return response.choices[0].message.content;

    } catch (error) {
        console.error("Groq Quiz Error:", error);
    }
}

module.exports = { getSummary, generateFlashcards, generateQuiz };