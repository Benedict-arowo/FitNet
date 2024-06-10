// File: middlewares/logs.js

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf, colorize } = format;
const path = require('path');

// Define custom format for engineer logs
const engineerLogFormat = printf(({ level, message, label, timestamp, stack }) => {
  return `${timestamp} [${label}] ${level}: ${message} ${stack ? `\n${stack}` : ''}`;
});

// Create a logger for engineer logs
const engineerLogger = createLogger({
  level: 'info', // Set the minimum log level to 'info'
  format: combine(
    label({ label: 'Engineer' }), // Add a label to identify engineer logs
    timestamp(), // Add a timestamp to each log message
    colorize(), // Add color to log messages for better readability
    engineerLogFormat // Use the custom format for engineer logs
  ),
  transports: [
    new transports.File({ filename: path.join(__dirname, '..', '..', 'logs', 'engineer.log') }), // Log to a file named 'engineer.log' in the logs folder
    new transports.Console(), // Also log to the console
  ],
});

// Middleware function to log engineer-specific information
const logEngineerInfo = (req, res, next) => {
  // Log the request method, URL, and user agent
  engineerLogger.info(`Request: ${req.method} ${req.url} - User Agent: ${req.headers['user-agent']}`);

  // Log the request body (excluding sensitive data)
  engineerLogger.info(`Request Body: ${JSON.stringify(req.body, (key, value) => (key === 'password' ? '***' : value))}`);

  // Log the response status code and response time
  res.on('finish', () => {
    engineerLogger.info(`Response: ${res.statusCode} - Response Time: ${res.responseTime}ms`);
  });

  // Proceed to the next middleware or handler
  next();
};

// Middleware function to log errors
const logErrors = (err, req, res, next) => {
  // Log the error message, stack trace, and request details
  engineerLogger.error(`Error: ${err.message}`, { stack: err.stack, request: req });

  // Proceed to the next middleware or error handler
  next(err);
};

// Middleware function to log model events
const logModelEvents = (model, event, data) => {
  // Log the model event, data, and timestamp
  engineerLogger.info(`Model Event: ${model.name}.${event}`, { data, timestamp: new Date() });
};

// Middleware function to log route events
const logRouteEvents = (route, event, data) => {
  // Log the route event, data, and timestamp
  engineerLogger.info(`Route Event: ${route.path}.${event}`, { data, timestamp: new Date() });
};

// Middleware function to log controller events
const logControllerEvents = (controller, event, data) => {
  // Log the controller event, data, and timestamp
  engineerLogger.info(`Controller Event: ${controller.name}.${event}`, { data, timestamp: new Date() });
};

module.exports = {
  engineerLogger,
  logEngineerInfo,
  logErrors,
  logModelEvents,
  logRouteEvents,
  logControllerEvents,
};
