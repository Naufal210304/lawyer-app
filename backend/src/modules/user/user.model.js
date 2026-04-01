const db = require('../../config/db');

const findUserByUsernameOrEmail = (identifier) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE username = ? OR email = ?';
    db.query(query, [identifier, identifier], (err, results) => {
      if (err) reject(err);
      resolve(results[0]); // Return first result
    });
  });
};

const createUser = (userData) => {
  return new Promise((resolve, reject) => {
    const { username, email, password, role_id } = userData;
    const query = 'INSERT INTO users (username, email, password, role_id) VALUES (?, ?, ?, ?)';
    db.query(query, [username, email, password, role_id], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  findUserByUsernameOrEmail,
  createUser
};