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
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}



async function getFlashcards(req, res) {
    try {
        const flashcards = await flashCardModel.find({
            userId: req.user._id
        });

        if (!flashcards.length) {
            return res.status(404).json({
                success: false,
                message: "No Flashcards found"
            });
        }

        res.status(200).json({
            success: true,
            data: flashcards
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message

        });
    }
}

async function getFlashCardById(req, res) {
    try {
        const { id } = req.params;

        const flashcard = await flashCardModel.findById(id);
        if (!flashcard) {
            return res.status(404).json({
                success: false,
                message: "Flashcard Not found"
            })
        }

        if (flashcard.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }

        res.status(200).json({
            success: true,
            data: flashcard
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

async function deleteflashcard(req, res) {
    try {
        const { id } = req.params;
        const findtodelete = await flashCardModel.findById(id);
        if (!findtodelete) {
            return res.status(404).json({
                success: false,
                message: 'FlashCard not found'
            })
        }
        if (findtodelete.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Access Denied'
            })
        }
        await flashCardModel.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: 'Flashcard deleted successfully'
        })
    }
    catch (error) {
        console.error(error);
    }
}

module.exports = { generateflashcard, getFlashcards, getFlashCardById, deleteflashcard }