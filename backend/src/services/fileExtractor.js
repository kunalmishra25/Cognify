const path = require("path");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const PptxParser = require("node-pptx-parser").default;

async function extractText(file) {
    const extension = path.extname(file.originalname).toLowerCase();

    if (extension === ".pdf") {
        const data = await pdfParse(file.buffer);
        return data.text;
    }

    if (extension === ".docx") {
        const result = await mammoth.extractRawText({
            buffer: file.buffer,
        });

        return result.value;
    }
    throw new Error("Unsupported file type");
}
module.exports = { extractText };