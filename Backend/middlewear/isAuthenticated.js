const isAuthenticated = (req, res, next) => {
	// TODO: Implement this middleware to check if the user is authenticated
	next();
};

module.exports = isAuthenticated;
