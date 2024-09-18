import React, { useState } from 'react';
import BookingForm from './BookingForm';  // Import the BookingForm component

const Details = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 1,
      imgSrc: 'https://media.istockphoto.com/id/1353114711/photo/close-up-image-of-unrecognisable-person-doing-a-maintenance-service-on-a-household-filtration.jpg?s=612x612&w=0&k=20&c=NIMYCik-K0SUHDoI3FVD_9x9qcsBGyXf0kkfzHBbg-g=',
      title: 'Appliance Compressor',
      description: [
        'Thorough servicing of appliance compressors',
        'Filter replacement and comprehensive cleaning'
      ],
      price: 120
    },
    {
      id: 2,
      imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThf6ou9ZEt19JPPZtaTeI2bcjfaHRMczbFEbVEjPem8Qwkos-0Pe9RFjRePotO5_uCvJk&usqp=CAU',
      title: 'Appliance Filter Replacement',
      description: [
        'Advanced filter replacement technology',
        'Deep cleaning of air filters'
      ],
      price: 80
    },
    {
      id: 3,
      imgSrc: 'https://tse4.mm.bing.net/th?id=OIP.A_j-Llwh9Y2sSRsuX3GoqQHaDu&pid=Api&P=0&h=180',
      title: 'Appliance Gas Refill',
      description: [
        'Complete gas refill for refrigerators',
        'Includes inspection and repair of leaks'
      ],
      price: 100
    },
    {
      id: 4,
      imgSrc: 'https://tse4.mm.bing.net/th?id=OIP.vm36fnWRKXKChjahir4uEwHaE8&pid=Api&P=0&h=180',
      title: 'Appliance Installation',
      description: [
        'Expert installation of new appliances',
        'Full diagnostic and testing post-installation'
      ],
      price: 120
    },
    {
      id: 5,
      imgSrc: 'https://media.istockphoto.com/id/1347513910/photo/microwave-control.jpg?s=612x612&w=0&k=20&c=kTHeSYMCHxPSHTqoy2U_RjqnA01tvaQvqymofctrITI=',
      title: 'Appliance Servicing',
      description: [
        'Comprehensive servicing for appliances',
        'Includes repairs and safety checks'
      ],
      price: 80
    },
    {
      id: 6,
      imgSrc: 'https://tse1.mm.bing.net/th?id=OIP.MOl_Fp2e77BMIhd8KwNw3QHaEI&pid=Api&P=0&h=180',
      title: 'Duct Cleaning',
      description: [
        'Thorough cleaning of HVAC ducts',
        'Includes inspection and removal of debris'
      ],
      price: 80
    },
    {
      id: 7,
      imgSrc: 'https://media.istockphoto.com/id/1410734240/photo/electrician-installing-an-oven-at-a-house.jpg?s=612x612&w=0&k=20&c=o9AL96Rg__M4QPnunpKh2ECo3dnGQr8oBRuTgIrJVG0=',
      title: 'Evaporator Coil Cleaning',
      description: [
        'Detailed cleaning of evaporator coils',
        'Includes inspection and maintenance of the coil'
      ],
      price: 85
    },
    {
      id: 8,
      imgSrc: 'https://media.istockphoto.com/id/542214568/photo/he-knows-those-pipes-like-the-back-of-his-hands.jpg?s=612x612&w=0&k=20&c=O62eQCe5qKBpiffhcn53lUdNSmCA-PtNDhgbugtjN8k=',
      title: 'Thermostat Replacement',
      description: [
        'Replacement of faulty thermostats',
        'Includes calibration and testing'
      ],
      price: 70
    }
  ];

  const openDialog = (service) => {
    setSelectedService(service);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedService(null);
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
              <p className='font-bold text-green-600'>Initial Price: ₹{service.price}</p>

              <p className='font-bold text-green-600'>Initial Price: ₹{service.price}</p>

              <div className="mt-2">
                <button
                  onClick={() => openDialog(service)}  // Trigger the modal
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
          service={selectedService}  // Pass selected service to the modal
          onClose={closeDialog}      // Pass closeDialog to close modal
        />
      )}
    </div>
  );
};

export default Details;
