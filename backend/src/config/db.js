const mysql = require('mysql2');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// gunakan connection pool (lebih stabil)
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'lawyer_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// test koneksi
db.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Connected to MySQL database!');
    connection.release();
  }
});

module.exports = db;