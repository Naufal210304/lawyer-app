const express = require('express');
const router = express.Router();
const practiceAreaController = require('./practice_area.controller');
const authMiddleware = require('../../middlewares/auth.middleware');

router.use(authMiddleware);

router.get('/', practiceAreaController.getAllPracticeAreas);
router.get('/:id', practiceAreaController.getPracticeAreaById);
router.post('/', practiceAreaController.createPracticeArea);
router.put('/:id', practiceAreaController.updatePracticeArea);
router.delete('/:id', practiceAreaController.deletePracticeArea);

module.exports = router;