import React, { useState, useEffect } from "react";
import axios from 'axios';

const ServiceProviderOrders = ({ userEmail }) => {
  const [incomingOrders, setIncomingOrders] = useState([]); // For Pending Orders
  const [acceptedOrders, setAcceptedOrders] = useState([]); // For Accepted Orders

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Fetch service names for the provider
        const responseServiceName = await axios.get(`http://localhost:4002/services/${userEmail}`);
        const serviceName = responseServiceName.data.services.map(service => service.Service_Name);

        // Fetch all available bookings related to the service
        const response = await axios.get(`http://localhost:4002/available-bookings/${serviceName}`);
        
        // Separate orders into incoming and accepted
        const incoming = response.data.filter(order => order.Book_Status === 'Pending');
        const accepted = response.data.filter(order => order.Book_Status === 'Scheduled');
        
        // Set the states
        setIncomingOrders(incoming);
        setAcceptedOrders(accepted);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [userEmail]);

  const handleAccept = async (orderId) => {
    try {
      // Move accepted order to acceptedOrders and remove from incomingOrders
      const orderToAccept = incomingOrders.find(order => order.Book_ID === orderId);
  
      // Call the API to update the booking status
      const response = await axios.put(`http://localhost:4002/update-status/${orderId}`, {
        newStatus: 'Scheduled',  // Update status to 'Scheduled'
      });
  
      if (response.status === 200) {
        // If successful, update the frontend state
        setAcceptedOrders((prevState) => [...prevState, orderToAccept]);
        setIncomingOrders((prevState) => prevState.filter(order => order.Book_ID !== orderId));
      } else {
        console.error("Error updating booking status");
      }
    } catch (error) {
      console.error("Error accepting order:", error);
    }
  };

  const handleDecline = (orderId) => {
    // Remove declined order from incomingOrders
    setIncomingOrders((prevState) => prevState.filter(order => order.Book_ID !== orderId));
  };

  const handleGenerateBill = (orderId) => {
    console.log("Generating bill for order ID:", orderId);
    // Implement the bill generation logic here
  };

  return (
    <div className="w-full flex justify-center items-start p-6 bg-white rounded-lg shadow-md">
      <div className="flex w-full space-x-8">
        {/* Incoming Orders Section */}
        <div className="w-1/2">
          <h2 className="text-xl font-semibold mb-4">Incoming Orders</h2>
          <ul className="space-y-4">
            {incomingOrders.length > 0 ? (
              incomingOrders.map((order) => (
                <li key={order.Book_ID} className="p-4 bg-gray-100 rounded-md shadow-md">
                  <h3 className="text-lg font-bold">Booking ID: {order.Book_ID}</h3>
                  <p>Customer: {order.U_Email}</p>
                  <p>Service: {order.Service_Name}</p>
                  <p>Location: {order.Book_Area}, {order.Book_City}</p>
                  <p>Date: {new Date(order.Book_Date).toLocaleString()}</p>
                  <p>Status: {order.Book_Status}</p>

                  {/* Accept and Decline buttons for pending orders */}
                  {order.Book_Status === "Pending" && (
                    <div className="mt-2 flex space-x-4">
                      <button
                        className="bg-green-500 text-white py-1 px-4 rounded-md"
                        onClick={() => handleAccept(order.Book_ID)}
                      >
                        Accept
                      </button>
                      <button
                        className="bg-red-500 text-white py-1 px-4 rounded-md"
                        onClick={() => handleDecline(order.Book_ID)}
                      >
                        Decline
                      </button>
                    </div>
                  )}
                </li>
              ))
            ) : (
              <p className="text-gray-500">No incoming orders.</p>
            )}
          </ul>
        </div>

        {/* Accepted Orders Section */}
        <div className="w-1/2">
          <h2 className="text-xl font-semibold mb-4">Accepted Orders</h2>
          <ul className="space-y-4">
            {acceptedOrders.length > 0 ? (
              acceptedOrders.map((order) => (
                <li key={order.Book_ID} className="p-4 bg-gray-100 rounded-md shadow-md">
                  <h3 className="text-lg font-bold">Booking ID: {order.Book_ID}</h3>
                  <p>Customer: {order.U_Email}</p>
                  <p>Service: {order.Service_Name}</p>
                  <p>Location: {order.Book_Area}, {order.Book_City}</p>
                  <p>Date: {new Date(order.Book_Date).toLocaleString()}</p>
                  <p>Status: {order.Book_Status}</p>

                  {/* Show Generate Bill button for accepted orders */}
                  <div className="mt-4">
                    <button
                      className="bg-blue-500 text-white py-1 px-4 rounded-md"
                      onClick={() => handleGenerateBill(order.Book_ID)}
                    >
                      Generate Bill
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No accepted orders.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderOrders;
