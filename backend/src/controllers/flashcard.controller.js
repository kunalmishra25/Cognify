const { generateFlashcards } = require("../services/Groq");
const flashCardModel = require('../models/flashcard.model')
const summaryModel = require("../models/summary.model");
const pdfParse = require('pdf-parse');


async function generateflashcard(req, res) {
    try {
        const { summaryId } = req.body;
        const summary = await summaryModel.findById(summaryId);

        if (!summary) {
            return res.status(404).json({
                success: false,
                message: "Summary not found",
            });
        }
        if (summary.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Access denied",
            });
        }

        // Generate flashcards from the saved summary
        const flashcardResponse = await generateFlashcards(summary.summary);
        const flashcards = JSON.parse(flashcardResponse);
        // Save flashcards
        const savedFlashcards = await flashCardModel.create({
            userId: req.user._id,
            summaryId,
            fileName: summary.fileName,
            flashcards,
        });

        return res.status(201).json({
            success: true,
            data: savedFlashcards,
        });

    } catch (error) {
        console.error("Error generating flashcard:", error);
        return res.status(500).json({
            success: false,
            message: error.message,
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

async function getflashcardBysummaryId(req, res) {
    try {
        const { summaryId } = req.params;
        const flashcard = await flashCardModel.findOne({
            userId: req.user._id,
            summaryId,
        });
        if (!flashcard) {
            return res.status(404).json({
                success: false,
                message: 'Flashcard not found'
            })
        }
        return res.status(200).json({
            success: true,
            data: flashcard
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
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

module.exports = { generateflashcard, getFlashcards, getFlashCardById, getflashcardBysummaryId, deleteflashcard }