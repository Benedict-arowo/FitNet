const jwt = require('jsonwebtoken');
const User = require('../model/user');
const dotenv = require('dotenv');
dotenv.config();

const authenticate = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send('Access denied. No token provided or invalid format.');
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id);
    next();
  } catch (err) {
    res.status(400).send('Invalid token.');
  }
};

// function verifyToken(req, res, next) {
//     const token = req.headers['authorization'];
  
//     if (!token) {
//       return res.status(401).send('Unauthorized: No token provided');
//     }
  
//     jwt.verify(token, 'secret_key', (err, decoded) => {
//       if (err) {
//         return res.status(403).send('Forbidden: Invalid token');
//       }
  
//       req.userEmail = decoded.email;
//       next();
//     });
//   }
module.exports = authenticate;
