const db = require('./src/config/db');

console.log('Testing database connection...');

db.query('SELECT COUNT(*) as count FROM practice_areas', (err, results) => {
  if (err) {
    console.error('Database error:', err.message);
  } else {
    console.log('Practice areas in DB:', results[0].count);
  }
  
  db.query('SELECT * FROM practice_areas LIMIT 1', (err, results) => {
    if (err) {
      console.error('Query error:', err.message);
    } else {
      console.log('Sample data:', results[0] || 'No rows found');
    }
    process.exit(0);
  });
});
