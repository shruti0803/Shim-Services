import connection from "../db/connection.js";

export const getAllAdmin = (callback) => {
  connection.query('SELECT * FROM admin', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return callback(err, null);
    }
    // console.log('Query results:', results); 
    callback(null, results);
  });
};