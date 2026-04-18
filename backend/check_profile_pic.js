const db = require('./src/config/db');

console.log('=== Checking profile_pic field ===\n');

db.query('SELECT id, username, profile_pic FROM users WHERE id = 1', (err, results) => {
  if (err) {
    console.error('Error:', err);
    process.exit(1);
  }
  
  console.log('User data:');
  console.log(JSON.stringify(results, null, 2));
  process.exit(0);
});
