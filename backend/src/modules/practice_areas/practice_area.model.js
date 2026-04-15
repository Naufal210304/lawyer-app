const db = require('../../config/db');

const getAllPracticeAreas = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM practice_areas ORDER BY id ASC';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Database error fetching practice areas:', err);
        return reject(err);
      }
      resolve(results);
    });
  });
};

const getPracticeAreaById = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM practice_areas WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0] || null);
    });
  });
};

const createPracticeArea = (practiceAreaData) => {
  return new Promise((resolve, reject) => {
    const { slug, title, description, detail, cases_example } = practiceAreaData;
    const query = 'INSERT INTO practice_areas (slug, title, description, detail, cases_example) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [slug, title, description, detail, cases_example], (err, result) => {
      if (err) {
        console.error('Database error inserting practice area:', err);
        return reject(err);
      }
      resolve({ id: result.insertId, slug, title, description, detail, cases_example });
    });
  });
};

const updatePracticeArea = (id, practiceAreaData) => {
  return new Promise((resolve, reject) => {
    const { slug, title, description, detail, cases_example } = practiceAreaData;
    const query = 'UPDATE practice_areas SET slug = ?, title = ?, description = ?, detail = ?, cases_example = ? WHERE id = ?';
    db.query(query, [slug, title, description, detail, cases_example, id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const deletePracticeArea = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM practice_areas WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result.affectedRows);
    });
  });
};

module.exports = {
  getAllPracticeAreas,
  getPracticeAreaById,
  createPracticeArea,
  updatePracticeArea,
  deletePracticeArea,
};