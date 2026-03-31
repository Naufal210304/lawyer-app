const express = require('express');
const router = express.Router();
const authRoutes = require('../modules/auth/routes');

// Menghubungkan semua rute dari modul Auth
// URL akan menjadi /api/auth/login dan /api/auth/register
router.use('/auth', authRoutes);

module.exports = router;