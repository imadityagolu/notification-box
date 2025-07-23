const express = require('express');
const router = express.Router();

const {
    addMessage,
    showMessage
} = require('../controllers/Message.controller');

router.post("/add", addMessage);
router.get("/show", showMessage);

module.exports = router;