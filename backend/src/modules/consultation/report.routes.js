const express = require('express');
const router = express.Router();
const reportService = require('./consultation.service');
const authMiddleware = require('../../middlewares/auth.middleware');

router.use(authMiddleware);

router.get('/', async (req, res, next) => {
  try {
    const reports = await reportService.getReports();
    res.json({ success: true, message: 'Reports fetched successfully', data: reports });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const report = await reportService.getReportById(req.params.id);
    if (!report) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }
    res.json({ success: true, message: 'Report fetched successfully', data: report });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
