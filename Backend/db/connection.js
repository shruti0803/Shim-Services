import mysql from 'mysql2';

// connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',        
  user: 'root',             
  password: 'Rudrach@',     
  database: 'ProjectShimServices'  
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
