import connection from '../db/connection.js';

// Get all bills
export const getAllBills = (callback) => {
  connection.query('SELECT * FROM bill', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return callback(err, null);
    }
    callback(null, results);
  });
};


// Add a new bill
export const addBill = (billData, callback) => {
  const { Bill_ID, Book_ID, Bill_Date, Bill_Mode, Labor_Entries, Total_Cost } = billData;

  // Check if Bill_ID already exists
  connection.query('SELECT * FROM bill WHERE Bill_ID = ?', [Bill_ID], (err, results) => {
    if (err) {
      console.error('Error checking Bill_ID:', err);
      return callback(err, null);
    }

    if (results.length > 0) {
      return callback({ error: 'Bill_ID already exists' }, null);
    }

    // Insert query for adding a new bill
    const query = `
      INSERT INTO bill (Book_ID, Bill_Date, Bill_Mode, Labor_Entries, Total_Cost)
      VALUES (?, ?, ?, ?, ?)
    `;

    // Insert the bill data with labor entries and total cost
    connection.query(query, [Book_ID, Bill_Date, Bill_Mode, JSON.stringify(Labor_Entries), Total_Cost], (err, result) => {
      if (err) {
        console.error('Error inserting bill:', err);
        return callback({ error: err.code, message: err.message }, null);
      }
      callback(null, result);
    });
  });
};

// Get a specific bill by Book_ID
export const getBillById = (Book_ID, callback) => {
  connection.query('SELECT * FROM bill WHERE Book_ID = ?', [Book_ID], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return callback(err, null);
    }

    if (results.length === 0) {
      return callback({ error: 'Bill not found' }, null);
    }

    callback(null, results[0]);
  });
};
