const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
const authMiddleware = require('../../middlewares/auth.middleware');

// Public
router.post('/login', authController.login);
router.post('/register', authController.register);

// Protected (hanya user login)
router.get('/me', authMiddleware, authController.me);
router.get('/pending/count', authMiddleware, authController.getPendingUsersCount);
router.get('/pending', authMiddleware, authController.getPendingUsers);
router.put('/pending/:id/approve', authMiddleware, authController.approvePendingUser);
router.delete('/pending/:id/reject', authMiddleware, authController.rejectPendingUser);

module.exports = router;