const db = require('./src/config/db');

const createTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS consultation_reports (
      id INT PRIMARY KEY AUTO_INCREMENT,
      full_name VARCHAR(255) NOT NULL,
      phone_number VARCHAR(20) NOT NULL,
      email VARCHAR(255) NOT NULL,
      service_area VARCHAR(255) NOT NULL,
      problem_details TEXT NOT NULL,
      status ENUM('Approved', 'Rejected') NOT NULL,
      admin_notes TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  db.query(query, (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      console.log('Table consultation_reports created or already exists');
    }
    db.end();
  });
};

createTable();