const express = require("express");
const Wrapper = require("../middlewear/Wrapper");
const {
	LoginUser,
	LogoutUser,
	RegisterUser,
} = require("../controllers/auth.controller");
const authRouter = express.Router();

authRouter.route("/login").post(Wrapper(LoginUser));
authRouter.route("/register").post(Wrapper(RegisterUser));
authRouter.route("/logout").post(Wrapper(LogoutUser));

// TODO: Password resetting route
module.exports = authRouter;
