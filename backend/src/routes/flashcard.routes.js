const express = require('express');
const router = express.Router();
const { generateflashcard, getFlashcards, getFlashCardById, deleteflashcard, getflashcardBysummaryId } = require('../controllers/flashcard.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/generate', authMiddleware, generateflashcard)
router.get('/', authMiddleware, getFlashcards);

router.get('/:id', authMiddleware, getFlashCardById);
router.delete('/:id', authMiddleware, deleteflashcard);
router.get('/summary/:summaryId', authMiddleware, getflashcardBysummaryId);
module.exports = router;
