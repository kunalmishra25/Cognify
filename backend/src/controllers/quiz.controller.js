const { generateQuiz } = require('../services/Groq')
const quizModel = require('../models/quiz.model')
const summaryModel = require('../models/summary.model')

async function generatequiz(req, res) {
    try {

        const { summaryId } = req.body;
        const summary = await summaryModel.findById(summaryId);
        if (!summary) {
            return res.status(404).json({
                success: false,
                message: "Summary not found"
            })
        }

        if (summary.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            })
        }

        // generate quiz from saved summary
        const quizResponse = await generateQuiz(summary.summary);
        const quiz = JSON.parse(quizResponse);

        const savedQuiz = await quizModel.create({
            userId: req.user._id,
            summaryId,
            fileName: summary.fileName,
            quiz,
        });
        return res.status(201).json({
            success: true,
            data: savedQuiz,
        })
    } catch (error) {
        console.error("Error geenrating quiz", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }

}