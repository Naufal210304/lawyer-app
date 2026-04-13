const express = require('express');
const router = express.Router();

const authRoutes = require('../modules/auth/auth.routes');
const blogRoutes = require('../modules/blog/blog.routes');
const userRoutes = require('../modules/user/user.routes');
const teamRoutes = require('../modules/team/team.routes');
const consultationRoutes = require('../modules/consultation/consultation.routes');
const reportRoutes = require('../modules/consultation/report.routes');

// JSON parsing middleware for routes that need it
router.use('/auth', express.json(), authRoutes);
router.use('/blogs', express.json(), blogRoutes);
router.use('/users', express.json(), userRoutes);
router.use('/consultations', express.json(), consultationRoutes);
router.use('/reports', express.json(), reportRoutes);
// Team routes handle their own multipart parsing
router.use('/team', teamRoutes);

module.exports = router;