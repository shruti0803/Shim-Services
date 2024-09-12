import React, { useState } from 'react';

const BecomeServiceProviderForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    phone: '',
    location: '',
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

  return (
    
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-serif font-bold mb-6 text-center">Become a Service Provider</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          {/* Service Provider Information */}
          <div>
            <label className="block font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
              placeholder="Create a unique username"
              pattern="[A-Za-z0-9_]{3,15}"  // Example criteria: 3-15 alphanumeric characters or underscores
              title="Username should be 3-15 characters long, and can include letters, numbers, and underscores."
            />
          </div>

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
            <label className="block font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Address */}
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

          {/* Service Information */}
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
            <label className="block font-medium">Certifications (Optional)</label>
            <input
              type="text"
              name="certifications"
              value={formData.certifications}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>

         

        


          <div>
            <label className="block font-medium">Languages Spoken (Optional)</label>
            <input
              type="text"
              name="languages"
              value={formData.languages}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Pricing Option */}
          <div>
            <label className="block font-medium">Pricing Option</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="pricingType"
                  value="hourly"
                  checked={formData.pricingType === 'hourly'}
                  onChange={handleChange}
                  className="mr-2"
                />
                Hourly Rate
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="pricingType"
                  value="perWork"
                  checked={formData.pricingType === 'perWork'}
                  onChange={handleChange}
                  className="mr-2"
                />
                Per Work Rate
              </label>
            </div>
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

          <div className="flex items-center">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className="mr-2"
              required
            />
            <label className="text-sm">I accept the terms and conditions</label>
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
