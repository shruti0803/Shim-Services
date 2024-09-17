import mysql from 'mysql2';

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',        // Replace with your database host
  user: 'root',             // Replace with your database user
  password: 'IshaSql@562',     // Replace with your database password
  database: 'shimservices'   // Replace with your database name
});

// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

export default connection;
