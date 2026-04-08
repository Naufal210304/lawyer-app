const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
}));

app.use(express.json());

// Central routing
app.use('/api', routes);

// Test route
app.get('/', (req, res) => {
  res.send('Backend + MySQL is working!');
});

module.exports = app;