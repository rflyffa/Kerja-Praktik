import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';

const Navbar = ({ onSignIn, onHomeClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-custom-red text-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="bg-white rounded-full p-2 shadow-lg">
            <img
              src={Logo}
              alt="Logo"
              className="h-10 w-10 object-cover rounded-full"
            />
          </div>
          <h1 className="text-2xl font-bold">KPU KOTA CIMAHI</h1>
        </div>
        <nav className="hidden md:flex space-x-4">
          <Link
            to="/"
            className="text-white hover:text-gray-300 transition duration-300"
            onClick={onHomeClick}
          >
            Home
          </Link>
          <Link
            to="/create-letter"
            className="text-white hover:text-gray-300 transition duration-300"
          >
            Create Letter
          </Link>
          <Link
            to="/print-letter"
            className="text-white hover:text-gray-300 transition duration-300"
          >
            Printable Letter
          </Link>
          <a href="#about" className="text-white hover:text-gray-300 transition duration-300">About</a>
          <a href="#contact" className="text-white hover:text-gray-300 transition duration-300">Contact</a>
        </nav>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col space-y-2 p-4">
            <Link
              to="/"
              className="text-white hover:text-gray-300 transition duration-300"
              onClick={onHomeClick}
            >
              Home
            </Link>
            <Link
              to="/create-letter"
              className="text-white hover:text-gray-300 transition duration-300"
            >
              Create Letter
            </Link>
            <Link
              to="/print-letter"
              className="text-white hover:text-gray-300 transition duration-300"
            >
              Printable Letter
            </Link>
            <button
              className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-300"
              onClick={onSignIn}
            >
              Sign In
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
