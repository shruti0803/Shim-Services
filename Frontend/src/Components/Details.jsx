import React, { useState } from 'react';

const Details = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 1,
      imgSrc: 'https://5.imimg.com/data5/CX/LD/MY-34021272/duct-ac-service-500x500.jpg',
      title: 'Power Saver AC Service',
      description: [
        'Advanced jet-technology service',
        'Deep jet cleaning of outdoor units',
      ],
    },
    // Add other services as needed
  ];

  const handleAddClick = (service) => {
    setSelectedService(service);
    document.getElementById('booking_modal').showModal();
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
                className="h-28 w-28 rounded-lg"
                alt="service-img"
              />
            </div>
            <div className="pl-2 text-left">
              <p className="text-green-600">30-DAY WARRANTY</p>
              <h5 className="font-bold">{service.title}</h5>
              <ul className="list-disc list-inside">
                {service.description.map((desc, index) => (
                  <li key={index}>{desc}</li>
                ))}</ul>
              <div className="mt-2">
                <button
                  className="border-2 border-green-600 text-black px-4 py-2 rounded-md transition-all duration-300 hover:bg-green-600 hover:text-white"
                  onClick={() => handleAddClick(service)}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Booking Form */}
      <dialog id="booking_modal" className="modal">
        <div className="modal-box relative w-full max-w-lg bg-white backdrop-blur-lg bg-opacity-70 shadow-lg rounded-xl">
          {/* Full screen background image with improved visibility */}
          <div
            className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage: `url('')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(16px)',
            }}
          ></div>

          <form method="dialog" className="space-y-4 relative z-10">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            <h3 className="font-bold text-lg text-gray-800">Booking Form</h3>

            <div>
              <label className="block text-sm font-bold mb-1 text-gray-700">Customer Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="input input-bordered w-full bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1 text-gray-700">Location</label>
              <input
                type="text"
                placeholder="Enter your location"
                className="input input-bordered w-full bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1 text-gray-700">City</label>
              <input
                type="text"
                placeholder="Enter your city"
                className="input input-bordered w-full bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1 text-gray-700">Address</label>
              <textarea
                placeholder="Enter your address"
                className="textarea textarea-bordered w-full bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1 text-gray-700">Pin Code</label>
              <input
                type="text"
                placeholder="Enter your pin code"
                className="input input-bordered w-full bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1 text-gray-700">Phone Number</label>
              <input
                type="text"
                placeholder="Enter your phone number"
                className="input input-bordered w-full bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1 text-gray-700">House No.</label>
              <input
                type="text"
                placeholder="Enter your house number"
                className="input input-bordered w-full bg-gray-100"
              />
            </div>

            <div className="modal-action">
              <button
                className="btn bg-green-600 text-white w-full hover:bg-green-700"
                type="submit"
              >
                Proceed

    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
      {services.map((service) => (
        <div
          key={service.id}
          className=" flex flex-col items-center justify-between border border-black rounded-lg p-4 transition-transform duration-300 hover:scale-105 mt-2"
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
            <div className="mt-2">
              <button className="border-2 border-green-600 text-black px-4 py-2 rounded-md transition-all duration-300 hover:bg-green-600 hover:text-white">
                Book Now

              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Details;
