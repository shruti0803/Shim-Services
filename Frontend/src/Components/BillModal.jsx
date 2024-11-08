import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const BillModal = ({ order, onClose, onBillGenerated }) => {
  const [laborEntries, setLaborEntries] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [billGenerated, setBillGenerated] = useState(false); // New state to track if bill has been generated
  const [billData, setBillData] = useState(null); // Store generated bill details

  const currentDate = new Date();

  const padZero = (num) => num.toString().padStart(2, '0');
  const formattedDate = `${currentDate.getFullYear()}-${padZero(currentDate.getMonth() + 1)}-${padZero(currentDate.getDate())} ${padZero(currentDate.getHours())}:${padZero(currentDate.getMinutes())}:${padZero(currentDate.getSeconds())}`;

  const handleAddLaborEntry = () => {
    setLaborEntries([...laborEntries, { description: "", hours: "", rate: "", total: 0 }]);
  };

  const handleLaborChange = (index, field, value) => {
    const updatedLaborEntries = [...laborEntries];
    updatedLaborEntries[index][field] = value;

    if (field === "hours" || field === "rate") {
      const hours = parseFloat(updatedLaborEntries[index].hours) || 0;
      const rate = parseFloat(updatedLaborEntries[index].rate) || 0;
      updatedLaborEntries[index].total = hours * rate;
    }

    setLaborEntries(updatedLaborEntries);
    setTotalCost(updatedLaborEntries.reduce((acc, entry) => acc + entry.total, 0));
  };

  const handleDeleteLaborEntry = (index) => {
    const updatedLaborEntries = laborEntries.filter((_, i) => i !== index);
    setLaborEntries(updatedLaborEntries);
    setTotalCost(updatedLaborEntries.reduce((acc, entry) => acc + entry.total, 0));
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleGenerateBill = async () => {
  const newBillData = {
    Book_ID: order.Book_ID,
    Bill_Date: formattedDate,
    Bill_Mode: paymentMethod,
    Labor_Entries: laborEntries,
  };

  try {
    const response = await axios.post('http://localhost:4002/bills', newBillData);
    console.log(response);
    
    // Set the new billData with response values
    setBillData({
      ...newBillData, // Include the newBillData
      Bill_ID: response.data.data.Bill_ID, // Add the Bill_ID from the response
      // Add any other necessary properties from response.data if needed
    });

    // Save generated bill data
    setBillGenerated(true); // Set billGenerated to true
    onBillGenerated(order.Book_ID);
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

        {!billGenerated ? (
          <>
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

            <div className="mt-4">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                onClick={handleAddLaborEntry}
              >
                Add Labor Description
              </button>
            </div>

            {laborEntries.length > 0 && (
              <div className="mt-4">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="text-left">
                      <th className="border-b py-2 px-4">Labor Description</th>
                      <th className="border-b py-2 px-4">Labor Hours</th>
                      <th className="border-b py-2 px-4">Labor Rate</th>
                      <th className="border-b py-2 px-4">Total</th>
                      <th className="border-b py-2 px-4">Actions</th>
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

            {laborEntries.length > 0 && (
              <div className="mt-4 flex justify-between font-semibold text-lg">
                <p>Total Labor Cost:</p>
                <p>{totalCost.toFixed(2)}</p>
              </div>
            )}

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
          </>
        ) : (
          <>
            <h3 className="text-xl font-bold text-gray-700 mb-4">Bill Generated Successfully</h3>
            <div className="text-gray-600">
              <p><strong>Bill ID:</strong> {billData.Bill_ID}</p>
              <p><strong>Bill ID:</strong> {billData.Book_ID}</p>
              <p><strong>Date:</strong> {billData.Bill_Date}</p>
              <p><strong>Payment Method:</strong> {paymentMethod}</p>
              {/* <p><strong>Labor Description:</strong> {laborEntries}</p> */}
              <p><strong>Total Cost:</strong> {totalCost}</p>
              {/* Add more bill data as needed */}
            </div>
            <div className="mt-4">
              <button
                onClick={onClose}
                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BillModal;
