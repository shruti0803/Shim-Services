import React, { useState, useEffect } from "react";
import axios from 'axios';
import BillModal from "./BillModal";

const ServiceProviderOrders = ({ SPEmail }) => {
  const [incomingOrders, setIncomingOrders] = useState([]);
  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch orders from the server
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Fetch service names associated with the service provider
        const responseServiceName = await axios.get(`http://localhost:4002/services/${SPEmail}`);
        const serviceName = responseServiceName.data.services.map(service => service.Service_Name);

        // Fetch incoming orders
        const response = await axios.get(`http://localhost:4002/available-bookings/${serviceName}`);
        const incoming = response.data.filter(order => order.Book_Status === 'Pending');
        setIncomingOrders(incoming);

        // Fetch accepted orders
        const acceptedResponse = await axios.get(`http://localhost:4002/bookings/sp/${SPEmail}`);
        const accepted = acceptedResponse.data.filter(order => order.Book_Status === 'Scheduled');
        
        // Update accepted orders with bill status
        const updatedAcceptedOrders = await fetchBillsForOrders(accepted);
        setAcceptedOrders(updatedAcceptedOrders);

      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, [SPEmail]);

  // Accept an order and update status
  const handleAccept = async (orderId) => {
    try {
      const orderToAccept = incomingOrders.find(order => order.Book_ID === orderId);

      const response = await axios.put(`http://localhost:4002/update-status/${orderId}`, {
        newStatus: 'Scheduled',
        SP_Email: SPEmail
      });

      if (response.status === 200) {
        const updatedOrder = { ...orderToAccept, Book_Status: 'Scheduled', billGenerated: false };
        setAcceptedOrders(prevState => {
          // Ensure order isn't already in acceptedOrders to avoid duplication
          if (prevState.some(order => order.Book_ID === orderId)) return prevState;
          return [...prevState, updatedOrder];
        });
        setIncomingOrders(prevState => prevState.filter(order => order.Book_ID !== orderId));
      } else {
        console.error("Error updating booking status");
      }
    } catch (error) {
      console.error("Error accepting order:", error);
    }
  };

  // Decline an order
  const handleDecline = (orderId) => {
    setIncomingOrders((prevState) => prevState.filter(order => order.Book_ID !== orderId));
  };

  // Open the bill generation modal
  const handleGenerateBill = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  // Mark an order as bill-generated once the bill is created
  const handleBillGenerated = (orderId) => {
    setAcceptedOrders((prevState) =>
      prevState.map(order =>
        order.Book_ID === orderId ? { ...order, billGenerated: true } : order
      )
    );
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  // Check if a bill exists for an order
  const checkBillExistence = async (bookId) => {
    try {
      const response = await axios.get(`http://localhost:4002/bills/${bookId}`);
      return response.data ? true : false;
    } catch (error) {
      return false;
    }
  };

  // Check for bills for each accepted order
  const fetchBillsForOrders = async (orders) => {
    const updatedOrders = await Promise.all(
      orders.map(async (order) => {
        const billExists = await checkBillExistence(order.Book_ID);
        return { ...order, billGenerated: billExists };
      })
    );
    return updatedOrders;
  };

  return (
    <div className="w-full flex justify-center items-start p-6 bg-white rounded-lg shadow-md">
      <div className="flex w-full space-x-8">
        {/* Incoming Orders Column */}
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

        {/* Accepted Orders Column */}
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
                  <div className="mt-4">
                    {order.billGenerated ? (
                      <p className="text-green-500">Bill has been generated.</p>
                    ) : (
                      <button
                        className="bg-green-500 text-white py-2 px-4 rounded-md"
                        onClick={() => handleGenerateBill(order)}
                      >
                        Generate Bill
                      </button>
                    )}
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No accepted orders.</p>
            )}
          </ul>
        </div>
      </div>

      {isModalOpen && (
        <BillModal order={selectedOrder} onClose={closeModal} onBillGenerated={handleBillGenerated} />
      )}
    </div>
  );
};

export default ServiceProviderOrders;
