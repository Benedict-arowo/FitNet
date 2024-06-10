// File: middlewares/dataMasking.js

const { redact } = require('redact-pii');

// Define a function to mask sensitive data in logs
const maskLogData = (logData) => {
  // Define a list of sensitive data patterns to mask
  const sensitiveDataPatterns = [
    /\b\d{4}-\d{2}-\d{2}\b/g, // Dates in YYYY-MM-DD format
    /\b\d{3}-\d{3}-\d{4}\b/g, // Social Security Numbers
    /\b\d{16}\b/g, // Credit Card Numbers
    /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}\b/g, // Email addresses
  ];

  // Mask sensitive data in the log message
  return redact(logData, sensitiveDataPatterns, '*');
};

// Middleware function to mask sensitive data in logs
const maskLogs = (req, res, next) => {
  // Mask sensitive data in the request body
  req.body = maskLogData(JSON.stringify(req.body));

  // Mask sensitive data in the response body
  res.on('finish', () => {
    res.body = maskLogData(JSON.stringify(res.body));
  });

  // Proceed to the next middleware or handler
  next();
};

module.exports = {
  maskLogData,
  maskLogs,
};
