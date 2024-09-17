import connection from '../db/connection.js';

// Get all customers
export const getAllCustomers = (callback) => {
  connection.query('SELECT * FROM customer', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Add a new customer
export const addCustomer = (customerData, callback) => {
  const { C_username, C_Name, C_Email, C_Phone } = customerData;

  // Check if email already exists
  connection.query('SELECT * FROM customer WHERE C_Email = ?', [C_Email], (err, results) => {
    if (err) {
      console.error('Error checking email:', err);
      return callback(err, null);
    }
    if (results.length > 0) {
      return callback({ error: 'Email already exists' }, null);
    }

    // Check if username already exists
    connection.query('SELECT * FROM customer WHERE C_username = ?', [C_username], (err, results) => {
      if (err) {
        console.error('Error checking username:', err);
        return callback(err, null);
      }
      if (results.length > 0) {
        return callback({ error: 'Username not available' }, null);
      }

      // Insert query for adding new customer
      const query = `
        INSERT INTO customer (C_username, C_Name, C_Email, C_Phone)
        VALUES (?, ?, ?, ?)
      `;

      connection.query(
        query, 
        [C_username, C_Name, C_Email, C_Phone],
        (err, result) => {
          if (err) {
            console.error('Error inserting customer:', err);
            return callback({ error: err.code, message: err.message }, null);
          }
          callback(null, result);
        }
      );
    });
  });
};
