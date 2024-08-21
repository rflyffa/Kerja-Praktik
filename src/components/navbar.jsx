import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../assets/logo.png'; // Path to your logo
import { HomeIcon, UserCircleIcon } from '@heroicons/react/24/solid';

const Navbar = ({ onSignIn, onHomeClick, onLogout, isAuthenticated, userRole }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false); // State for profile menu
  const [scrolling, setScrolling] = useState(false); // State for scroll detection

  const location = useLocation();
  const isMainPage = location.pathname === '/';
  const isFormPage = location.pathname === '/form'; // Check if on Form page
  const isDashboardPage = location.pathname === '/dashboard'; // Check if on Dashboard page
  const isSuratOptionsPage = location.pathname === '/surat-tugas-options'; // Check if on SuratOptions page
  const isCreateSuratPage = location.pathname === '/createsurat'; // Check if on CreateSurat page
  const isHistoryPage = location.pathname === '/history'; // Check if on CreateSurat page

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
  const homeLink = (isFormPage || isSuratOptionsPage || isCreateSuratPage || isHistoryPage) ? '/dashboard' : (isDashboardPage ? '/dashboard' : '/');

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolling ? 'bg-custom-red bg-opacity-70 shadow-lg' : 'bg-custom-red'} text-white p-4`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img
            src={Logo}
            alt="Logo"
            className="h-12 w-12 md:h-16 md:w-16 object-cover"
          />
          <h1 className="text-xl md:text-2xl font-bold">KPU KOTA CIMAHI</h1>
        </div>
        <nav className="hidden md:flex items-center space-x-4">
          {!isMainPage && ( // Hide Home on the main page
            <Link
              to={homeLink} // Navigate to the dynamic home link
              className="relative group"
              onClick={onHomeClick}
            >
              <div className="flex items-center justify-center p-3 bg-indigo-600 rounded-full transition-transform transform hover:scale-105 hover:bg-indigo-700 shadow-md">
                <HomeIcon className="h-6 w-6 text-white" />
              </div>
              <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-10 bg-black text-white text-xs rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Home
              </span>
            </Link>
          )}
          {(isDashboardPage || isSuratOptionsPage || isCreateSuratPage) && isAuthenticated && ( // Show Profile button on Dashboard, SuratOptions, and CreateSurat pages
            <div className="relative">
              <button
                onClick={toggleProfileMenu}
                className="relative group"
              >
                <div className="flex items-center justify-center p-3 bg-indigo-600 rounded-full transition-transform transform hover:scale-105 hover:bg-indigo-700 shadow-md">
                  <UserCircleIcon className="h-6 w-6 text-white" />
                </div>
                <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-10 bg-black text-white text-xs rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Profile
                </span>
              </button>
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-lg shadow-lg border border-gray-200">
                  <div className="flex items-center px-4 py-3 border-b border-gray-200">
                    <UserCircleIcon className="h-8 w-8 text-gray-500 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">Logged in as:</p>
                      <p className="text-sm font-semibold text-gray-900">{userRole}</p>
                    </div>
                  </div>
                  <button
                    onClick={onLogout}
                    className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-b-lg transition duration-150 ease-in-out"
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
                <div className="flex items-center justify-center p-3 bg-indigo-600 rounded-full transition-transform transform hover:scale-105 hover:bg-indigo-700 shadow-md">
                  <HomeIcon className="h-6 w-6 text-white" />
                </div>
                <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-10 bg-black text-white text-xs rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Home
                </span>
              </Link>
            )}
            {(isDashboardPage || isSuratOptionsPage || isCreateSuratPage) && isAuthenticated && ( // Show Profile button on Dashboard, SuratOptions, and CreateSurat pages
              <>
                <button
                  onClick={toggleProfileMenu}
                  className="relative group"
                >
                  <div className="flex items-center justify-center p-3 bg-indigo-600 rounded-full transition-transform transform hover:scale-105 hover:bg-indigo-700 shadow-md">
                    <UserCircleIcon className="h-6 w-6 text-white" />
                  </div>
                  <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-10 bg-black text-white text-xs rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Profile
                  </span>
                </button>
                {isProfileMenuOpen && (
                  <div className="flex flex-col space-y-2 p-4 bg-white rounded-lg shadow-lg border border-gray-200">
                    <div className="flex items-center px-4 py-3 border-b border-gray-200">
                      <UserCircleIcon className="h-8 w-8 text-gray-500 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">Logged in as:</p>
                        <p className="text-sm font-semibold text-gray-900">{userRole}</p>
                      </div>
                    </div>
                    <button
                      onClick={onLogout}
                      className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-b-lg transition duration-150 ease-in-out"
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
