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

// GET ALL USERS
const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT id, username, email, phone_number, profile_pic, role_id FROM users';

    db.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// GET USER BY ID
const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT id, username, email, phone_number, profile_pic, role_id FROM users WHERE id = ?';

    db.query(query, [id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0] || null);
    });
  });
};

const getUserByIdWithPassword = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT id, username, email, password, phone_number, profile_pic, role_id FROM users WHERE id = ?';

    db.query(query, [id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0] || null);
    });
  });
};

// UPDATE USER
const updateUser = (id, userData) => {
  return new Promise((resolve, reject) => {
    const { username, email, phone_number, profile_pic } = userData;

    const query = `
      UPDATE users
      SET username = ?, email = ?, phone_number = ?, profile_pic = ?
      WHERE id = ?
    `;

    db.query(query, [username, email, phone_number || null, profile_pic || null, id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// UPDATE USER PASSWORD
const updateUserPassword = (id, hashedPassword) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE users SET password = ? WHERE id = ?';
    db.query(query, [hashedPassword, id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// DELETE USER
const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM users WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result.affectedRows > 0);
    });
  });
};

// ➕ Create user
const createUser = (userData) => {
  return new Promise((resolve, reject) => {
    const { username, email, password, phone_number, profile_pic, role_id } = userData;

    const query = `
      INSERT INTO users (username, email, password, phone_number, profile_pic, role_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [username, email, password, phone_number || null, profile_pic || null, role_id], (err, result) => {
      if (err) return reject(err); // ✅ FIX

      resolve({
        id: result.insertId,
        username,
        email,
        phone_number: phone_number || null,
        profile_pic: profile_pic || null,
        role_id
      });
    });
  });
};

// GET PENDING USERS
const getPendingUsers = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT id, username, email, phone_number, role_id, status, created_at FROM pending_users WHERE status = "pending" ORDER BY created_at DESC';

    db.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results || []);
    });
  });
};

// GET PENDING USER BY ID
const getPendingUserById = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM pending_users WHERE id = ?';

    db.query(query, [id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0] || null);
    });
  });
};

// CHECK IF EMAIL EXISTS IN PENDING_USERS
const findPendingUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM pending_users WHERE email = ? LIMIT 1';

    db.query(query, [email], (err, results) => {
      if (err) return reject(err);

      if (!results || results.length === 0) {
        return resolve(null);
      }

      resolve(results[0]);
    });
  });
};

// ➕ CREATE PENDING USER
const createPendingUser = (userData) => {
  return new Promise((resolve, reject) => {
    const { username, email, password, phone_number, role_id } = userData;

    const query = `
      INSERT INTO pending_users (username, email, password, phone_number, role_id, status)
      VALUES (?, ?, ?, ?, ?, 'pending')
    `;

    db.query(query, [username, email, password, phone_number, role_id], (err, result) => {
      if (err) return reject(err);

      resolve({
        id: result.insertId,
        username,
        email,
        phone_number,
        role_id,
        status: 'pending'
      });
    });
  });
};

// APPROVE PENDING USER (move to users table)
const approvePendingUser = (id) => {
  return new Promise((resolve, reject) => {
    // Get pending user data
    const selectQuery = 'SELECT username, email, password, role_id FROM pending_users WHERE id = ?';
    
    db.query(selectQuery, [id], (err, results) => {
      if (err) return reject(err);
      
      if (!results || results.length === 0) {
        return reject(new Error('Pending user not found'));
      }

      const { username, email, password, role_id } = results[0];

      // Insert into users table
      const insertQuery = `
        INSERT INTO users (username, email, password, role_id)
        VALUES (?, ?, ?, ?)
      `;

      db.query(insertQuery, [username, email, password, role_id], (err, result) => {
        if (err) return reject(err);

        // Delete from pending_users
        const deleteQuery = 'DELETE FROM pending_users WHERE id = ?';
        
        db.query(deleteQuery, [id], (err) => {
          if (err) return reject(err);
          resolve({ id: result.insertId, username, email, role_id });
        });
      });
    });
  });
};

// DELETE PENDING USER
const deletePendingUser = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM pending_users WHERE id = ?';

    db.query(query, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result.affectedRows > 0);
    });
  });
};

module.exports = {
  findUserByUsernameOrEmail,
  findUserByEmail,
  findPendingUserByEmail,
  createUser,
  updateUser,
  updateUserPassword,
  deleteUser,
  getAllUsers,
  getUserById,
  getUserByIdWithPassword,
  getPendingUsers,
  getPendingUserById,
  createPendingUser,
  approvePendingUser,
  deletePendingUser
};