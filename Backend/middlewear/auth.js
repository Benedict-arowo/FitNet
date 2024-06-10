const jwt = require('jsonwebtoken');
const { User } = require('../models');
const dotenv = require('dotenv');

// Load environment variables from a .env file into process.env
dotenv.config();

/**
 * Middleware to authenticate a user using JWT.
 * This function checks the Authorization header for a valid JWT token,
 * verifies it, and attaches the user information to the request object if valid.
 */
const authenticate = async (req, res, next) => {
  // Extract the Authorization header from the incoming request
  const authHeader = req.header('Authorization');

  // Check if the Authorization header is present and properly formatted
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. No token provided or invalid format.' });
  }

  // Extract the token from the Authorization header
  const token = authHeader.split(' ')[1];

  try {
    // Verify the JWT token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find the user in the database based on the decoded token's user ID
    req.user = await User.findByPk(decoded.id);
    
    // If the user does not exist, send an unauthorized response
    if (!req.user) {
      return res.status(401).json({ message: 'Invalid token.' });
    }

    // Proceed to the next middleware function
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired. Please log in again.' });
    } else {
      return res.status(401).json({ message: 'Invalid token.' });
    }
  }
};

/**
 * Middleware to authorize a user based on their role.
 * This function checks if the authenticated user has the required role
 * to access a specific route.
 * 
 * @param {string} role - The required role for accessing the route.
 */
const authorize = (role) => {
  return (req, res, next) => {
    // Check if the authenticated user's role matches the required role
    if (req.user.role !== role) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // Proceed to the next middleware function
    next();
  };
};

module.exports = { authenticate, authorize };