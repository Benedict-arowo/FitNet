const { StatusCodes } = require("http-status-codes");
const ErrorWithStatusCode = require("../middlewear/ErrorWithStatusCode");
const Wrapper = require("../middlewear/Wrapper");
const authRouter = require("./auth.route");
const waitlistRouter = require("./waitlist.route");

const ApplyRoutes = (app) => {
	app.use("/auth", authRouter);
	app.use("/waitlist", waitlistRouter);
};

module.exports = ApplyRoutes;
