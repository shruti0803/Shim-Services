import React from 'react';

const BookingForm = ({ isOpen, onClose, service }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Modal Box */}
      <div className="relative w-full max-w-lg bg-white rounded-xl p-6">
        

        <form className="space-y-4 relative z-10">
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
              placeholder="Enter your name"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-bold mb-1 text-gray-700">Location</label>
            <input
              type="text"
              placeholder="Enter your location"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-bold mb-1 text-gray-700">City</label>
            <input
              type="text"
              placeholder="Enter your city"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-bold mb-1 text-gray-700">Phone Number</label>
            <input
              type="text"
              placeholder="Enter your phone number"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button className="px-4 py-2 bg-green-600 text-white font-bold rounded-md hover:bg-green-700">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
