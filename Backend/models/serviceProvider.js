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
  const {
    SP_Email,
    SP_PIN,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday,
    LanguageSpoken,
    GovernmentID,
    CityName,
    State,
    Country
  } = serviceProviderData;

  // Check if the CityName exists before inserting
  connection.query('SELECT * FROM city WHERE City_Name = ?', [CityName], (err, results) => {
    if (err) {
      console.error('Error checking location:', err);
      return callback(err, null);
    }
    if (results.length === 0) {
      return callback({ error: 'City does not exist in the city table' }, null);
    }

    // Insert query for adding new service provider with all required columns
    const query = `
      INSERT INTO serviceprovider 
      (SP_Email, SP_PIN, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday, LanguageSpoken, GovernmentID, CityName, State, Country)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(
      query,
      [SP_Email, SP_PIN, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday,  LanguageSpoken, GovernmentID, CityName, State, Country],
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
