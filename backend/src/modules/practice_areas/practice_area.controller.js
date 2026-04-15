const practiceAreaService = require('./practice_area.service');

const getAllPracticeAreas = async (req, res, next) => {
  try {
    const practiceAreas = await practiceAreaService.getAllPracticeAreas();
    res.json({ success: true, message: 'Practice areas fetched successfully', data: practiceAreas });
  } catch (error) {
    next(error);
  }
};

const getPracticeAreaById = async (req, res, next) => {
  try {
    const practiceArea = await practiceAreaService.getPracticeAreaById(req.params.id);
    res.json({ success: true, message: 'Practice area fetched successfully', data: practiceArea });
  } catch (error) {
    next(error);
  }
};

const createPracticeArea = async (req, res, next) => {
  try {
    const practiceAreaData = {
      slug: req.body.slug,
      title: req.body.title,
      description: req.body.description,
      detail: req.body.detail,
      cases_example: req.body.cases_example,
    };

    const practiceArea = await practiceAreaService.createPracticeArea(practiceAreaData);
    res.status(201).json({ success: true, message: 'Practice area created successfully', data: practiceArea });
  } catch (error) {
    next(error);
  }
};

const updatePracticeArea = async (req, res, next) => {
  try {
    const practiceAreaData = {
      slug: req.body.slug,
      title: req.body.title,
      description: req.body.description,
      detail: req.body.detail,
      cases_example: req.body.cases_example,
    };

    const practiceArea = await practiceAreaService.updatePracticeArea(req.params.id, practiceAreaData);
    res.json({ success: true, message: 'Practice area updated successfully', data: practiceArea });
  } catch (error) {
    next(error);
  }
};

const deletePracticeArea = async (req, res, next) => {
  try {
    await practiceAreaService.deletePracticeArea(req.params.id);
    res.json({ success: true, message: 'Practice area deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPracticeAreas,
  getPracticeAreaById,
  createPracticeArea,
  updatePracticeArea,
  deletePracticeArea,
};