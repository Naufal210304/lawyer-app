const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const dbName = process.env.DB_NAME || 'lawyer_db';
const dbHost = process.env.DB_HOST || '127.0.0.1';
const dbPort = Number(process.env.DB_PORT || 3306);
const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD || '';

const defaultAdminEmail = process.env.SEED_ADMIN_EMAIL || '';
const defaultAdminUsername = process.env.SEED_ADMIN_USERNAME || 'Abu Saminan';
const defaultAdminPassword = process.env.SEED_ADMIN_PASSWORD || 'Abu1234';

const schema = [
  `CREATE TABLE IF NOT EXISTS roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

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
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

  `CREATE TABLE IF NOT EXISTS categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

  `CREATE TABLE IF NOT EXISTS blogs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    author_id INT NOT NULL,
    category_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    type ENUM('latest', 'suggest') NOT NULL DEFAULT 'latest',
    content TEXT NOT NULL,
    image_url VARCHAR(255) DEFAULT NULL,
    status ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_blogs_author FOREIGN KEY (author_id) REFERENCES users(id),
    CONSTRAINT fk_blogs_category FOREIGN KEY (category_id) REFERENCES categories(id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

  `CREATE TABLE IF NOT EXISTS practice_areas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    slug VARCHAR(100) NOT NULL UNIQUE,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    detail TEXT NOT NULL,
    cases_example TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

  `CREATE TABLE IF NOT EXISTS team_members (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    position VARCHAR(100) NOT NULL,
    image_url VARCHAR(255) DEFAULT NULL,
    bio TEXT DEFAULT NULL,
    linkedin_url VARCHAR(255) DEFAULT NULL,
    order_index INT DEFAULT 0
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

  `CREATE TABLE IF NOT EXISTS partners (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    logo_url VARCHAR(255) NOT NULL,
    category ENUM('strategic', 'corporate') NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

  `CREATE TABLE IF NOT EXISTS consultations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(150) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    service_area VARCHAR(100) NOT NULL,
    problem_details TEXT NOT NULL,
    status ENUM('pending', 'contacted', 'closed') NOT NULL DEFAULT 'pending',
    admin_notes TEXT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

  `CREATE TABLE IF NOT EXISTS consultation_reports (
    id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    service_area VARCHAR(255) NOT NULL,
    problem_details TEXT NOT NULL,
    status ENUM('Approved', 'Rejected') NOT NULL,
    admin_notes TEXT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

  `CREATE TABLE IF NOT EXISTS pending_users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) DEFAULT NULL,
    role_id INT NOT NULL DEFAULT 2,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

  `CREATE TABLE IF NOT EXISTS faqs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    question VARCHAR(255) NOT NULL,
    answer TEXT NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

  `CREATE TABLE IF NOT EXISTS web_settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    key_name VARCHAR(50) NOT NULL UNIQUE,
    value VARCHAR(100) NOT NULL,
    type ENUM('text', 'number') NOT NULL DEFAULT 'text'
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`
];

const run = async () => {
  const rootConnection = await mysql.createConnection({
    host: dbHost,
    port: dbPort,
    user: dbUser,
    password: dbPassword,
    multipleStatements: true
  });

  console.log(`Connected to MySQL at ${dbHost}:${dbPort}`);
  console.log(`Dropping database ${dbName} if it exists...`);

  await rootConnection.query(`DROP DATABASE IF EXISTS \`${dbName}\`;`);
  console.log(`Database ${dbName} dropped.`);

  await rootConnection.query(`CREATE DATABASE \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
  console.log(`Database ${dbName} created.`);

  await rootConnection.query(`USE \`${dbName}\`;`);

  for (const statement of schema) {
    await rootConnection.query(statement);
  }

  console.log('All tables created.');

  const hashedPassword = bcrypt.hashSync(defaultAdminPassword, 10);

  await rootConnection.query(`INSERT IGNORE INTO roles (id, name) VALUES (1,'superadmin'), (2,'admin');`);
  await rootConnection.query(`INSERT IGNORE INTO users (username, email, password, role_id) VALUES (?, ?, ?, 1);`, [defaultAdminUsername, defaultAdminEmail, hashedPassword]);

  console.log('Seed data inserted: roles + superadmin user.');
  console.log(`Superadmin login: ${defaultAdminUsername} / ${defaultAdminPassword}`);

  await rootConnection.end();
  console.log('Database recreation complete.');
};

run().catch((error) => {
  console.error('Recreate database failed:', error);
  process.exit(1);
});
