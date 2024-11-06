// models/booking.js
import connection from '../db/connection.js';







// Get all bookings for a specific service provider
// models/booking.js
export const getBookingsByServiceProvider = (email, callback) => {
  const query = 'SELECT * FROM booking WHERE SP_Email = ?';
  console.log('Executing query:', query, 'with email:', email); // Debugging print

  connection.query(query, [email], (err, results) => {
      if (err) {
          console.error('Error executing query:', err);
          return callback(err, null);
      }
      console.log('Query results:', results); // Debugging print
      callback(null, results);
  });
};



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
  const { SP_Email, C_Email, Book_Status, Service_Name, Service_Category, Book_HouseNo, Book_Area, Book_City, Book_State } = bookingData;

  // Generate current date and time
  const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' '); // Format: YYYY-MM-DD HH:MM:SS

  // Insert query for adding a new booking
  const query = `
    INSERT INTO booking (SP_Email, C_Email, Book_Status, Service_Name, Service_Category, Book_Date, Book_HouseNo, Book_Area, Book_City, Book_State)
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


//MANISHKA

// Get all bookings where SP_Email is NULL and Service_Name matches the service provided by SP
export const getAvailableBookingsForService = (serviceName, callback) => {
  const query = `
    SELECT * FROM booking 
    WHERE SP_Email IS NULL 
    AND Service_Name = ?
  `;

  console.log('Executing query:', query, 'with service name:', serviceName); // Debugging print

  connection.query(query, [serviceName], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return callback(err, null);
    }
    console.log('Query results:', results); // Debugging print
    callback(null, results);
  });
};
