const db = require('./src/config/db');

console.log('=== Checking all users ===');
db.query('SELECT id, username, email, role_id, password FROM users', (err, results) => {
  if (err) {
    console.error('Error:', err);
    process.exit(1);
  }
  
  console.log('\n📋 All Users:');
  results.forEach(user => {
    console.log(`- ID: ${user.id}, Username: ${user.username}, Email: ${user.email}, Role: ${user.role_id}`);
  });
  
  // Test login dengan user yang ada
  console.log('\n=== Testing login ===');
  console.log('Use credentials:');
  console.log('- Username/Email: admin@email.com (atau AbuSaminan12)');
  console.log('- Password: (check database or create test user)');
  
  process.exit(0);
});
