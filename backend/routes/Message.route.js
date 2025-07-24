const express = require('express');
const router = express.Router();

const {
    addMessage,
    showMessage,
    markAllAsRead
} = require('../controllers/Message.controller');

router.post("/add", addMessage);
router.get("/show", showMessage);
router.post("/markAllAsRead", markAllAsRead);

module.exports = router;