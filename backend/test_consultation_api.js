const http = require('http');

const data = JSON.stringify({
  full_name: 'Test User',
  phone_number: '08123456789',
  email: 'test@example.com',
  service_area: 'Hukum Korporasi',
  problem_details: 'Test masalah hukum',
});

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/api/consultations',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data),
  },
};

const req = http.request(options, (res) => {
  console.log('STATUS', res.statusCode);
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => console.log(body));
});

req.on('error', (error) => {
  console.error('ERROR', error.message);
});

req.write(data);
req.end();
