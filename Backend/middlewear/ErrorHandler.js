const { StatusCodes } = require("http-status-codes");
const ErrorWithStatusCode = require("./ErrorWithStatusCode");

const ErrorHandler = (err, _req, res, _next) => {
	if (err instanceof ErrorWithStatusCode) {
		return res.status(err.statusCode).json({
			message: err.message,
			stack:
				process.env.NODE_ENV === "development" ? err.stack : undefined,
		});
	}
	return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
		message: err.message,
		stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
	});
};

module.exports = ErrorHandler;
