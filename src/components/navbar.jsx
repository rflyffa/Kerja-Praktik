import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../assets/logo.png'; // Path to your logo
import { HomeIcon } from '@heroicons/react/24/solid';

const Navbar = ({ onSignIn, onHomeClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isMainPage = location.pathname === '/';
  const isLoginPage = location.pathname === '/login';

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
        <nav className="hidden md:flex items-center space-x-4">
          {!isMainPage && ( // Hide Home on the main page
            <Link
              to="/"
              className="relative group"
              onClick={onHomeClick}
            >
              <div className="flex items-center justify-center p-3 bg-gray-800 rounded-full transition-transform transform hover:scale-110 hover:bg-gray-700 shadow-lg">
                <HomeIcon className="h-6 w-6 text-white" />
              </div>
              <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-10 bg-black text-white text-xs rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Home
              </span>
            </Link>
          )}
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
            {!isMainPage && (
              <Link
                to="/"
                className="relative group"
                onClick={onHomeClick}
              >
                <div className="flex items-center justify-center p-3 bg-gray-800 rounded-full transition-transform transform hover:scale-110 hover:bg-gray-700 shadow-lg">
                  <HomeIcon className="h-6 w-6 text-white" />
                </div>
                <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-10 bg-black text-white text-xs rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Home
                </span>
              </Link>
            )}
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
