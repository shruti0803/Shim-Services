import React, { useState } from 'react';
import BookingForm from './BookingForm';  // Import the BookingForm component

const Details = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 1,
      imgSrc: 'https://media.istockphoto.com/id/1353114711/photo/close-up-image-of-unrecognisable-person-doing-a-maintenance-service-on-a-household-filtration.jpg?s=612x612&w=0&k=20&c=NIMYCik-K0SUHDoI3FVD_9x9qcsBGyXf0kkfzHBbg-g=',
      title: 'Water Purifier Repair Service',
      description: ['Full water purifier servicing', 'Filter replacement and cleaning']
    },
    {
      id: 2,
      imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThf6ou9ZEt19JPPZtaTeI2bcjfaHRMczbFEbVEjPem8Qwkos-0Pe9RFjRePotO5_uCvJk&usqp=CAU',
      title: 'Power Saver AC Service',
      description: ['Advanced jet-technology service', 'Deep jet cleaning of outdoor units']
    },
    {
      id: 3,
      imgSrc: 'https://media.istockphoto.com/id/1410733729/photo/handyman-fixing-a-fridge-at-a-house.jpg?s=612x612&w=0&k=20&c=38J7yR303totw1TQl7CKiJaLNv7-Vor4AWGhw96Ekxw=',
      title: 'Refrigerator Repair Service',
      description: ['Comprehensive refrigerator service', 'Repair and part replacement']
    },
    {
      id: 4,
      imgSrc: 'https://media.istockphoto.com/id/2140183630/photo/repairman-using-a-screwdriver-disassembles-a-washing-machine-for-repair.jpg?s=612x612&w=0&k=20&c=vpLsKVsKm8LEUIBknDNzyrB8jQQHVL2Ib8oG72ymazM=',
      title: 'Washing Machine Repair',
      description: ['Expert washing machine repair', 'Full diagnostic and cleaning']
    },
    {
      id: 5,
      imgSrc: 'https://media.istockphoto.com/id/1347513910/photo/microwave-control.jpg?s=612x612&w=0&k=20&c=kTHeSYMCHxPSHTqoy2U_RjqnA01tvaQvqymofctrITI=',
      title: 'Microwave Repair Service',
      description: ['Full microwave repair service', 'Part replacement and safety check']
    },
    {
      id: 6,
      imgSrc: 'https://media.istockphoto.com/id/1403026048/photo/master-repairs-tv-set-connector-with-screwdriver-at-table.jpg?s=612x612&w=0&k=20&c=H5fj3hAarGgQ7coAwGtjixUaQ8RzrN4lSfU_uq05o28=',
      title: 'Television Repair Service',
      description: ['Screen and part repair', 'Full system diagnostic']
    },
    {
      id: 7,
      imgSrc: 'https://media.istockphoto.com/id/1410734240/photo/electrician-installing-an-oven-at-a-house.jpg?s=612x612&w=0&k=20&c=o9AL96Rg__M4QPnunpKh2ECo3dnGQr8oBRuTgIrJVG0=',
      title: 'Oven Repair Service',
      description: ['Oven service and cleaning', 'Heating element replacement']
    },
    {
      id: 8,
      imgSrc: 'https://media.istockphoto.com/id/542214568/photo/he-knows-those-pipes-like-the-back-of-his-hands.jpg?s=612x612&w=0&k=20&c=O62eQCe5qKBpiffhcn53lUdNSmCA-PtNDhgbugtjN8k=',
      title: 'Geyser Repair Service',
      description: ['Expert geyser repair', 'Thermostat and element check']
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
