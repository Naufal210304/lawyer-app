const express = require('express');
const router = express.Router();
const consultationController = require('./consultation.controller');
const authMiddleware = require('../../middlewares/auth.middleware');

// Public route for client consultation submit
router.post('/', consultationController.createConsultation);

// Protected admin routes
router.use(authMiddleware);
router.get('/', consultationController.getPendingConsultations);
router.get('/stats/count', consultationController.getPendingConsultationsCount);
router.get('/:id', consultationController.getConsultationById);
router.put('/:id/approve', consultationController.approveConsultation);
router.put('/:id/reject', consultationController.rejectConsultation);

module.exports = router;
