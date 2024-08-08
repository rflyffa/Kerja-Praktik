import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../assets/logo.png'; // Path to your logo
import { HomeIcon, UserCircleIcon } from '@heroicons/react/24/solid';

const Navbar = ({ onSignIn, onHomeClick, onLogout, isAuthenticated }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false); // State for profile menu
  const [scrolling, setScrolling] = useState(false); // State for scroll detection

  const location = useLocation();
  const isMainPage = location.pathname === '/';
  const isFormPage = location.pathname === '/form'; // Check if on Form page
  const isDashboardPage = location.pathname === '/dashboard'; // Check if on Dashboard page

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) { // Adjust this value based on when you want to trigger the transparency
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  // Determine the "Home" link destination
  const homeLink = isFormPage ? '/dashboard' : (isDashboardPage ? '/dashboard' : '/');

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolling ? 'bg-custom-red bg-opacity-75 shadow-md' : 'bg-custom-red'} text-white p-4`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img
            src={Logo}
            alt="Logo"
            className="h-16 w-15 object-cover"
          />
          <h1 className="text-2xl font-bold">KPU KOTA CIMAHI</h1>
        </div>
        <nav className="hidden md:flex items-center space-x-4">
          {!isMainPage && ( // Hide Home on the main page
            <Link
              to={homeLink} // Navigate to the dynamic home link
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
          {isDashboardPage && isAuthenticated && ( // Show Profile button only on Dashboard page
            <div className="relative">
              <button
                onClick={toggleProfileMenu}
                className="relative group"
              >
                <div className="flex items-center justify-center p-3 bg-gray-800 rounded-full transition-transform transform hover:scale-110 hover:bg-gray-700 shadow-lg">
                  <UserCircleIcon className="h-6 w-6 text-white" />
                </div>
                <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-10 bg-black text-white text-xs rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Profile
                </span>
              </button>
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-lg shadow-lg">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={onLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
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
                to={homeLink} // Navigate to the dynamic home link
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
            {isDashboardPage && isAuthenticated && ( // Show Profile button only on Dashboard page
              <>
                <button
                  onClick={toggleProfileMenu}
                  className="relative group"
                >
                  <div className="flex items-center justify-center p-3 bg-gray-800 rounded-full transition-transform transform hover:scale-110 hover:bg-gray-700 shadow-lg">
                    <UserCircleIcon className="h-6 w-6 text-white" />
                  </div>
                  <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-10 bg-black text-white text-xs rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Profile
                  </span>
                </button>
                {isProfileMenuOpen && (
                  <div className="flex flex-col space-y-2 p-4">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={onLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
