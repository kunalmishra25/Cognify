const { generateQuiz: generateQuizFromGroq } = require('../services/Groq')
const quizModel = require('../models/quiz.model')
const quizAttemptModel = require('../models/quizAttempt.model');
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
        const quizResponse = await generateQuizFromGroq(summary.summary);
        const quiz = JSON.parse(quizResponse).questions;

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
        console.error("Error generating quiz", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }

}

async function getquizbyid(req, res) {
    try {
        const { id } = req.params;
        const quiz = await quizModel.findById(id);

        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: "quiz not found"
            })
        }
        if (quiz.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }
        res.status(200).json({
            success: true,
            data: quiz
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

async function getquizbysummaryId(req, res) {
    try {
        const { summaryId } = req.params;
        const quiz = await quizModel.findOne({
            userId: req.user._id,
            summaryId,
        });
        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: "Quiz not found"
            })
        }
        return res.status(200).json({
            success: true,
            data: quiz
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

async function getquizzes(req, res) {
    try {
        const quizzes = await quizModel.find({
            userId: req.user._id
        });

        if (!quizzes.length) {
            return res.status(404).json({
                success: false,
                message: "No quizzes found"
            });
        }

        return res.status(200).json({
            success: true,
            data: quizzes
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function deletequiz(req, res) {
    try {
        const { id } = req.params;

        const quiz = await quizModel.findById(id);

        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: "Quiz not found"
            });
        }

        if (quiz.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }

        await quizModel.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Quiz deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function saveQuizAttempt(req, res) {
    try {
        const { quizId, answers } = req.body;
        // validate req data

        if (!quizId || !Array.isArray(answers)) {
            return req.status(400).json({
                success: false,
                message: "Quiz id and answers are required"
            })
        }

        const quiz = await quizModel.findById(quizId);
        if (!quiz) {
            return res.status(404), json({
                success: false,
                message: "Quiz not found",
            })
        }

        // quiz ownership
        if (quiz.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });

        }
        // Ensure all questions have been answered

        if (answers.length !== quiz.quiz.length) {
            return res.status(400).json({
                success: false,
                message: "Please answer all questions"
            })
        }


        //calculate score

        let score = 0;
        quiz.quiz.forEach((question, index) => {
            const isCorrect = answers[index] === question.correctAnswer;
            if (isCorrect) {
                score++;
            }
        });

        const totalQuestions = quiz.quiz.length;

        const percentage = Math.round(
            (score / totalQuestions) * 100
        );

        // store in db
        const savedAttempt = await quizAttemptModel.create({
            userId: req.user_id,
            quizId: quiz._id,
            score,
            totalQuestions, percentage
        });

        return res.status(201).json({
            success: true,
            message: "Quiz result saved successfully",
            data: savedAttempt
        });

    } catch (error) {
        console.error("Error saving quiz", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = { generatequiz, getquizbysummaryId, getquizbyid, getquizzes, deletequiz, saveQuizAttempt }