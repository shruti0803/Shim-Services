import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

function Order({ order, onCancel, onHelp }) {
  const { id, customerName, serviceType, serviceAddress, appointmentDate, status, serviceProviderName, rating, review, getHelp } = order;

  // Define status color based on status value
  let statusColorClass = 'text-gray-500'; // Default color
  if (status === 'Completed') {
    statusColorClass = 'text-black';
  } else if (status === 'Scheduled') {
    statusColorClass = 'text-green-500';
  } else if (status === 'In Progress') {
    statusColorClass = 'text-orange-500';
  }

  return (
    <div className="bg-gray-100 shadow-md rounded-lg p-6 mb-4">
      <h3 className="text-lg font-semibold mb-2">Order ID: {id}</h3>
      <p className="text-gray-700"><strong>Customer:</strong> {customerName}</p>
      <p className="text-gray-700"><strong>Service:</strong> {serviceType}</p>
      <p className="text-gray-700"><strong>Address:</strong> {serviceAddress}</p>
      <p className="text-gray-700"><strong>Appointment Date:</strong> {new Date(appointmentDate).toLocaleString()}</p>
      {serviceProviderName && (
        <p className="text-gray-700"><strong>Service Provider:</strong> {serviceProviderName}</p>
      )}
      <p className={`font-bold ${statusColorClass}`}>
        Status: {status}
      </p>

      {/* Show cancel button for Scheduled and In Progress */}
      {(status === 'Scheduled' || status === 'In Progress') && (
        <button
          onClick={() => onCancel(id)}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mt-4"
        >
          Cancel Order
        </button>
      )}

      {/* Show review and rating section for Completed orders */}
      {status === 'Completed' && (
        <div className="mt-4">
          <p className="text-gray-700"><strong>Rating:</strong> {rating ? `${rating} / 5` : 'Not Rated'}</p>
          <p className="text-gray-700"><strong>Review:</strong> {review || 'No Review Provided'}</p>

          {/* Show 'Get Help' icon if getHelp is true */}
          {getHelp && (
            <div className="flex items-center mt-2 text-blue-500 cursor-pointer">
              <FontAwesomeIcon icon={faCircleInfo} className="mr-2" />
              <span>Get Help</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Order;
