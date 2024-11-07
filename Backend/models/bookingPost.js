import connection from '../db/connection.js';

// Add a new booking
export const addBookingPost = (bookingData, callback) => {
  const {
    
    U_Email,
    Book_Status,
    Service_Name,
    Service_Category,
    Book_Date,
    Book_HouseNo,
    Book_Area,
    Book_City,
    Book_City_PIN,
    Book_State,
    Customer_Name,
    Customer_Phone
  } = bookingData;

  // Insert query for adding new booking
  const query = `
    INSERT INTO Booking (
      U_Email, Book_Status, Service_Name, Service_Category, Book_Date,
      Book_HouseNo, Book_Area, Book_City, Book_City_PIN, Book_State,
      Customer_Name, Customer_Phone
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  // Insert the booking data
  connection.query(query, [
    U_Email, Book_Status, Service_Name, Service_Category || null,
    Book_Date, Book_HouseNo, Book_Area, Book_City, Book_City_PIN,
    Book_State, Customer_Name || null, Customer_Phone || null
  ], (err, result) => {
    if (err) {
      console.error('Error inserting booking:', err);
      return callback({ error: err.code, message: err.message }, null);
    }
    callback(null, result);
  });
};
