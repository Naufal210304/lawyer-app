const db = require('../config/db');
const bcrypt = require('bcryptjs');

const DEFAULT_ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD || 'Abu1234';

const queries = [
  `CREATE TABLE IF NOT EXISTS roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE
  ) ENGINE=InnoDB;`,

  `CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role_id INT NOT NULL DEFAULT 2,
    phone_number VARCHAR(20) DEFAULT NULL,
    profile_pic VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_users_role FOREIGN KEY (role_id) REFERENCES roles(id)
  ) ENGINE=InnoDB;`,

  `CREATE TABLE IF NOT EXISTS pending_users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) DEFAULT NULL,
    role_id INT NOT NULL DEFAULT 2,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB;`
];

const run = async () => {
  let i = 0;
  for (const q of queries) {
    // eslint-disable-next-line no-await-in-loop
    await new Promise((resolve) => {
      db.query(q, (err) => {
        if (err) console.error('Error creating table:', err);
        else console.log('OK:', i, '-> table/constraint created or exists');
        i += 1;
        resolve();
      });
    });
  }

  // ensure roles
  await new Promise((resolve, reject) => {
    const insertRoles = `INSERT IGNORE INTO roles (id, name) VALUES (1,'superadmin'), (2,'admin')`;
    db.query(insertRoles, (err) => {
      if (err) { console.error('Insert roles failed:', err); return reject(err); }
      console.log('Roles seeded');
      resolve();
    });
  });

  // ensure superadmin user exists
  const adminEmail = process.env.SEED_ADMIN_EMAIL || '';
  const adminUsername = process.env.SEED_ADMIN_USERNAME || 'Abu Saminan';
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'Abu1234';

  const findAdmin = () => new Promise((resolve, reject) => {
    db.query('SELECT id FROM users WHERE email = ? LIMIT 1', [adminEmail], (err, results) => {
      if (err) return reject(err);
      resolve(results && results.length ? results[0] : null);
    });
  });

  const adminExists = await findAdmin().catch((e) => { console.error(e); return null; });

  if (!adminExists) {
    const hashed = bcrypt.hashSync(adminPassword, 10);
    await new Promise((resolve, reject) => {
      const insert = 'INSERT INTO users (username, email, password, role_id) VALUES (?, ?, ?, 1)';
      db.query(insert, [adminUsername, adminEmail, hashed], (err, result) => {
        if (err) { console.error('Insert admin failed:', err); return reject(err); }
        console.log('Superadmin created:', { id: result.insertId, username: adminUsername, email: adminEmail });
        resolve();
      });
    });
  } else {
    console.log('Superadmin already exists');
  }

  console.log('Setup completed.');
  // close pool
  db.end && db.end();
};

run().catch((err) => {
  console.error('Setup failed:', err);
  db.end && db.end();
  process.exit(1);
});
