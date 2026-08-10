const mongoose = require("mongoose")

const quizSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },

    summaryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Summary",
        required: true
    },
    fileName: {
        type: String,
        required: true,
    },

    quiz: [
        {
            question: {
                type: String,
                required: true,
            },
            options: {
                type: [String],
                required: true,
            },
            answer: {
                type: String,
                required: true,
            }

        }
    ]

},
    {
        timestamps: true
    }
);
const quizModel = mongoose.model("quiz", quizSchema);

module.exports = quizModel