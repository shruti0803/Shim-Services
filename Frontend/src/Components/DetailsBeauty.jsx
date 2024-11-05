import React, { useState } from 'react';
import BookingForm from './BookingForm';
import Login from './Login'; // Import the Login component
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Details = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false); // New state for login dialog
  const [selectedService, setSelectedService] = useState(null);
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  const services = [
    // Array of service objects as in your example
  ];

  const openDialog = (service) => {
    setSelectedService(service);
    if (isAuth) {
      setIsDialogOpen(true);
    } else {
      setIsLoginDialogOpen(true); // Open login dialog if not authenticated
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedService(null);
  };

  const closeLoginDialog = () => {
    setIsLoginDialogOpen(false);
    if (isAuth) {
      setIsDialogOpen(true); // Open booking dialog after successful login
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex flex-col items-center justify-between border border-black rounded-lg p-4 transition-transform duration-300 hover:scale-105 mt-2"
          >
            <div className="pb-2">
              <img
                src={service.imgSrc}
                className="h-40 w-40 rounded-lg"
                alt="service-img"
              />
            </div>
            <div className="pl-2 text-left">
              <p className="text-green-600">30-DAY WARRANTY</p>
              <h5 className="font-bold">{service.title}</h5>
              <ul className="list-disc list-inside">
                {service.description.map((desc, index) => (
                  <li key={index}>{desc}</li>
                ))}
              </ul>
              <p className="font-bold text-green-600">
                Initial Price: ₹{service.price}
              </p>
              <div className="mt-2">
                <button
                  onClick={() => openDialog(service)} // Trigger the booking or login dialog
                  className="border-2 border-green-600 text-black px-4 py-2 rounded-md transition-all duration-300 hover:bg-green-600 hover:text-white"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isDialogOpen && selectedService && (
        <BookingForm
          isOpen={openDialog}
          serviceName="Appliance Repair"
          service={selectedService}
          onClose={closeDialog}
        />
      )}
      {isLoginDialogOpen && (
        <Login closeDialog={closeLoginDialog} /> // Show login dialog
      )}
    </div>
  );
};

export default Details;
