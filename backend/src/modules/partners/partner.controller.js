const partnerService = require('./partner.service');

const getAllPartners = async (req, res, next) => {
  try {
    const partners = await partnerService.getAllPartners();
    res.json({ success: true, message: 'Partners fetched successfully', data: partners });
  } catch (error) {
    next(error);
  }
};

const getPartnerById = async (req, res, next) => {
  try {
    const partner = await partnerService.getPartnerById(req.params.id);
    res.json({ success: true, message: 'Partner fetched successfully', data: partner });
  } catch (error) {
    next(error);
  }
};

const createPartner = async (req, res, next) => {
  try {
    const partnerData = {
      name: req.body.name,
      category: req.body.category,
      logo_url: req.file ? `/uploads/${req.file.filename}` : req.body.logo_url,
    };

    const partner = await partnerService.createPartner(partnerData);
    res.status(201).json({ success: true, message: 'Partner created successfully', data: partner });
  } catch (error) {
    next(error);
  }
};

const updatePartner = async (req, res, next) => {
  try {
    const partnerData = {
      name: req.body.name,
      category: req.body.category,
      logo_url: req.file ? `/uploads/${req.file.filename}` : req.body.logo_url,
    };

    const partner = await partnerService.updatePartner(req.params.id, partnerData);
    res.json({ success: true, message: 'Partner updated successfully', data: partner });
  } catch (error) {
    next(error);
  }
};

const deletePartner = async (req, res, next) => {
  try {
    await partnerService.deletePartner(req.params.id);
    res.json({ success: true, message: 'Partner deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPartners,
  getPartnerById,
  createPartner,
  updatePartner,
  deletePartner,
};