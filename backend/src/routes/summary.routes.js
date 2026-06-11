const express = require('express');
const router = express.Router();
const { generateSummary } = require('../controllers/summary.controller');
const multer = require('multer');
const authMiddleware = require('../middlewares/auth.middleware');
const upload = multer({ storage: multer.memoryStorage() });

// POST /api/summary to process PDF and return summary
router.post('/upload', authMiddleware, upload.single('pdf'), generateSummary);

module.exports = router;
