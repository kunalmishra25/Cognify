const { generateFlashcards } = require("../services/Groq");
const flashCardModel = require('../models/flashcard.model')
const pdfParse = require('pdf-parse');


async function generateflashcard(req, res) {
    try {
        const data = await pdfParse(req.file.buffer);
        const text = data.text;

        const flashcardResponse = await generateFlashcards(text);
        const flashcards = JSON.parse(flashcardResponse);

        const savedFlashcards = await flashCardModel.create({
            userId: req.user._id,
            fileName: req.file.originalname,
            flashcards,
        });
        res.status(201).json({
            success: true,
            data: savedFlashcards
        });
    }
    catch (error) {
        console.error('Error generating flashcard:', error);
        res.status(500).json({ message: 'Error processing PDF' });
    }
}


module.exports = { generateflashcard }