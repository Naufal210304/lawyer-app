const consultationService = require('./consultation.service');

const createConsultation = async (req, res, next) => {
  try {
    const { full_name, phone_number, email, service_area, problem_details } = req.body;

    if (!full_name || !phone_number || !email || !service_area || !problem_details) {
      return res.status(400).json({ message: 'Semua field harus diisi' });
    }

    const consultation = await consultationService.createConsultation({
      full_name,
      phone_number,
      email,
      service_area,
      problem_details,
    });

    res.status(201).json({ success: true, message: 'Konsultasi berhasil dikirim', data: consultation });
  } catch (error) {
    next(error);
  }
};

const getPendingConsultations = async (req, res, next) => {
  try {
    const consultations = await consultationService.getPendingConsultations();
    res.json({ success: true, message: 'Pending consultations fetched successfully', data: consultations });
  } catch (error) {
    next(error);
  }
};

const getConsultationById = async (req, res, next) => {
  try {
    const consultation = await consultationService.getConsultationById(req.params.id);
    if (!consultation) {
      return res.status(404).json({ success: false, message: 'Consultation not found' });
    }
    res.json({ success: true, data: consultation });
  } catch (error) {
    next(error);
  }
};

const approveConsultation = async (req, res, next) => {
  try {
    const report = await consultationService.approveConsultation(req.params.id, req.body?.admin_notes || null);
    res.json({ success: true, message: 'Consultation approved and moved to report', data: report });
  } catch (error) {
    next(error);
  }
};

const rejectConsultation = async (req, res, next) => {
  try {
    const report = await consultationService.rejectConsultation(req.params.id, req.body?.admin_notes || null);
    res.json({ success: true, message: 'Consultation rejected and moved to report', data: report });
  } catch (error) {
    next(error);
  }
};

const getPendingConsultationsCount = async (req, res, next) => {
  try {
    const count = await consultationService.getPendingConsultationsCount();
    res.json({ success: true, message: 'Pending consultations count fetched successfully', data: { count } });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createConsultation,
  getPendingConsultations,
  getConsultationById,
  approveConsultation,
  rejectConsultation,
  getPendingConsultationsCount,
};
