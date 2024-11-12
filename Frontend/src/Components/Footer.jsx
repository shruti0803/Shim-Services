import React from 'react';
import img from '../assets/BWlogo.jpg'
const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between">
        <div className="mb-6 md:mb-0 md:w-1/3">
          <h2 className="text-xl font-bold mb-4">
            <img className='w-36 h-15' src={img}/>
          </h2>
          <p>
          We deliver precise, high-quality shim solutions that optimize performance and efficiency, tailored to fit your exact needs.
          </p>
        </div>

        <div className="mb-6 md:mb-0 md:w-1/3">
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-yellow-400">Home</a></li>
            <li><a href="#" className="hover:text-yellow-400">About Us</a></li>
            <li><a href="#" className="hover:text-yellow-400">Services</a></li>
            <li><a href="#" className="hover:text-yellow-400">Contact Us</a></li>
          </ul>
        </div>

        <div className="md:w-1/3">
          <h2 className="text-xl font-bold mb-4">Contact Information</h2>
          <p>Maulana Azad National Institute of Technology, Bhopal, Madhya Pradesh,India</p>
          
          <p className='pt-2 font-semibold'>Email: <a href="mailto:shimservices5@gmail.com" className="hover:text-yellow-400 ">shimservices5@gmail.com</a></p>
          <p className='pt-2 font-semibold'>Phone: <a href="tel:+1234567890" className="hover:text-yellow-400">+123 456 7890</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


