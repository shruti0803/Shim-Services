import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
const BecomeServiceProviderForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '', // Changed from location to city
    address: '',
    serviceCategory: '',
    subCategories: [],  // Store selected subcategories here
    experience: '',
    certifications: '',
    languages: '',
    pricingType: 'hourly',  // Pricing type: hourly or per work
    hourlyRate: '',
    perWorkRate: '',
    paymentOptions: '',
    governmentID: '',
    termsAccepted: false,
  });
  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'serviceCategory') {
      // Handle category change to populate subcategories
      setFormData({
        ...formData,
        [name]: value,
        subCategories: [], // Clear previous selections
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };
  const handleSelectChange = (selectedOptions) => {
    setFormData({
      ...formData,
      languages: selectedOptions.map(option => option.value),
    });
  };
  const handleSubCategoryChange = (e) => {
    const { value, checked } = e.target;
    setFormData({
      ...formData,
      subCategories: checked
        ? [...formData.subCategories, value]
        : formData.subCategories.filter((item) => item !== value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, send data to backend
    console.log('Form data submitted:', formData);
  };

  // Predefined subcategories for "Beauty Services"
  const beautySubCategories = [
    'Hair Styling',
    'Bridal Makeup',
    'Facial Treatment',
    'Manicure/Pedicure',
    'Eyebrow Threading',
    'Body Waxing',
    'Skin Care Treatment',
    'Eyelash Extensions',
  ];

  // Predefined subcategories for "Appliance Repair"
  const applianceRepairSubCategories = [
    'Appliance Installation',
    'Appliance Servicing',
    'Appliance Gas Refill',
    'Appliance Compressor Repair',
    'Appliance Filter Replacement',
    'Duct Cleaning',
    'Thermostat Replacement',
    'Evaporator Coil Cleaning',
  ];

  const plumberSubCategories = [
    'Faucet Repair',
    'Leak Detection',
    'Pipe Repair', 
    'Septic Tank Cleaning',
    'Toilet Repair',
    'Water Heater Installation',
  ];

  const electricalSubCategories = [
    'Ceiling Fan Installation',
    'Electrical Safety Check Inspection',
    'Fuse Box Replacement',
    'Generator Installation',
    'Light Fixture Installation',
    'Outlet Replacement',
    'Wiring Installation',
  ];

  // Major Indian cities for dropdown
  const cities = [
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Hyderabad',
    'Ahmedabad',
    'Chennai',
    'Kolkata',
    'Surat',
    'Pune',
    'Jaipur',
    'Lucknow',
    'Kanpur',
    'Nagpur',
    'Indore',
    'Thane',
    'Bhopal',
    'Visakhapatnam',
    'Patna',
    'Vadodara',
    'Ghaziabad',
    'Ludhiana',
  ];
  const languageOptions = [
    { value: 'English', label: 'English' },
    { value: 'Hindi', label: 'Hindi' },
    { value: 'Gujrati', label: 'Gujrati' },
    { value: 'Marathi', label: 'Marathi' },
    { value: 'Bengali', label: 'Bengali' },
    // Add more language options as needed
  ];
  const customStyles = {
    multiValue: (base) => ({
      ...base,
      borderRadius: '20px',
      backgroundColor: '#f0f0f0',
      margin: '2px',
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: '#333',
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: '#e60000',
      ':hover': {
        backgroundColor: '#e60000',
        color: 'white',
      },
    }),
    container: (base) => ({
      ...base,
      marginTop: '0.5rem',
    }),
    menu: (base) => ({
      ...base,
      borderRadius: '8px',
      boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.1)',
    }),
  };
  
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-serif font-bold mb-6 text-center">Become a Service Provider</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          {/* Service Provider Information */}
          <div>
            <label className="block font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium">City</label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Service Category</label>
            <select
              name="serviceCategory"
              value={formData.serviceCategory}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Select Category</option>
              <option value="Plumber">Plumber</option>
              <option value="Electrician">Electrician</option>
              <option value="Carpenter">Carpenter</option>
              <option value="Beauty Services">Beauty Services</option>
              <option value="Appliance Repair">Appliance Repair</option>
            </select>
          </div>

          {/* Conditional Subcategories */}
          {formData.serviceCategory === 'Electrician' && (
            <div>
              <label className="block font-medium">Select Services</label>
              <div className="space-y-2">
                {electricalSubCategories.map((subCategory) => (
                  <label key={subCategory} className="flex items-center">
                    <input
                      type="checkbox"
                      value={subCategory}
                      checked={formData.subCategories.includes(subCategory)}
                      onChange={handleSubCategoryChange}
                      className="mr-2"
                    />
                    {subCategory}
                  </label>
                ))}
              </div>
            </div>
          )}
          {formData.serviceCategory === 'Beauty Services' && (
            <div>
              <label className="block font-medium">Select Services</label>
              <div className="space-y-2">
                {beautySubCategories.map((subCategory) => (
                  <label key={subCategory} className="flex items-center">
                    <input
                      type="checkbox"
                      value={subCategory}
                      checked={formData.subCategories.includes(subCategory)}
                      onChange={handleSubCategoryChange}
                      className="mr-2"
                    />
                    {subCategory}
                  </label>
                ))}
              </div>
            </div>
          )}
          {formData.serviceCategory === 'Plumber' && (
            <div>
              <label className="block font-medium">Select Services</label>
              <div className="space-y-2">
                {plumberSubCategories.map((subCategory) => (
                  <label key={subCategory} className="flex items-center">
                    <input
                      type="checkbox"
                      value={subCategory}
                      checked={formData.subCategories.includes(subCategory)}
                      onChange={handleSubCategoryChange}
                      className="mr-2"
                    />
                    {subCategory}
                  </label>
                ))}
              </div>
            </div>
          )}
          {formData.serviceCategory === 'Appliance Repair' && (
            <div>
              <label className="block font-medium">Select Services</label>
              <div className="space-y-2">
                {applianceRepairSubCategories.map((subCategory) => (
                  <label key={subCategory} className="flex items-center">
                    <input
                      type="checkbox"
                      value={subCategory}
                      checked={formData.subCategories.includes(subCategory)}
                      onChange={handleSubCategoryChange}
                      className="mr-2"
                    />
                    {subCategory}
                  </label>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="block font-medium">Experience (Years)</label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Government ID</label>
            <input
              type="text"
              name="governmentID"
              value={formData.governmentID}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Certifications (if any)</label>
            <input
              type="text"
              name="certifications"
              value={formData.certifications}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>

                   {/* Languages Spoken */}
                   <div>
            <label className="block font-medium">Languages Spoken</label>
            <Select
              isMulti
              name="languages"
              options={languageOptions}
              styles={customStyles}
              value={languageOptions.filter(option => formData.languages.includes(option.value))}
              onChange={handleSelectChange}
              className="mt-1 block w-full"
            />
          </div>

          {/* Government ID */}
          <div>
            <label className="block font-medium">Government ID</label>
            <input
              type="text"
              name="governmentID"
              value={formData.governmentID}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Availability */}
          <div>
            <label className="block font-medium">Availability</label>
            <div className="grid grid-cols-2 gap-2">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                <div key={day}>
                  <label className="block font-medium">{day}</label>
                  <select
                    name={day.toLowerCase()}
                    value={formData[day.toLowerCase()]}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    required
                  >
                    <option value="Available">Available</option>
                    <option value="Not Available">Not Available</option>
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Working Hours */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Start Hour</label>
              <input
                type="time"
                name="startHour"
                value={formData.startHour}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block font-medium">End Hour</label>
              <input
                type="time"
                name="endHour"
                value={formData.endHour}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BecomeServiceProviderForm;

