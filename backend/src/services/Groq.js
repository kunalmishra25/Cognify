const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API
});

async function getSummary(text) {
    try {
        const response = await groq.chat.completions.create({
            model: "openai/gpt-oss-20b",
            messages: [
                {
                    role: "system",
                    content: `
You are an AI study assistant.

Convert the provided material into clean, short study notes.

Rules:
- Use normal Markdown.
- Use headings and bullet points when useful.
- Keep the notes concise and easy for students to study.
- Do not create unnecessary tables.
- Do not escape Markdown characters.
- Do not output literal \\n characters.
- Do not add greetings, conclusions, or unnecessary commentary.
- Only summarize the information provided.
                    `
                },
                {
                    role: "user",
                    content: text
                }
            ],
            temperature: 0.3
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
            model: "openai/gpt-oss-20b",
            messages: [
                {
                    role: "system",
                    content: `
You are an AI study assistant.

Generate exactly 10 flashcards from the provided study material.

Return ONLY a valid JSON array.

Each flashcard must have exactly these fields:
- question
- answer

Do not include Markdown.
Do not include code fences.
Do not include explanations.
Do not include any text before or after the JSON.
                    `
                },
                {
                    role: "user",
                    content: text
                }
            ],
            response_format: {
                type: "json_object"
            },
            temperature: 0.2
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error("Groq Error:", error);
        throw error;
    }
}

async function generateQuiz(text) {
    try {
        const response = await groq.chat.completions.create({
            model: "openai/gpt-oss-20b",

            messages: [
                {
                    role: "system",
                    content: `
You are an AI study assistant.

Generate exactly 10 multiple-choice questions based ONLY on the study material provided by the user.

Return a JSON object with this exact structure:

{
  "questions": [
    {
      "question": "Question text",
      "options": [
        "Option 1",
        "Option 2",
        "Option 3",
        "Option 4"
      ],
      "correctAnswer": "Option 1"
    }
  ]
}

Rules:
- Return exactly 10 questions.
- Each question must have exactly 4 options.
- Each question must have exactly one correct answer.
- correctAnswer must exactly match one of the four options.
- Questions must be based only on the provided study material.
- Keep questions clear and suitable for students.
- Return JSON only.
- Do not use Markdown.
- Do not use code fences.
- Do not include explanations outside the JSON.
                    `
                },
                {
                    role: "user",
                    content: text
                }
            ],

            response_format: {
                type: "json_object"
            },

            temperature: 0.2
        });

        const content = response.choices[0].message.content;

        return content;

    } catch (error) {
        console.error("Groq Quiz Error:", error);
        throw error;
    }
}

module.exports = {
    getSummary,
    generateFlashcards,
    generateQuiz
};