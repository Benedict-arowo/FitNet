const Wrapper = (fn) => {
	// 1. Define a wrapper function that takes the original asynchronous function `fn` as an argument.
  
	return async (req, res, next) => {
	  // 2. Return an asynchronous function that takes the request, response, and next arguments.
  
	  try {
		// 3. Wrap the execution of the original function in a try-catch block to handle errors gracefully.
		await fn(req, res, next); // 4. Call the original function with the request, response, and next arguments.
	  } catch (error) {
		// 5. If an error occurs within the original function, catch it and pass it to the next middleware or error handling function.
		next(error);
	  }
	};
  };
  
  module.exports = Wrapper;
  
