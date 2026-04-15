const express = require('express');
const router = express.Router();

const authRoutes = require('../modules/auth/auth.routes');
const blogRoutes = require('../modules/blog/blog.routes');
const userRoutes = require('../modules/user/user.routes');
const teamRoutes = require('../modules/team/team.routes');
const consultationRoutes = require('../modules/consultation/consultation.routes');
const reportRoutes = require('../modules/consultation/report.routes');
const partnerRoutes = require('../modules/partners/partner.routes');
const practiceAreaRoutes = require('../modules/practice_areas/practice_area.routes');

// JSON parsing middleware for routes that need it
router.use('/auth', authRoutes);
router.use('/blogs', blogRoutes);
router.use('/users', userRoutes);
router.use('/consultations', consultationRoutes);
router.use('/reports', reportRoutes);
router.use('/partners', partnerRoutes);
router.use('/practice-areas', practiceAreaRoutes);
// Team routes handle their own multipart parsing
router.use('/team', teamRoutes);

module.exports = router;