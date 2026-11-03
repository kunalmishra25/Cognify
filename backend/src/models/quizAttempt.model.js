const mongoose = require('mongoose');

const quizAttemptSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            require: true,
        },
        quizId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'quiz',
            require: true,
        },
        score: {
            type: Number,
            require: true,
        },
        totalQuestions: {
            type: number,
            require: true,
        },
        percentage: {
            type: Number,
            require: true,
        },
    },
    {
        timestamps: true,
    }
);

const quizAttemptModel = mongoose.model("QuizAttempt", quizAttemptSchema);

module.exports = quizAttemptModel;