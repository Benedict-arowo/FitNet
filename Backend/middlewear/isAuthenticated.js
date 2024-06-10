const isAuthenticated = (req, res, next) => {
	// 1. Check for the presence of an authorization header:
	const authHeader = req.headers.authorization;
	if (!authHeader) {
	  // 1.1 If no authorization header is found, return a 401 Unauthorized response:
	  return res.status(401).json({ message: "Unauthorized" });
	}
  
	// 2. Extract the token from the authorization header:
	const token = authHeader.split(" ")[1]; // Assuming the format "Bearer <token>"
  
	// 3. Validate the token using your chosen authentication method:
	// (Replace this comment with your actual token validation logic)
	try {
	  const decodedToken = verifyToken(token); // Replace with your token verification function
	  req.user = decodedToken; // Attach the decoded user information to the request object
	  next(); // Proceed to the next middleware or handler
	} catch (error) {
	  // 3.1 If token validation fails, return a 401 Unauthorized response:
	  return res.status(401).json({ message: "Invalid token" });
	}
  };
  
  module.exports = isAuthenticated;
  
  // Helper function to verify the token (implementation not shown):
  function verifyToken(token) {
	// Implement your token verification logic here
	// This could involve JWT verification, session cookie validation, etc.
	// Return the decoded user information if successful, throw an error otherwise
  }
  
