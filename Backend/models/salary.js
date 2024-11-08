import connection from "../db/connection.js";
export const addSalary = (details, callback) => {
  const { SP_Email, Salary } = details;  // Use 'details' instead of 'totalMoney'

  // Check if the required fields are provided
  if (!SP_Email || !Salary) {
    console.log('Missing required fields:', { SP_Email, Salary }); // Debugging missing fields
    return callback({ error: 'Missing required fields' }, null);
  }

  console.log('Adding salary for:', { SP_Email, Salary }); // Log the incoming data for debugging

  const Date_credited = new Date().toISOString().slice(0, 19).replace('T', ' '); // Date format

  console.log('Date Credited:', Date_credited); // Log the date for debugging

  // Insert the salary into the database
  const query = 'INSERT INTO sp_salary (SP_Email, Date_credited, Salary) VALUES (?, ?, ?)';
  connection.query(query, [SP_Email, Date_credited, Salary], (err, result) => {
    if (err) {
      console.error('Database error while adding salary:', err); // Log any errors for debugging
      return callback(err, null);
    }

    console.log('Salary added successfully:', result); // Log the result of the insertion
    callback(null, result);  // Return the result of the insertion
  });
};
export const fetchTotalCostForSP = (details, callback) => {
  const { SP_Email, Bill_Mode } = details;

  // Check if the required fields are provided
  if (!SP_Email || !Bill_Mode) {
    console.log('Missing required fields:', { SP_Email, Bill_Mode }); // Debugging missing fields
    return callback({ error: 'Missing required fields' }, null);
  }

  console.log('Fetching total cost for:', { SP_Email, Bill_Mode }); // Log the incoming data for debugging

  // Construct the query to fetch total cost for the service provider
  const query = `
    SELECT SUM(B.Total_Cost) AS TotalCost 
    FROM Bill B 
    JOIN Booking K ON K.Book_ID = B.Book_ID
    WHERE K.SP_Email = ? 
      AND K.Book_Status = "Completed" 
      AND B.Bill_Mode = ?`;

  connection.query(query, [SP_Email, Bill_Mode], (err, result) => {
    if (err) {
      console.error('Database error:', err); // Log the error for debugging
      return callback({ error: 'Database error occurred' }, null);  // Provide a generic error message
    }

    console.log('Query result:', result); // Log the query result for debugging

    // Check if any result was returned
    if (result.length === 0) {
      console.log('No records found for the given SP_Email and Bill_Mode');
      return callback(null, { TotalCost: 0 });  // If no results, return a TotalCost of 0
    }

    // Return the result (ensure to access TotalCost properly)
    console.log('Returning total cost:', result[0].TotalCost); // Log the final total cost
    callback(null, result[0].TotalCost);  // result[0] should contain the TotalCost
  });
};
