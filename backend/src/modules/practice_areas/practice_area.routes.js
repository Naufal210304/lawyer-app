const express = require('express');
const router = express.Router();
const practiceAreaController = require('./practice_area.controller');
const authMiddleware = require('../../middlewares/auth.middleware');

// Public endpoints
router.get('/', practiceAreaController.getAllPracticeAreas);
router.get('/:id', practiceAreaController.getPracticeAreaById);

// Protected endpoints (admin)
router.post('/', authMiddleware, practiceAreaController.createPracticeArea);
router.put('/:id', authMiddleware, practiceAreaController.updatePracticeArea);
router.delete('/:id', authMiddleware, practiceAreaController.deletePracticeArea);

module.exports = router;