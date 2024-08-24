const { StatusCodes } = require("http-status-codes");
const ErrorWithStatusCode = require("./ErrorWithStatusCode");

const ErrorHandler = (err, _req, res, _next) => {
  // Handle ErrorWithStatusCode instances
  if (err instanceof ErrorWithStatusCode) {
	return res.status(err.statusCode).json({
	  message: err.message,
	  stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
	  data: err.data // Include the data property if available
	});
  }

  // Handle other errors
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
	message: err.message || "Internal server error", // Provide a default message
	stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

module.exports = ErrorHandler;
