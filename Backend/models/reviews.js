import connection from "../db/connection.js";

export const getReviewsByServiceName = (Service_Name, callback) => {
  const query = `
    SELECT * FROM 
    rating R
    JOIN bill B ON R.Bill_ID = B.Bill_ID
    JOIN Booking BK ON B.Book_ID = BK.Book_ID
    join user U on
U.U_Email=BK.U_Email
    WHERE Service_Name = ?;
  `;
  
  connection.query(query, [Service_Name], (err, results) => {
    if (err) {
      console.error("Error executing query", err);
      return callback(err, null);
    }
    if (results.length === 0) {
      return callback({ message: "No reviews found" }, null);
    }
    callback(null, results);
  });
};