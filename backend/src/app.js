const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const routes = require('./routes');

const app = express();

const errorHandler = require('./middlewares/error.middleware');

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
}));
app.use(express.json());

// Central routing
app.use('/api', routes);

// Test route
app.get('/', (req, res) => {
  res.send('Backend + MySQL is working!');
});

app.use('/uploads', express.static('uploads'));

// HARUS PALING BAWAH
app.use(errorHandler);

module.exports = app;