const express = require('express')
const multer = require('multer')
const cors = require('cors')
const pdfParse = require('pdf-parse');
const { getSummary } = require('./services/Groq');

const app = express()

//MIDDLEWARE
app.use(cors())
app.use(express.json())

const uploadfile = multer({ storage: multer.memoryStorage() })


app.post('/upload', uploadfile.single("pdf"), async (req, res) => {
    try {
        const data = await pdfParse(req.file.buffer) //extracting data
        const text = data.text;
        // send to gemini
        const summary = await getSummary(text);
        res.status(201).json({
            summary: summary,
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Error processing PDF"
        })
    }
})
module.exports = app