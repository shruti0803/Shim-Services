import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const BookingForm = ({ isOpen, onClose, serviceName, service }) => {
  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState({
    bookStatus: 'Pending',
    serviceName: serviceName,
    serviceCategory: service ? service.title : '',
    bookHouseNo: '',
    bookArea: '',
    bookCity: '',
    bookCityPin: '',
    bookState: '',
    customerName: '',
    customerPhone: '',
    //sp_email, //book_date
  });

  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get('http://localhost:4002/cities');
        // Sort the cities in ascending order by name
        const sortedCities = response.data.sort((a, b) => a.City_Name.localeCompare(b.City_Name));
        setCities(sortedCities);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };
  
    fetchCities();
  }, []);
  

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'bookCity') {
      const selectedCity = cities.find(city => city.City_Name === value);
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        bookCityPin: selectedCity ? selectedCity.City_PIN : '', // Set city PIN based on selected city
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = {
      U_Email: currentUser?.U_Email || '',
      Book_Status: formData.bookStatus,
      Service_Name: formData.serviceName,
      Service_Category: formData.serviceCategory,
      Book_HouseNo: formData.bookHouseNo,
      Book_Area: formData.bookArea,
      Book_City: formData.bookCity,
      Book_City_PIN: formData.bookCityPin,
      Book_State: formData.bookState,
      Customer_Name: formData.customerName,
      Customer_Phone: formData.customerPhone,
      // book_date, book_id, sp_email
    };

    try {
      const response = await axios.post('http://localhost:4002/bookingPost', formDataToSend);
      console.log('Booking successfully created:', response.data);
      onClose();
    } catch (error) {
      console.error('Error creating booking:', error.response?.data || error.message);
    }
  };

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
      <div className="relative w-full max-w-lg bg-white rounded-xl p-6 max-h-[90vh] overflow-y-auto">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <button
            onClick={onClose}
            className="absolute right-2 top-2 text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>

          <h3 className="font-bold text-lg text-gray-800">Booking Form</h3>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h4 className="font-bold text-green-600">{service.title}</h4>
            <ul className="list-disc list-inside">
              {service.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>
          </div>

          <div>
            <label className="block text-sm font-bold mb-1 text-gray-700">Customer Name</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1 text-gray-700">Phone Number</label>
            <input
              type="text"
              name="customerPhone"
              value={formData.customerPhone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1 text-gray-700">House Number</label>
            <input
              type="text"
              name="bookHouseNo"
              value={formData.bookHouseNo}
              onChange={handleChange}
              placeholder="Enter your house number"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1 text-gray-700">Area</label>
            <input
              type="text"
              name="bookArea"
              value={formData.bookArea}
              onChange={handleChange}
              placeholder="Enter your area"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

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
              {cities.length > 0 ? (
                cities.map((city) => (
                  <option key={city.City_PIN} value={city.City_Name}>{city.City_Name}</option>
                ))
              ) : (
                <option disabled>Loading cities...</option>
              )}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold mb-1 text-gray-700">City PIN</label>
            <input
              type="number"
              name="bookCityPin"
              value={formData.bookCityPin}
              onChange={handleChange}
              placeholder="City PIN"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled // Disable the input field to prevent editing
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1 text-gray-700">State</label>
            <input
              type="text"
              name="bookState"
              value={formData.bookState}
              onChange={handleChange}
              placeholder="Enter your state"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

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
