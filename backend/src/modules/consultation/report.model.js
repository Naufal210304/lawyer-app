const db = require('../../config/db');

const insertReport = (reportData) => {
  return new Promise((resolve, reject) => {
    const { full_name, phone_number, email, service_area, problem_details, status, admin_notes } = reportData;
    const query = `
      INSERT INTO consultation_reports (full_name, phone_number, email, service_area, problem_details, status, admin_notes, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
    `;
    db.query(
      query,
      [full_name, phone_number, email, service_area, problem_details, status, admin_notes || null],
      (err, result) => {
        if (err) {
          console.error('Database error inserting consultation report:', err);
          return reject(err);
        }
        resolve({ id: result.insertId, full_name, phone_number, email, service_area, problem_details, status, admin_notes: admin_notes || null, created_at: new Date() });
      }
    );
  });
};

const getAllReports = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM consultation_reports ORDER BY created_at DESC';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Database error fetching consultation reports:', err);
        return reject(err);
      }
      resolve(results);
    });
  });
};

const getReportById = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM consultation_reports WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0] || null);
    });
  });
};

module.exports = {
  insertReport,
  getAllReports,
  getReportById,
};
