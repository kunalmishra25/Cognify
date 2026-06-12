const summaryModel = require('../models/summary.model')
const pdfParse = require('pdf-parse');
const { getSummary } = require('../services/Groq');
/**
 * Controller to handle PDF upload, extract text, generate summary, and respond.
 */
async function generateSummary(req, res) {
    try {
        // Parse PDF buffer
        const data = await pdfParse(req.file.buffer);
        const text = data.text;
        // Get summary from Groq service
        const summary = await getSummary(text);
        await summaryModel.create({
            userId: req.user._id,
            fileName: req.file.originalname,
            summary: summary
        })
        // Respond with summary
        res.status(201).json({ summary });
    } catch (error) {
        console.error('Error generating summary:', error);
        res.status(500).json({ message: 'Error processing PDF' });
    }
}


async function getSummaries(req, res) {
    try {
        const summaries = await summaryModel.find({
            userId: req.user._id
        });

        if (!summaries.length) {
            return res.status(404).json({
                success: false,
                message: "No summaries found"
            });
        }

        res.status(200).json({
            success: true,
            data: summaries
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message

        });
    }
}

module.exports = { generateSummary, getSummaries };