const practiceAreaModel = require('./practice_area.model');

const getAllPracticeAreas = async () => {
  try {
    return await practiceAreaModel.getAllPracticeAreas();
  } catch (error) {
    throw new Error('Failed to fetch practice areas: ' + error.message);
  }
};

const getPracticeAreaById = async (id) => {
  try {
    const practiceArea = await practiceAreaModel.getPracticeAreaById(id);
    if (!practiceArea) {
      const error = new Error('Practice area not found');
      error.statusCode = 404;
      throw error;
    }
    return practiceArea;
  } catch (error) {
    throw new Error('Failed to fetch practice area: ' + error.message);
  }
};

const createPracticeArea = async (practiceAreaData) => {
  try {
    if (!practiceAreaData.title || !practiceAreaData.slug || !practiceAreaData.description) {
      const error = new Error('Title, slug, and description are required');
      error.statusCode = 400;
      throw error;
    }
    return await practiceAreaModel.createPracticeArea(practiceAreaData);
  } catch (error) {
    throw new Error('Failed to create practice area: ' + error.message);
  }
};

const updatePracticeArea = async (id, practiceAreaData) => {
  try {
    const existingPracticeArea = await practiceAreaModel.getPracticeAreaById(id);
    if (!existingPracticeArea) {
      const error = new Error('Practice area not found');
      error.statusCode = 404;
      throw error;
    }

    const updatedData = {
      slug: practiceAreaData.slug || existingPracticeArea.slug,
      title: practiceAreaData.title || existingPracticeArea.title,
      description: practiceAreaData.description || existingPracticeArea.description,
      detail: practiceAreaData.detail || existingPracticeArea.detail,
      cases_example: practiceAreaData.cases_example || existingPracticeArea.cases_example,
    };

    await practiceAreaModel.updatePracticeArea(id, updatedData);
    return { id, ...updatedData };
  } catch (error) {
    throw new Error('Failed to update practice area: ' + error.message);
  }
};

const deletePracticeArea = async (id) => {
  try {
    const deletedRows = await practiceAreaModel.deletePracticeArea(id);
    if (!deletedRows) {
      const error = new Error('Practice area not found');
      error.statusCode = 404;
      throw error;
    }
    return true;
  } catch (error) {
    throw new Error('Failed to delete practice area: ' + error.message);
  }
};

module.exports = {
  getAllPracticeAreas,
  getPracticeAreaById,
  createPracticeArea,
  updatePracticeArea,
  deletePracticeArea,
};