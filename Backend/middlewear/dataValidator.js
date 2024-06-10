// File: middlewares/dataValidator.js

const { validationResult } = require('express-validator');

// Define validation rules for user input
const userValidationRules = [
  check('username').trim().escape().isLength({ min: 3, max: 20 }),
  check('email').trim().normalizeEmail().isEmail(),
  check('password').trim().isStrongPassword(),
];

// Middleware function to validate and sanitize user input
const validateUser = (req, res, next) => {
  // Perform validation using the defined rules
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // If validation fails, return a 400 Bad Request response with error details
    return res.status(400).json({ errors: errors.array() });
  }

  // Sanitize user input
  req.body.username = req.body.username.trim().escape();
  req.body.email = req.body.email.trim().normalizeEmail();

  // Proceed to the next middleware or handler
  next();
};

module.exports = {
  userValidationRules,
  validateUser,
};
