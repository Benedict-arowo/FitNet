const express = require("express");
const {
	getWaitlist,
	createWaitlist,
} = require("../controllers/waitlist.controller");
const Wrapper = require("../middlewear/Wrapper");
const isAuthenticated = require("../middlewear/isAuthenticated");
const waitlistRouter = express.Router();

waitlistRouter
	.route("/")
	.get(isAuthenticated, Wrapper(getWaitlist))
	.post(Wrapper(createWaitlist));

module.exports = waitlistRouter;
