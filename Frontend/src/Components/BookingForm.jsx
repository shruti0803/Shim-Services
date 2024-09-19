import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const BookingForm = ({ isOpen, onClose, serviceName, service }) => {
  const [formData, setFormData] = useState({
    bookStatus: '',
    serviceName: serviceName,
    serviceCategory: service ? service.title : '',
    bookHouseNo: '',
    bookArea: '',
    bookCity: '',
    bookCityPin: '',
    bookState: '',
    customerName: '',
    customerPhone: '',
  });
  const currentDate = new Date().toISOString().split('T')[0]; 
  const { currentUser,setCurrentUser } = useAuth();;

  const cities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad',
    'Chennai', 'Kolkata', 'Surat', 'Pune', 'Jaipur', 'Lucknow', 
    'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam','Faridabad','Ludhiana','Ghaziabad','Varanasi','Meerut','Agra','Rajkot','Vadodara','Vasai-Vihar','Pimrpi-Chinchwad','Nashik','Chhindwara','Patna','Ranchi'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Form Data:', formData);

    const formDataToSend = {
// Ensure this field is included in the formData state if needed
      U_Email: currentUser.U_Email || '',
      Book_Status: "Pending",
      Service_Name: formData.serviceName,
      Service_Category: formData.serviceCategory,
      Book_Date: currentDate,
      Book_HouseNo: formData.bookHouseNo,
      Book_Area: formData.bookArea,
      Book_City: formData.bookCity,
      Book_City_PIN: formData.bookCityPin,
      Book_State: formData.bookState,
      Customer_Name: formData.customerName,
      Customer_Phone: formData.customerPhone,
    };
    console.log("Form",formDataToSend);
    

    try {
      const response = await fetch('http://localhost:4002/bookingPost', { // Ensure this matches your backend API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSend),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Booking successfully created:', result);
        // Handle success (e.g., show a success message, reset form, close modal)
        onClose(); // Close the form/modal
      } else {
        const error = await response.json();
        console.error('Error creating booking:', error);
        // Handle error (e.g., show error message to user)
      }
    } catch (error) {
      console.error('Network error:', error);
      // Handle network error
    }
    // Add your API call or submit logic here
  };

  // Disable body scroll when the modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Modal Box */}
      <div className="relative w-full max-w-lg bg-white rounded-xl p-6 max-h-[90vh] overflow-y-auto">
        <form className="space-y-4 relative z-10" onSubmit={handleSubmit}>
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-2 top-2 text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>

          {/* Form Title */}
          <h3 className="font-bold text-lg text-gray-800">Booking Form</h3>

          {/* Selected Service */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h4 className="font-bold text-green-600">{service.title}</h4>
            <ul className="list-disc list-inside">
              {service.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>
          </div>

          {/* Customer Name */}
          <div>
            <label className="block text-sm font-bold mb-1 text-gray-700">Customer Name</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-bold mb-1 text-gray-700">Phone Number</label>
            <input
              type="text"
              name="customerPhone"
              value={formData.customerPhone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* House Number */}
          <div>
            <label className="block text-sm font-bold mb-1 text-gray-700">House Number</label>
            <input
              type="text"
              name="bookHouseNo"
              value={formData.bookHouseNo}
              onChange={handleChange}
              placeholder="Enter your house number"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Area */}
          <div>
            <label className="block text-sm font-bold mb-1 text-gray-700">Area</label>
            <input
              type="text"
              name="bookArea"
              value={formData.bookArea}
              onChange={handleChange}
              placeholder="Enter your area"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-bold mb-1 text-gray-700">City</label>
            <select
              name="bookCity"
              value={formData.bookCity}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* City PIN */}
          <div>
            <label className="block text-sm font-bold mb-1 text-gray-700">City PIN</label>
            <input
              type="number"
              name="bookCityPin"
              value={formData.bookCityPin}
              onChange={handleChange}
              placeholder="Enter your city PIN"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-bold mb-1 text-gray-700">State</label>
            <input
              type="text"
              name="bookState"
              value={formData.bookState}
              onChange={handleChange}
              placeholder="Enter your state"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white font-bold rounded-md hover:bg-green-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
