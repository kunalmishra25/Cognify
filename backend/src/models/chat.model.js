const mongoose = require("mongoose")

const chatSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        summaryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "summary",
            required: true,
        },

        messages: [
            {
                role: {
                    type: String,
                    enum: ["user", "assistant"],
                    required: true
                },
                content: {
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

const chatModel = mongoose.model("Chat", chatSchema);

module.exports = chatModel;