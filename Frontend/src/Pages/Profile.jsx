import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useAuth } from "../context/AuthContext";
import axios from 'axios';
import { io } from 'socket.io-client';

// Initialize Socket.IO client
const socket = io('http://localhost:4002', {
  transports: ['websocket', 'polling'],
  reconnectionAttempts: 5,
});

const Profile = () => {
  const { currentUser } = useAuth();
  const isServiceProvider = currentUser?.is_SP === 1;
  const [orders, setOrders] = useState([]);

  const fullName = currentUser?.U_Name || "User";
  const email = currentUser?.U_Email || "user@example.com";
  const phone = currentUser?.U_Phone || "230899";
  const userLocation = currentUser?.location || "Delhi";

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:4002/bookings/sp/${currentUser?.U_Email}`);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (isServiceProvider) fetchOrders();

    socket.on('orderAccepted', (data) => {
      if (data.orderStatus === "Accepted" && data.serviceProviderId === currentUser?.U_Email) {
        setOrders((prevOrders) => prevOrders.filter(order => order.Book_ID !== data.orderId));
      }
    });

    socket.on('orderCancelled', (data) => {
      if (data.serviceProviderId === currentUser?.U_Email) {
        setOrders((prevOrders) => prevOrders.filter(order => order.Book_ID !== data.orderId));
      }
    });

    return () => {
      socket.off('orderAccepted');
      socket.off('orderCancelled');
    };
  }, [isServiceProvider, currentUser]);

  const handleAccept = async (orderId) => {
    try {
      const response = await axios.post(`http://localhost:4002/bookings/accept-order/${orderId}`);
      
      if (response.status === 200) {
        socket.emit('acceptOrder', { orderId, serviceProviderId: currentUser?.U_Email, orderStatus: 'Accepted' });
        setOrders((prevOrders) => prevOrders.filter(order => order.Book_ID !== orderId));
      } else {
        console.error("Failed to accept order, unexpected status:", response.status);
      }
    } catch (error) {
      console.error("Error accepting order:", error);
      alert("There was an error accepting the order. Please try again.");
    }
  };

  const handleCancel = async (orderId) => {
    try {
      const response = await axios.post(`http://localhost:4002/bookings/cancel-order/${orderId}`);
      
      if (response.status === 200) {
        socket.emit('cancelOrder', { orderId, serviceProviderId: currentUser?.U_Email });
        setOrders((prevOrders) => prevOrders.filter(order => order.Book_ID !== orderId));
      } else {
        console.error("Failed to cancel order, unexpected status:", response.status);
      }
    } catch (error) {
      console.error("Error canceling order:", error);
      alert("There was an error canceling the order. Please try again.");
    }
  };

  return (
    <div className="flex justify-between p-6 bg-gray-100 min-h-screen">
      <div className="w-1/3 bg-white p-6 rounded-lg shadow-md">
        <div className="text-center">
          <div className="rounded-full w-32 h-32 bg-blue-500 flex items-center justify-center mx-auto text-white text-4xl">
            {fullName.split(" ").map((word) => word[0]).join("") || "U"}
          </div>
          <h2 className="text-2xl font-bold mt-4">{fullName}</h2>
          <p className="text-gray-500">{email}</p>
        </div>
        <div className="mt-6 space-y-4">
          <div className="flex items-center">
            <i className="fas fa-map-marker-alt text-gray-600"></i>
            <p className="ml-2">{userLocation}</p>
          </div>
          <div className="flex items-center">
            <i className="fa-solid fa-phone-alt text-gray-600"></i>
            <p className="ml-2">{phone}</p>
          </div>
          <button className="bg-gray-200 text-black py-2 px-4 rounded-md mt-4 hover:bg-gray-300">
            <i className="fas fa-pencil-alt mr-2"></i>Edit
          </button>
        </div>
      </div>

      <div className="w-2/3 bg-white p-6 rounded-lg shadow-md">
        {isServiceProvider && orders.length > 0 ? (
          <div className="w-full">
            <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
            <ul className="space-y-4">
              {orders.map((order) => (
                <li key={order.Book_ID} className="p-4 bg-gray-100 rounded-md shadow-md">
                  <h3 className="text-lg font-bold">Booking ID: {order.Book_ID}</h3>
                  <p>Customer: {order.U_Email}</p>
                  <p>Service: {order.Service_Name}</p>
                  <p>Location: {order.Book_Area}, {order.Book_City}</p>
                  <p>Date: {new Date(order.Book_Date).toLocaleString()}</p>
                  <p>Status: {order.Book_Status}</p>
                  {order.Book_Status === "Pending" && (
                    <div className="mt-2 flex space-x-4">
                      <button className="bg-green-500 text-white py-1 px-4 rounded-md" onClick={() => handleAccept(order.Book_ID)}>
                        Accept
                      </button>
                      <button className="bg-red-500 text-white py-1 px-4 rounded-md" onClick={() => handleCancel(order.Book_ID)}>
                        Cancel
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-500">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
