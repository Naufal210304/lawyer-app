const axios = require('axios');

const testLogin = async () => {
  try {
    // Test dengan user yang ada di database
    const credentials = {
      identifier: 'admin@email.com',  // User yang ada di DB
      password: 'admin123'
    };
    
    console.log('Testing login with:', credentials);
    
    const response = await axios.post('http://localhost:3001/api/auth/login', credentials);
    
    console.log('✅ Login Success!');
    console.log('Response:', response.data);
    
  } catch (error) {
    console.error('❌ Login Failed');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Message:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  }
};

testLogin().then(() => process.exit(0));
