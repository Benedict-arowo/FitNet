const mysql = require("mysql");

const connection = mysql.createConnection({
	host: process.env.DB_HOST, // Use the service name 'database' to connect to the MySQL container
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
});

connection.connect((err) => {
	if (err) {
		console.error("Error connecting to MySQL:", err);
		return;
	}
	console.log("Connected to MySQL database");
});

// Perform database operations using the connection object
