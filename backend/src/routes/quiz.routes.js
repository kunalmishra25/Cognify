const express = require('express');
const router = express.Router();
const { generatequiz, getquizbyid, getquizbysummaryId, getquizzes, deletequiz, saveQuizAttempt, getQuizAttempts } = require('../controllers/quiz.controller')
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/generate', authMiddleware, generatequiz)
router.post('/attempt', authMiddleware, saveQuizAttempt);
router.get('/attempts', authMiddleware, getQuizAttempts);

router.get('/summary/:summaryId', authMiddleware, getquizbysummaryId)
router.get('/:id', authMiddleware, getquizbyid)
router.get('/', authMiddleware, getquizzes)
router.delete('/:id', authMiddleware, deletequiz)




module.exports = router