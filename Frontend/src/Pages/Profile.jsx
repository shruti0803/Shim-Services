import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useAuth } from "../context/AuthContext"; // Import the useAuth hook
import axios from 'axios'; // Import axios for API calls


const Profile = () => {
  const { currentUser } = useAuth(); // Get currentUser from useAuth
  const isServiceProvider = currentUser?.is_SP === 1; // Check if the user is a service provider

  // Get the full name, email, phone, and location from currentUser
  const fullName = currentUser?.U_Name || "User";
  const email = currentUser?.U_Email || "user@example.com";
  const phone = currentUser?.U_Phone || "230899";
  const userLocation = currentUser?.location || "Delhi"; 

  // Generate the user's initials from their name (fallback to "U" if name is undefined)
  const userInitials = fullName
    .split(" ")
    .map((word) => word.charAt(0))
    .join("") || "U";

  // State to manage orders
  const [orders, setOrders] = useState([]); // Initialize orders as an array

  // Fetch orders when the component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:4002/bookings/sp/${currentUser?.U_Email}`);
        console.log("Fetched orders:", response.data); // Log the response to verify the format
        setOrders(response.data); // Assume response.data is an array
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (isServiceProvider) {
      fetchOrders();
    }
  }, [currentUser, isServiceProvider]);

  const handleAccept = (index) => {
    // Handle accept logic here
  };

  const handleDecline = (index) => {
    // Handle decline logic here
  };

  return (
    <div className="flex justify-between p-6 bg-gray-100 min-h-screen">
      {/* Left Section - Personal Information */}
      <div className="w-1/3 bg-white p-6 rounded-lg shadow-md">
        <div className="text-center">
          {/* Profile Picture */}
          <div className="rounded-full w-32 h-32 bg-blue-500 flex items-center justify-center mx-auto text-white text-4xl">
            {userInitials}
          </div>
          <h2 className="text-2xl font-bold mt-4">{fullName}</h2>
          <p className="text-gray-500">{email}</p>
        </div>

        <div className="mt-6 space-y-4">
          {/* Icons and Information */}
          <div className="flex items-center">
            <i className="fas fa-map-marker-alt text-gray-600"></i>
            <p className="ml-2">{userLocation}</p>
          </div>
          <div className="flex items-center">
            <i className="fa-solid fa-phone-alt text-gray-600"></i>
            <p className="ml-2">{phone}</p>
          </div>

          {/* Edit Button */}
          <button className="flex items-center justify-center bg-gray-200 text-black py-2 px-4 rounded-md mt-4 hover:bg-gray-300">
            <i className="fas fa-pencil-alt mr-2"></i>Edit
          </button>
        </div>
      </div>

      {/* Right Section - Orders or Explore Button */}
      <div className="w-2/3 flex items-center justify-center bg-white p-6 rounded-lg shadow-md">
        {isServiceProvider ? (
          Array.isArray(orders) && orders.length > 0 ? (
            <div className="w-full">
              {/* Orders */}
              <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
              <ul className="space-y-4">
                {orders.map((order, index) => (
                  <li key={index} className="p-4 bg-gray-100 rounded-md shadow-md">
                    <h3 className="text-lg font-bold">Booking ID: {order.Book_ID}</h3>
                    <p>Customer: {order.U_Email}</p> {/* Customer email as the name */}
                    <p>Service: {order.Service_Name}</p>
                    <p>Location: {order.Book_Area}, {order.Book_City}</p>
                    <p>Date: {new Date(order.Book_Date).toLocaleString()}</p>
                    <p>Status: {order.Book_Status}</p>

                    {/* Show buttons only for pending orders */}
                    {order.Book_Status === "Pending" && (
                      <div className="mt-2 flex space-x-4">
                        <button
                          className="bg-green-500 text-white py-1 px-4 rounded-md"
                          onClick={() => handleAccept(index)}
                        >
                          Accept
                        </button>
                        <button
                          className="bg-red-500 text-white py-1 px-4 rounded-md"
                          onClick={() => handleDecline(index)}
                        >
                          Decline
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-500">No orders found.</p>
          )
        ) : (
          <div>
            <img
              src="https://www.svgrepo.com/show/259579/search.svg"
              alt="Profile"
              className="m-4 p-4 h-full w-96 mx-auto"
            />
            <button className="bg-green-600 py-2 px-6 rounded-lg">
              Explore Services
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
