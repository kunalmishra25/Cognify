const mongoose = require("mongoose");

const flashcardSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        },
        fileName: {
            type: String,
            required: true
        },
        flashcards: [
            {
                question: {
                    type: String,
                    required: true,
                },
                answer: {
                    type: String,
                    required: true,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);
const flashcardModel = mongoose.model("Flashcard", flashcardSchema);
module.exports = flashcardModel;