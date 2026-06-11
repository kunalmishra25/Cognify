const summaryModel = require('../models/summary.model')
const pdfParse = require('pdf-parse');
const { getSummary } = require('../services/Groq');

/**
 * Controller to handle PDF upload, extract text, generate summary, and respond.
 */
async function generateSummary(req, res) {
    try {
        console.log("Controller Hit");
        console.log("User:", req.user);
        console.log("File:", req.file?.originalname);
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
        console.log("Summary Saved");
        // Respond with summary
        res.status(201).json({ summary });
    } catch (error) {
        console.error('Error generating summary:', error);
        res.status(500).json({ message: 'Error processing PDF' });
    }
}

module.exports = { generateSummary };