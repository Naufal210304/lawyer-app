const consultationModel = require('./consultation.model');
const reportModel = require('./report.model');

const createConsultation = async (consultationData) => {
  return consultationModel.createConsultation(consultationData);
};

const getPendingConsultations = async () => {
  return consultationModel.getAllPendingConsultations();
};

const getConsultationById = async (id) => {
  return consultationModel.getConsultationById(id);
};

const approveConsultation = async (id, adminNotes) => {
  const consultation = await consultationModel.getConsultationById(id);
  if (!consultation) {
    const error = new Error('Consultation not found');
    error.statusCode = 404;
    throw error;
  }

  const reportRow = {
    full_name: consultation.full_name,
    phone_number: consultation.phone_number,
    email: consultation.email,
    service_area: consultation.service_area,
    problem_details: consultation.problem_details,
    status: 'Approved',
    admin_notes: adminNotes || null,
  };

  const report = await reportModel.insertReport(reportRow);
  await consultationModel.deleteConsultation(id);
  return report;
};

const rejectConsultation = async (id, adminNotes) => {
  const consultation = await consultationModel.getConsultationById(id);
  if (!consultation) {
    const error = new Error('Consultation not found');
    error.statusCode = 404;
    throw error;
  }

  const reportRow = {
    full_name: consultation.full_name,
    phone_number: consultation.phone_number,
    email: consultation.email,
    service_area: consultation.service_area,
    problem_details: consultation.problem_details,
    status: 'Rejected',
    admin_notes: adminNotes || null,
  };

  const report = await reportModel.insertReport(reportRow);
  await consultationModel.deleteConsultation(id);
  return report;
};

const getReports = async () => {
  return reportModel.getAllReports();
};

const getReportById = async (id) => {
  return reportModel.getReportById(id);
};

const deleteReport = async (id) => {
  const deletedRows = await reportModel.deleteReport(id);
  if (!deletedRows) {
    const error = new Error('Report not found');
    error.statusCode = 404;
    throw error;
  }
  return true;
};

const getPendingConsultationsCount = async () => {
  return consultationModel.getPendingConsultationsCount();
};

module.exports = {
  createConsultation,
  getPendingConsultations,
  getConsultationById,
  approveConsultation,
  rejectConsultation,
  getReports,
  getReportById,
  deleteReport,
  getPendingConsultationsCount,
};
