const express = require('express');
const router = express.Router();
const { generateflashcard } = require('../controllers/flashcard.controller')
const authMiddleware = require('../middlewares/auth.middleware');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });


router.post('/generate', authMiddleware, upload.single('pdf'), generateflashcard)
module.exports = router;
