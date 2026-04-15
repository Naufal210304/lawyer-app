const partnerModel = require('./partner.model');

const getAllPartners = async () => {
  try {
    return await partnerModel.getAllPartners();
  } catch (error) {
    throw new Error('Failed to fetch partners: ' + error.message);
  }
};

const getPartnerById = async (id) => {
  try {
    const partner = await partnerModel.getPartnerById(id);
    if (!partner) {
      const error = new Error('Partner not found');
      error.statusCode = 404;
      throw error;
    }
    return partner;
  } catch (error) {
    throw new Error('Failed to fetch partner: ' + error.message);
  }
};

const createPartner = async (partnerData) => {
  try {
    if (!partnerData.name || !partnerData.logo_url) {
      const error = new Error('Name and logo are required');
      error.statusCode = 400;
      throw error;
    }
    return await partnerModel.createPartner(partnerData);
  } catch (error) {
    throw new Error('Failed to create partner: ' + error.message);
  }
};

const updatePartner = async (id, partnerData) => {
  try {
    const existingPartner = await partnerModel.getPartnerById(id);
    if (!existingPartner) {
      const error = new Error('Partner not found');
      error.statusCode = 404;
      throw error;
    }

    const updatedData = {
      name: partnerData.name || existingPartner.name,
      logo_url: partnerData.logo_url ?? existingPartner.logo_url,
      category: partnerData.category || existingPartner.category,
    };

    await partnerModel.updatePartner(id, updatedData);
    return { id, ...updatedData };
  } catch (error) {
    throw new Error('Failed to update partner: ' + error.message);
  }
};

const deletePartner = async (id) => {
  try {
    const deletedRows = await partnerModel.deletePartner(id);
    if (!deletedRows) {
      const error = new Error('Partner not found');
      error.statusCode = 404;
      throw error;
    }
    return true;
  } catch (error) {
    throw new Error('Failed to delete partner: ' + error.message);
  }
};

module.exports = {
  getAllPartners,
  getPartnerById,
  createPartner,
  updatePartner,
  deletePartner,
};