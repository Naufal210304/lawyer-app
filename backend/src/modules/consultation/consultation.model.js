const db = require('../../config/db');

const getAllPendingConsultations = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM consultations ORDER BY created_at DESC';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Database error fetching pending consultations:', err);
        return reject(err);
      }
      resolve(results);
    });
  });
};

const getConsultationById = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM consultations WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0] || null);
    });
  });
};

const createConsultation = (consultationData) => {
  return new Promise((resolve, reject) => {
    const { full_name, phone_number, email, service_area, problem_details } = consultationData;
    const query = `
      INSERT INTO consultations (full_name, phone_number, email, service_area, problem_details, status, created_at)
      VALUES (?, ?, ?, ?, ?, 'pending', NOW())
    `;
    db.query(query, [full_name, phone_number, email, service_area, problem_details], (err, result) => {
      if (err) {
        console.error('Database error creating consultation:', err);
        return reject(err);
      }
      resolve({ id: result.insertId, full_name, phone_number, email, service_area, problem_details, status: 'pending', created_at: new Date() });
    });
  });
};

const deleteConsultation = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM consultations WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const getPendingConsultationsCount = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT COUNT(*) as count FROM consultations';
    db.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results[0]?.count || 0);
    });
  });
};

module.exports = {
  getAllPendingConsultations,
  getConsultationById,
  createConsultation,
  deleteConsultation,
  getPendingConsultationsCount,
};
