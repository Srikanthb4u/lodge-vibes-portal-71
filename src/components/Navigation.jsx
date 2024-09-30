import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/amenities", label: "Amenities" },
    { to: "/booking", label: "Booking" },
    { to: "/guest-inputs", label: "Guest Inputs" },
  ];

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Logo />
        <ul className="flex flex-wrap justify-center sm:justify-start space-x-4">
          {navItems.map((item) => (
            <li key={item.to}>
              {location.pathname === item.to ? (
                <span className="text-blue-600 font-bold">{item.label}</span>
              ) : (
                <Link to={item.to} className="text-blue-600 hover:text-blue-800">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;