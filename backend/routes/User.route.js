const express = require('express');
const router = express.Router();

const {
    signup,
    login,
    list
} = require('../controllers/User.controller.js');

router.post("/signup", signup);
router.post("/login", login);
router.get("/list", list);

module.exports = router;