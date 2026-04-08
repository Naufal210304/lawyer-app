const errorHandler = (err, req, res, next) => {
  console.error('🔥 Error:', err);

  // Default error
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // MySQL Error
  if (err.code === 'ER_DUP_ENTRY') {
    statusCode = 400;
    message = 'Data already exists (duplicate entry)';
  }

  // Validation Error (custom nanti)
  if (err.name === 'ValidationError') {
    statusCode = 400;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorHandler;