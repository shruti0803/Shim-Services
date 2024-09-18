import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Profile = () => {
  // Example orders data (you can fetch this from an API or database)
  const orders = [
    {
      title: "Home Cleaning",
      status: "Pending",
      date: "2024-09-18",
      customer: "John Doe",
    },
    {
      title: "Plumbing Service",
      status: "Pending",
      date: "2024-09-20",
      customer: "Jane Smith",
    },
  ];

  const isServiceProvider = false; // Change this to false to hide orders

  // State to manage order actions (accept/decline)
  const [orderStatuses, setOrderStatuses] = useState(
    orders.map((order) => order.status)
  );

  const handleAccept = (index) => {
    const updatedStatuses = [...orderStatuses];
    updatedStatuses[index] = "Accepted";
    setOrderStatuses(updatedStatuses);
  };

  const handleDecline = (index) => {
    const updatedStatuses = [...orderStatuses];
    updatedStatuses[index] = "Declined";
    setOrderStatuses(updatedStatuses);
  };

  return (
    <div className="flex justify-between p-6 bg-gray-100 min-h-screen">
      {/* Left Section - Personal Information */}
      <div className="w-1/3 bg-white p-6 rounded-lg shadow-md">
        <div className="text-center">
          {/* Profile Picture */}
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="rounded-full w-32 mx-auto"
          />
          <h2 className="text-2xl font-bold mt-4">Shruti</h2>
          <p className="text-gray-500">shruticha@gmail.com</p>
        </div>

        <div className="mt-6 space-y-4">
          {/* Icons and Information */}
          <div className="flex items-center">
            <i className="fas fa-map-marker-alt text-gray-600"></i>
            <p className="ml-2">Located in Varanasi</p>
          </div>
          <div className="flex items-center">
            <i className="fas fa-calendar-alt text-gray-600"></i>
            <p className="ml-2">Joined in September 2024</p>
          </div>
          <div className="flex items-center">
            <i className="fas fa-language text-gray-600"></i>
            <p className="ml-2">English (Conversational)</p>
          </div>
          <div className="flex items-center">
            <i className="fas fa-clock text-gray-600"></i>
            <p className="ml-2">Preferred hours: Sat-Wed, 1:00 AM-3:00 AM</p>
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
          orders && orders.length > 0 ? (
            <div className="w-full">
              {/* Orders */}
              <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
              <ul className="space-y-4">
                {orders.map((order, index) => (
                  <li
                    key={index}
                    className="p-4 bg-gray-100 rounded-md shadow-md"
                  >
                    <h3 className="text-lg font-bold">{order.title}</h3>
                    <p>Customer: {order.customer}</p>
                    <p>Date: {order.date}</p>
                    <p>Status: {orderStatuses[index]}</p>

                    {/* Accept/Decline Buttons */}
                    {orderStatuses[index] === "Pending" && (
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
            className=" m-4 p-4 h-full w-96  mx-auto"
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
