const express = require('express');
const router = express.Router();
const { generateflashcard, getFlashcards, getFlashCardById, deleteflashcard } = require('../controllers/flashcard.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });


router.post('/generate', authMiddleware, upload.single('pdf'), generateflashcard)
router.get('/', authMiddleware, getFlashcards);

router.get('/:id', authMiddleware, getFlashCardById);
router.delete('/:id', authMiddleware, deleteflashcard);
module.exports = router;
