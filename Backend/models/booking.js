// models/booking.js
import connection from '../db/connection.js';

// Get all bookings
export const getAllBookings = (callback) => {
  connection.query('SELECT * FROM booking', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Add a new booking
export const addBooking = (bookingData, callback) => {
  const { SP_Username, C_username, Book_Status, Service_Name, Service_Category, Book_HouseNo, Book_Area, Book_City, Book_State } = bookingData;

  // Generate current date and time
  const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' '); // Format: YYYY-MM-DD HH:MM:SS

  // Insert query for adding a new booking
  const query = `
    INSERT INTO booking (SP_Username, C_username, Book_Status, Service_Name, Service_Category, Book_Date, Book_HouseNo, Book_Area, Book_City, Book_State)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  connection.query(
    query,
    [SP_Username, C_username, Book_Status, Service_Name, Service_Category, currentDate, Book_HouseNo, Book_Area, Book_City, Book_State],
    (err, result) => {
      if (err) {
        console.error('Error inserting booking:', err);
        return callback({ error: err.code, message: err.message }, null);
      }
      callback(null, result);
    }
  );
};
export const deleteBooking = (bookingId, callback) => {
  const query = 'DELETE FROM booking WHERE Book_ID = ?';

  connection.query(query, [bookingId], (err, result) => {
    if (err) {
      console.error('Error deleting booking:', err);
      return callback({ error: err.code, message: err.message }, null);
    }
    callback(null, result);
  });
};
