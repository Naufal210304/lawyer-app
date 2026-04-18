const bcrypt = require('bcryptjs');
const db = require('./src/config/db');

const resetPassword = async () => {
  try {
    // User yang sudah ada (superadmin)
    const userId = 1;
    const newPassword = 'admin123';
    
    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    
    console.log('🔐 Resetting password for user ID:', userId);
    console.log('New password hash:', hashedPassword);
    
    // Update password di database
    db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, userId], (err, result) => {
      if (err) {
        console.error('❌ Error updating password:', err);
        process.exit(1);
      }
      
      console.log('✅ Password updated successfully!');
      console.log('Now you can login with:');
      console.log('- Email: admin@email.com');
      console.log('- Password: admin123');
      
      process.exit(0);
    });
    
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

resetPassword();
