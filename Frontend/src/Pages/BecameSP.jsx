import React, { useState } from 'react';
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
    { value: 'Spanish', label: 'Spanish' },
    { value: 'French', label: 'French' },
    { value: 'German', label: 'German' },
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

          <div>
            <label className="block font-medium">Languages Spoken</label>
            <Select
              isMulti
              name="languages"
              options={languageOptions}
              value={languageOptions.filter(option => formData.languages.includes(option.value))}
              onChange={handleSelectChange}
              styles={customStyles}
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Select languages"
            />
          </div>

          <div>
            <label className="block font-medium">Pricing Type</label>
            <select
              name="pricingType"
              value={formData.pricingType}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            >
              <option value="hourly">Hourly</option>
              <option value="perWork">Per Work</option>
            </select>
          </div>

        

         

        

      

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className="mr-2"
                required
              />
              I accept the terms and conditions
            </label>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-green-700 text-white py-2 px-4 rounded-lg hover:bg-green-800 transition duration-200"
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
