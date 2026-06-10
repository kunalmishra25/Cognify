const mongoose = require("mongoose")

const summarySchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    summary: {
        type: String
    },
    createdAt: {
        type: String,
        required: true
    }
})

const summaryModel = mongoose.model("summary", summarySchema)
module.exports = summaryModel
