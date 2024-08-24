/**
 * Represents an error with a specific status code.
 * @class
 * @extends Error
 */
class ErrorWithStatusCode extends Error {
  constructor(message, statusCode, data = null) {
	super(message);
	this.statusCode = statusCode;
	this.data = data; // Add a data property to store additional information
  }
}

module.exports = ErrorWithStatusCode;

