import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // Import axios

const BillModal = ({ order, onClose,onBillGenerated }) => {
  const [laborEntries, setLaborEntries] = useState([]); // To store labor descriptions
  const [totalCost, setTotalCost] = useState(0); // To track total labor costa
  const [paymentMethod, setPaymentMethod] = useState(""); // To store selected payment method

  const currentDate = new Date();

// Function to add leading zero if necessary
const padZero = (num) => num.toString().padStart(2, '0');

// Format the date as 'YYYY-MM-DD HH:mm:ss'
const formattedDate = `${currentDate.getFullYear()}-${padZero(currentDate.getMonth() + 1)}-${padZero(currentDate.getDate())} ${padZero(currentDate.getHours())}:${padZero(currentDate.getMinutes())}:${padZero(currentDate.getSeconds())}`;

  // Function to handle adding a labor entry
  const handleAddLaborEntry = () => {
    setLaborEntries([...laborEntries, { description: "", hours: "", rate: "", total: 0 }]);
  };

  // Function to handle change in any labor input
  const handleLaborChange = (index, field, value) => {
    const updatedLaborEntries = [...laborEntries];
    updatedLaborEntries[index][field] = value;

    // Recalculate total for the specific labor row
    if (field === "hours" || field === "rate") {
      const hours = parseFloat(updatedLaborEntries[index].hours) || 0;
      const rate = parseFloat(updatedLaborEntries[index].rate) || 0;
      updatedLaborEntries[index].total = hours * rate;
    }

    setLaborEntries(updatedLaborEntries);
    setTotalCost(updatedLaborEntries.reduce((acc, entry) => acc + entry.total, 0)); // Recalculate total cost
  };

  // Function to delete a labor entry
  const handleDeleteLaborEntry = (index) => {
    const updatedLaborEntries = laborEntries.filter((_, i) => i !== index);
    setLaborEntries(updatedLaborEntries);
    setTotalCost(updatedLaborEntries.reduce((acc, entry) => acc + entry.total, 0)); // Recalculate total cost
  };

  // Function to handle payment method selection
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // Function to generate bill and send POST request
  const handleGenerateBill = async () => {
    const billData = {
      Book_ID: order.Book_ID,
      Bill_Date: formattedDate, // Assuming current date and time
      Bill_Mode: paymentMethod,
      Labor_Entries:laborEntries
      // Labor_Hours: laborEntries.reduce((acc, entry) => acc + (parseFloat(entry.hours) || 0), 0),
      // Labor_Description: laborEntries.map(entry => entry.description).join(", "),
      // Labor_Rate: laborEntries.reduce((acc, entry) => acc + (parseFloat(entry.rate) || 0), 0)
    };

    try {
      const response = await axios.post('http://localhost:4002/bills', billData);
      console.log("Bill generated successfully:", response.data);
      // Optionally, you can show a success message or take further action
      alert("Bill generated successfully!");
      onBillGenerated(order.Book_ID); // Update the accepted orders state
      onClose();  // Close the modal after successful bill generation
    } catch (error) {
      console.error("Error generating bill:", error);
      alert("Error generating bill.");
    }
  };

  return (
    <div className="fixed inset-0 pt-3 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-1/2 max-h-[80vh] overflow-auto shadow-lg border border-gray-300">
        <div className="border-b pb-4 mb-4 text-center">
          <h2 className="text-2xl font-bold text-gray-700">Invoice</h2>
          <p className="text-sm text-gray-500">Thank you for your service!</p>
        </div>

        {/* Bill Details */}
        <div className="grid grid-cols-2 gap-y-4 gap-x-6">
          <div className="flex justify-between">
            <p className="font-semibold text-gray-600">Bill ID:</p>
            <p>{order.Book_ID}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold text-gray-600">Service Provider Email:</p>
            <p>{order.SP_Email}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold text-gray-600">Customer Email:</p>
            <p>{order.U_Email}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold text-gray-600">Service Name:</p>
            <p>{order.Service_Name}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold text-gray-600">Address:</p>
            <p>{order.Book_Area}, {order.Book_City}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold text-gray-600">Date:</p>
            <p>{new Date(order.Book_Date).toLocaleDateString()}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold text-gray-600">Time:</p>
            <p>{new Date(order.Book_Date).toLocaleTimeString()}</p>
          </div>
        </div>

        {/* Add Labor Description Button */}
        <div className="mt-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            onClick={handleAddLaborEntry}
          >
            Add Labor Description
          </button>
        </div>

        {/* Labor Entries Table */}
        {laborEntries.length > 0 && (
          <div className="mt-4">
            <table className="w-full table-auto">
              <thead>
                <tr className="text-left">
                  <th className="border-b py-2 px-4">Labor Description</th>
                  <th className="border-b py-2 px-4">Labor Hours</th>
                  <th className="border-b py-2 px-4">Labor Rate</th>
                  <th className="border-b py-2 px-4">Total</th>
                  <th className="border-b py-2 px-4">Actions</th> {/* Column for Delete Icon */}
                </tr>
              </thead>
              <tbody>
                {laborEntries.map((entry, index) => (
                  <tr key={index}>
                    <td className="border-b py-2 px-4">
                      <input
                        type="text"
                        value={entry.description}
                        onChange={(e) => handleLaborChange(index, "description", e.target.value)}
                        className="border w-full px-2 py-1 text-lg"
                      />
                    </td>
                    <td className="border-b py-2 px-4">
                      <input
                        type="number"
                        value={entry.hours}
                        onChange={(e) => handleLaborChange(index, "hours", e.target.value)}
                        className="border w-full px-2 py-1"
                      />
                    </td>
                    <td className="border-b py-2 px-4">
                      <input
                        type="number"
                        value={entry.rate}
                        onChange={(e) => handleLaborChange(index, "rate", e.target.value)}
                        className="border w-full px-2 py-1"
                      />
                    </td>
                    <td className="border-b py-2 px-4">{entry.total.toFixed(2)}</td>
                    <td className="border-b py-2 px-4">
                      <button
                        onClick={() => handleDeleteLaborEntry(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Total Labor Cost */}
        {laborEntries.length > 0 && (
          <div className="mt-4 flex justify-between font-semibold text-lg">
            <p>Total Labor Cost:</p>
            <p>{totalCost.toFixed(2)}</p>
          </div>
        )}

        {/* Payment Method Selection */}
        <div className="mt-4">
          <p className="font-semibold text-gray-600">Payment Method:</p>
          <select
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
            className="border w-full px-3 py-2 rounded-md"
          >
            <option value="">Select Payment Method</option>
            <option value="online">Online</option>
            <option value="cash">Cash</option>
          </select>
        </div>

        <div className="border-t mt-4 pt-4">
          <button
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
            onClick={handleGenerateBill}
          >
            Generate Bill
          </button>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillModal;
