import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">RajStudio</h3>
            <p className="text-sm">Your perfect urban retreat</p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="text-sm">
              <li><Link to="/" className="hover:text-blue-300">Home</Link></li>
              <li><Link to="/about" className="hover:text-blue-300">About Us</Link></li>
              <li><Link to="/amenities" className="hover:text-blue-300">Amenities</Link></li>
              <li><Link to="/booking" className="hover:text-blue-300">Booking</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Contact</h4>
            <p className="text-sm">Near Raghavendra Circle, Opp to Q Complex, Main Road, Mantralyam, Andhra Pradesh</p>
            <p className="text-sm">Phone: +91 9900468261</p>
            <p className="text-sm">Email: info@urbanlodge.com</p>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>&copy; 2024 Raj Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;