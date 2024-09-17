import connection from '../db/connection.js';

// Get all service providers
export const getAllServiceProviders = (callback) => {
  connection.query('SELECT * FROM serviceprovider', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Add a new service provider
export const addServiceProvider = (serviceProviderData, callback) => {
  const { SP_Username, SP_Name, SP_Phone, SP_Location, SP_Email } = serviceProviderData;

  // Check if the location exists before inserting
  connection.query('SELECT * FROM city WHERE City_Name = ?', [SP_Location], (err, results) => {
    if (err) {
      console.error('Error checking location:', err);
      return callback(err, null);
    }
    if (results.length === 0) {
      return callback({ error: 'Location does not exist in city table' }, null);
    }

    // Insert query for adding new service provider with all columns
    const query = `
      INSERT INTO serviceprovider (SP_Username, SP_Name, SP_Phone, SP_Location, SP_Email)
      VALUES (?, ?, ?, ?, ?)
    `;

    connection.query(
      query, 
      [SP_Username, SP_Name, SP_Phone, SP_Location, SP_Email],
      (err, result) => {
        if (err) {
          console.error('Error inserting service provider:', err);
          return callback({ error: err.code, message: err.message }, null);
        }
        callback(null, result);
      }
    );
  });
};
