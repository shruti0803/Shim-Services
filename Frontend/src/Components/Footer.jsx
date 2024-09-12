import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between">
        <div className="mb-6 md:mb-0 md:w-1/3">
          <h2 className="text-xl font-semibold mb-4">About Us</h2>
          <p>
            We are a leading company in providing innovative solutions. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        <div className="mb-6 md:mb-0 md:w-1/3">
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-400">Home</a></li>
            <li><a href="#" className="hover:text-gray-400">About Us</a></li>
            <li><a href="#" className="hover:text-gray-400">Services</a></li>
            <li><a href="#" className="hover:text-gray-400">Contact Us</a></li>
          </ul>
        </div>

        <div className="md:w-1/3">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <p>123 Street Name, City, Country</p>
          <p>Email: <a href="mailto:info@example.com" className="hover:text-gray-400">info@example.com</a></p>
          <p>Phone: <a href="tel:+1234567890" className="hover:text-gray-400">+123 456 7890</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
