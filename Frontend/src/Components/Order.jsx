import React, { useState } from 'react';
import axios from 'axios';
import CancelModal from './CancelModal'; // Import the CancelModal component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

function Order({ order, onHelp, onCancel }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);

  const { Book_ID, SP_Email, U_Email, Book_Status, Service_Name, Service_Category, Book_Date, Book_HouseNo, Book_Area, Book_City, Book_State } = order;

  // Define status color based on status value
  let statusColorClass = 'text-gray-500'; // Default color
  if (Book_Status === 'Completed') {
    statusColorClass = 'text-black';
  } else if (Book_Status === 'Confirmed') {
    statusColorClass = 'text-green-500';
  } else if (Book_Status === 'Pending') {
    statusColorClass = 'text-orange-500';
  }

  // Format the date to only show the date part
  const formattedDate = new Date(Book_Date).toLocaleDateString();

  // Function to handle the cancel request
  const handleCancel = (orderId) => {
    setOrderToCancel(orderId);
    setIsModalOpen(true);
  };

  const confirmCancel = async () => {
    try {
      await axios.delete(`http://localhost:4002/bookings/${orderToCancel}`);
      setIsModalOpen(false);
      onCancel(orderToCancel); // Call the onCancel function passed as prop to remove the order from the list
    } catch (error) {
      console.error('Error canceling order:', error);
      // Optionally, handle the error (e.g., by showing an error message or logging it)
    }
  };

  return (
    <>
      <div className="bg-gray-100 shadow-md rounded-lg p-6 mb-4">
        <h3 className="text-lg font-semibold mb-2">Order ID: {Book_ID}</h3>
        <p className="text-gray-700"><strong>Customer:</strong> {U_Email}</p>
        <p className="text-gray-700"><strong>Service:</strong> {Service_Name}</p>
        <p className="text-gray-700"><strong>Category:</strong> {Service_Category}</p>
        <p className="text-gray-700"><strong>Address:</strong> {Book_HouseNo}, {Book_Area}, {Book_City}, {Book_State}</p>
        <p className="text-gray-700"><strong>Appointment Date:</strong> {formattedDate}</p>
        {SP_Email && (
          <p className="text-gray-700"><strong>Service Provider:</strong> {SP_Email}</p>
        )}
        <p className={`font-bold ${statusColorClass}`}>
          Status: {Book_Status}
        </p>

        {/* Show cancel button for Pending and Confirmed */}
        {(Book_Status === 'Pending' || Book_Status === 'Confirmed') && (
          <button
            onClick={() => handleCancel(Book_ID)}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mt-4"
          >
            Cancel Order
          </button>
        )}

        {/* Show review and rating section for Completed orders */}
        {Book_Status === 'Completed' && (
          <div className="mt-4">
            <p className="text-gray-700"><strong>Rating:</strong> {order.rating ? `${order.rating} / 5` : 'Not Rated'}</p>
            <p className="text-gray-700"><strong>Review:</strong> {order.review || 'No Review Provided'}</p>

            {/* Show 'Get Help' icon if getHelp is true */}
            {order.getHelp && (
              <div className="flex items-center mt-2 text-blue-500 cursor-pointer" onClick={() => onHelp(Book_ID)}>
                <FontAwesomeIcon icon={faCircleInfo} className="mr-2" />
                <span>Get Help</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal for cancellation confirmation */}
      <CancelModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmCancel}
        message="Are you sure you want to cancel this order?"
      />
    </>
  );
}

export default Order;
