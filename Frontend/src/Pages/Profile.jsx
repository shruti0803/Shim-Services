// src/components/Profile.js
import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useAuth } from "../context/AuthContext"; // Import the useAuth hook
import ServiceProviderOrders from "../Components/ServiceProviderOrders"; // Import the new ServiceProviderOrders component

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
      {isServiceProvider ? (
        <ServiceProviderOrders userEmail={email} />
      ) : (
        <div className="w-2/3 flex items-center justify-center bg-white p-6 rounded-lg shadow-md">
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
  );
};

export default Profile;
