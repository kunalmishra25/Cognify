const express = require("express")
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const { sendMessage } = require("../controllers/chat.controller")

router.post("/send", authMiddleware, sendMessage);

module.exports = router;