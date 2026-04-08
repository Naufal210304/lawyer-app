const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
const authMiddleware = require('../../middlewares/auth.middleware');

// Public
router.post('/login', authController.login);

// Protected (hanya user login)
router.post('/register', authMiddleware, authController.register);

module.exports = router;