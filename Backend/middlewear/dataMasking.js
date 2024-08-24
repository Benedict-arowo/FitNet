// File: middlewares/dataMasking.js

const { redact } = require('redact-pii');

// Define a function to mask sensitive data in logs
const maskLogData = (logData) => {
  // Define a list of sensitive data patterns to mask
  const sensitiveDataPatterns = [
    /\b(\d{4})\d{8,12}(\d{4})\b/g, // Credit Card Numbers (only the first 4 and last 4 should not be masked)
    /(?<=password":\s*")[^"]+/gi, // Passwords (assuming password fields are in the JSON format)
  ];

  // Mask sensitive data in the log message
  return redact(logData, sensitiveDataPatterns, '****');
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