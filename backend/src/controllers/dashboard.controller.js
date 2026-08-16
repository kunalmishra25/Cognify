const summaryModel = require("../models/summary.model");
const flashcardModel = require("../models/flashcard.model")
const quizModel = require("../models/quiz.model")


async function getDashboardStats(req, res) {
    try {
        const totalNotes = await summaryModel.countDocuments({
            userId: req.user._id,
        });
        const totalflashcards = await flashcardModel.countDocuments({
            userId: req.user._id,
        })
        const totalquiz = await quizModel.countDocuments({
            userId: req.user._id,
        })

        const recentuploads = await summaryModel
            .find({ userId: req.user._id })
            .sort({ createdAt: -1 })
            .limit(4)
            .select("_id fileName createdAt");


        res.status(200).json({
            success: true,
            data: {
                documents: totalNotes,
                flashcards: totalflashcards,
                quizzes: totalquiz,
                recentuploads,
            },
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}
module.exports = getDashboardStats;