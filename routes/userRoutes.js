const express = require('express')
const controller = require('../controllers/userController')
const userRouter = express.Router()
const jwt = require('jsonwebtoken')
const authenticate = require('../middlewares/authentication')
const User = require('../model/user')



userRouter.post('/signup', controller.registerUser)
userRouter.post('/login', controller.userLogin)
userRouter.post('/profile', authenticate, controller.getUserProfile)

module.exports = userRouter