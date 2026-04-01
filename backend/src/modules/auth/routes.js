const express = require('express');
const router = express.Router();
const authController = require('./controller');

// Rute untuk Login
router.post('/login', authController.login);

// Rute untuk Registrasi Admin (biasanya digunakan oleh Superadmin)
router.post('/register', authController.register);

module.exports = router;