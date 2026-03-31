const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const routes = require('./routes'); // 🔥 FIX DI SINI

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
}));

app.use(express.json());

app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('Backend + MySQL is working!');
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
