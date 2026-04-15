-- Query untuk membuat tabel consultation_reports
-- Jalankan query ini di phpMyAdmin atau MySQL client untuk membuat tabel report

CREATE TABLE consultation_reports (
  id INT PRIMARY KEY AUTO_INCREMENT,
  full_name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  service_area VARCHAR(255) NOT NULL,
  problem_details TEXT NOT NULL,
  status ENUM('Approved', 'Rejected') NOT NULL,
  admin_notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);