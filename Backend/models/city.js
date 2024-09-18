// models/city.js
import connection from '../db/connection.js';// Assuming dbConnection.js handles DB connection

// Function to get all cities
export const getAllCities = (callback) => {
  const query = 'SELECT * FROM City';
  db.query(query, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Function to add a new city
export const addCity = (city, callback) => {
  const { City_PIN, City_Name, City_State, City_Country } = city;

  // Check if the required fields are provided
  if (!City_PIN || !City_Name || !City_State || !City_Country) {
    return callback({ error: 'Missing required fields' }, null);
  }

  // Insert the city into the database
  const query = 'INSERT INTO City (City_PIN, City_Name, City_State, City_Country) VALUES (?, ?, ?, ?)';
  db.query(query, [City_PIN, City_Name, City_State, City_Country], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
