const db = require('./src/config/db');

const runMigration = () => {
  const queries = [
    'ALTER TABLE users ADD COLUMN phone_number VARCHAR(20) DEFAULT NULL',
    'ALTER TABLE users ADD COLUMN profile_pic VARCHAR(255) DEFAULT NULL'
  ];

  let completed = 0;
  queries.forEach((query, index) => {
    db.query(query, (err) => {
      if (err) {
        if (err.code === 'ER_DUP_FIELDNAME') {
          console.log(`Column already exists (skipping): ${query.split('ADD COLUMN')[1].trim()}`);
        } else {
          console.error('Migration error:', err.message);
        }
      } else {
        console.log(`Migration ${index + 1} completed successfully`);
      }
      completed++;
      if (completed === queries.length) {
        console.log('Migration completed');
        db.end();
      }
    });
  });
};

runMigration();