const bcrypt = require('bcryptjs');
const db = require('./src/config/db');

console.log('\n=== Users dalam Database ===\n');
db.query('SELECT id, username, email, role_id FROM users ORDER BY id', (err, results) => {
  if(err) {
    console.error('Error:', err);
    process.exit(1);
  }
  
  results.forEach(u => {
    const role = u.role_id === 1 ? 'superadmin' : 'admin';
    console.log(`ID ${u.id}: "${u.username}" (${u.email}) - Role: ${role}`);
  });
  
  console.log('\n=== Reset Password to New Credentials ===\n');
  console.log('Superadmin: "Abu" dengan password "Abu1234"');
  console.log('Admin: "Sinta" dengan password "Sinta1234"');
  console.log('\nPassword akan di-hash dengan bcrypt sebelum disimpan di database.\n');
  
  // Reset superadmin (ID 1)
  const abuPassword = bcrypt.hashSync('Abu1234', 10);
  db.query('UPDATE users SET password = ? WHERE id = 1', [abuPassword], (err1) => {
    if(err1) {
      console.error('Error updating Abu:', err1);
      process.exit(1);
    }
    console.log('✅ Abu password reset ke: Abu1234');
    
    // Reset admin (ID 6)
    const sintaPassword = bcrypt.hashSync('Sinta1234', 10);
    db.query('UPDATE users SET password = ? WHERE id = 6', [sintaPassword], (err2) => {
      if(err2) {
        console.error('Error updating Sinta:', err2);
        process.exit(1);
      }
      console.log('✅ Sinta password reset ke: Sinta1234');
      
      console.log('\n=== Login Credentials ===\n');
      console.log('Superadmin:');
      console.log('  Username/Email: AbuSaminan12 atau admin@email.com');
      console.log('  Password: Abu1234');
      console.log('');
      console.log('Admin:');
      console.log('  Username/Email: Desinta Maharani atau desintads@gmail.com');
      console.log('  Password: Sinta1234');
      console.log('');
      
      process.exit(0);
    });
  });
});
