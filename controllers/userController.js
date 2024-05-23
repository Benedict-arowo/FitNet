const { sequelize, Op } = require('sequelize')
const db = require("../model")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = db.users
require('dotenv').config()

//Creates a New User
async function registerUser(req, res) {
    const { firstName, lastName, email, password, age, location } = req.body;

    try {
        const newUser = await User.create({
            userName,
            email,
            password,
            location,
            goal
        });
        res.status(201).send("New User created ")
        console.log('User registered successfully:', newUser.toJSON());
    } catch (error) {
        res.send("Error! Please try again with correct credentials")
        console.error('Error registering user:', error);
    }
}

//Logs in User

async function userLogin(req, res) {
    const { identifier, password } = req.body;
  
    try {
      const user = await User.findOne({
        where: {
          [Op.or]: [{ email: identifier }, { username: identifier }],
        },
      });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
    
      // Set Authorization header and send JSON response with token
      res.header('Authorization', token).json({ message: 'Login successful', user });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Failed to log in' });
    }
  }
  

//  Fetch User Profile
async function getUserProfile(email) {
    try {
        // Find the user with the given email
        const existingUser = await User.findOne({
            where: {
                email: email,
            },
            attributes: ['id', 'firstname', 'lastname', 'email', 'age', 'location'],
        });

        if (!user) {
            console.log('User not found.');
            return null;
        }

        // Return the user profile
        return user.toJSON();
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return null; // Return null on error
    }
}

module.exports = {
    registerUser,
    userLogin,
    getUserProfile
}

