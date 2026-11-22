const mongoose = require("mongoose");
const summaryModel = require("../models/summary.model")
const chatModel = require("../models/chat.model");
const { chatWithStudyMaterial } = require("../services/Groq")

async function sendMessage(req, res) {
    try {

        const { summaryId, question, chatId } = req.body;

        // validate input
        if (!summaryId || !question || typeof question !== "string" || !question.trim()) {
            return res.status(400).json({
                success: false,
                message: "SummaryID and question are required"
            });
        }

        if (
            !mongoose.Types.ObjectId.isValid(summaryId) ||
            (chatId && !mongoose.Types.ObjectId.isValid(chatId))
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID"
            });
        }

        if (question.length > 2000) {
            return res.status(400).json({
                success: false,
                message: "Question is too long"
            });
        }

        const summary = await summaryModel.findById(summaryId);

        if (!summary) {
            return res.status(404).json({
                success: false,
                message: "Study material not found",
            })
        }
        // 3. Check summary ownership
        if (summary.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            })
        }

        // Retrieve or create a chat
        let chat;

        if (chatId) {
            chat = await chatModel.findOne({
                _id: chatId,
                userId: req.user._id,
                summaryId: summaryId
            });
            if (!chat) {
                return res.status(404).json({
                    success: false,
                    message: "Chat not found"
                })
            }
        } else {
            chat = new chatModel({
                userId: req.user._id,
                summaryId: summaryId,
                messages: []
            })
        }
        const chatHistory = chat.messages.slice(-10).map((msg) => ({
            role: msg.role,
            content: msg.content
        }));

        const answer = await chatWithStudyMaterial(
            summary.summary,
            chatHistory,
            question.trim()
        );
        chat.messages.push(
            {
                role: "user",
                content: question.trim()
            },
            {
                role: "assistant",
                content: answer
            }
        );

        await chat.save();
        return res.status(200).json({
            success: true,
            chatId: chat._id,
            answer,
            data: chat.messages
        });

    } catch (error) {
        console.error("Chat Controller Error:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while processing your message"
        });
    }
}

module.exports = { sendMessage };