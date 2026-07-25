const summaryModel = require("../models/summary.model");

async function getDashboardStats(req, res) {
    try {
        const totalNotes = await summaryModel.countDocuments({
            userId: req.user._id,
        });
        res.status(200).json({
            success: true,
            data: {
                documents: totalNotes,
                flashcards: 0,
                quizzes: 0,
                streak: 0,
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