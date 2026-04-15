const db = require('../../config/db');

const getAllPartners = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM partners ORDER BY id ASC';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Database error fetching partners:', err);
        return reject(err);
      }
      resolve(results);
    });
  });
};

const getPartnerById = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM partners WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0] || null);
    });
  });
};

const createPartner = (partnerData) => {
  return new Promise((resolve, reject) => {
    const { name, logo_url, category } = partnerData;
    const query = 'INSERT INTO partners (name, logo_url, category) VALUES (?, ?, ?)';
    db.query(query, [name, logo_url, category || null], (err, result) => {
      if (err) {
        console.error('Database error inserting partner:', err);
        return reject(err);
      }
      resolve({ id: result.insertId, name, logo_url, category });
    });
  });
};

const updatePartner = (id, partnerData) => {
  return new Promise((resolve, reject) => {
    const { name, logo_url, category } = partnerData;
    const query = 'UPDATE partners SET name = ?, logo_url = ?, category = ? WHERE id = ?';
    db.query(query, [name, logo_url, category || null, id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const deletePartner = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM partners WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result.affectedRows);
    });
  });
};

module.exports = {
  getAllPartners,
  getPartnerById,
  createPartner,
  updatePartner,
  deletePartner,
};