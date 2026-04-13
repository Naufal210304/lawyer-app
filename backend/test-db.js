const mysql = require('mysql2');

// Clean up test data
const cleanup = () => {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'lawyer_db'
  });

  connection.connect((err) => {
    if (err) {
      console.error('Database connection failed:', err.message);
      return;
    }

    console.log('Connected to MySQL database!');

    // Delete test data
    connection.query('DELETE FROM team_members WHERE name = ?', ['Test Member'], (err, result) => {
      if (err) {
        console.error('Delete failed:', err.message);
      } else {
        console.log('✅ Test data cleaned up, deleted', result.affectedRows, 'records');
      }
      connection.end();
    });
  });
};

cleanup();