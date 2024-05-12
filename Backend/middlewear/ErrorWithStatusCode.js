/**
 * Represents an error with a specific status code.
 * @class
 * @extends Error
 */
class ErrorWithStatusCode extends Error {
	constructor(message, statusCode) {
		super(message);
		this.statusCode = statusCode;
	}
}

module.exports = ErrorWithStatusCode;
