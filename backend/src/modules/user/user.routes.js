const express = require('express');
const router = express.Router();
const userController = require('./user.controller');
const authMiddleware = require('../../middlewares/auth.middleware');

// semua butuh login
router.use(authMiddleware);

// GET all users
router.get('/', userController.getAllUsers);

// GET user by id
router.get('/:id', userController.getUserById);

// DELETE user
router.delete('/:id', userController.deleteUser);

module.exports = router;