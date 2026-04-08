const db = require('../../config/db');

// 🔍 Cari user (login)
const findUserByUsernameOrEmail = (identifier) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE username = ? OR email = ? LIMIT 1';

    db.query(query, [identifier, identifier], (err, results) => {
      if (err) return reject(err); // ✅ FIX

      if (!results || results.length === 0) {
        return resolve(null); // ✅ FIX
      }

      resolve(results[0]);
    });
  });
};

// 🔍 Cari user by email (untuk register)
const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE email = ? LIMIT 1';

    db.query(query, [email], (err, results) => {
      if (err) return reject(err);

      if (!results || results.length === 0) {
        return resolve(null);
      }

      resolve(results[0]);
    });
  });
};

// ➕ Create user
const createUser = (userData) => {
  return new Promise((resolve, reject) => {
    const { username, email, password, role_id } = userData;

    const query = `
      INSERT INTO users (username, email, password, role_id)
      VALUES (?, ?, ?, ?)
    `;

    db.query(query, [username, email, password, role_id], (err, result) => {
      if (err) return reject(err); // ✅ FIX

      resolve({
        id: result.insertId,
        username,
        email,
        role_id
      });
    });
  });
};

module.exports = {
  findUserByUsernameOrEmail,
  findUserByEmail,
  createUser
};