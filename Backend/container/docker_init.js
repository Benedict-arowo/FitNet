const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'database', // Use the service name 'database' to connect to the MySQL container
  user: 'root',
  password: 'fitnet_password',
  database: 'fitnet_db',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Perform database operations using the connection object
