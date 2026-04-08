const express = require('express');
const router = express.Router();

const authRoutes = require('../modules/auth/auth.routes');
const blogRoutes = require('../modules/blog/blog.routes');
const userRoutes = require('../modules/user/user.routes');

router.use('/auth', authRoutes);
router.use('/blogs', blogRoutes);
router.use('/users', userRoutes);

module.exports = router;