import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { HomeIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { toast } from 'react-toastify';  // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css';  // Import toastify CSS

const Navbar = ({ onSignIn, onHomeClick, onLogout, isAuthenticated, userRole }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  const location = useLocation();
  const isMainPage = location.pathname === '/';
  const isFormPage = location.pathname === '/form';
  const isDashboardPage = location.pathname === '/dashboard';
  const isSuratOptionsPage = location.pathname === '/surat-tugas-options';
  const isCreateSuratPage = location.pathname === '/createsuratketua';
  const isCreateSura2tPage = location.pathname === '/createsuratsekre';
  const isHistoryPage = location.pathname === '/historysuratketua';
  const isHistory2Page = location.pathname === '/historysuratsekre';
  const isCreatesuratvisumPage = location.pathname === '/createsuratvisum';
  const isHistoryvisumPage = location.pathname === '/historysuratvisum';

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isProfileMenuOpen) setIsProfileMenuOpen(false); // Close profile menu when toggling side menu
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  // Reset profile menu when authenticated state changes (e.g. login, logout)
  useEffect(() => {
    setIsProfileMenuOpen(false); // Close profile menu after login or logout
  }, [isAuthenticated]);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();  // Execute the onLogout function
      toast.success('Logout berhasil!', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const homeLink = (isFormPage || isSuratOptionsPage || isCreateSuratPage || isHistoryPage ||isCreateSura2tPage || isHistory2Page || isCreatesuratvisumPage|| isHistoryvisumPage)
    ? '/dashboard'
    : (isDashboardPage ? '/dashboard' : '/');

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolling ? 'bg-custom-red bg-opacity-70 shadow-lg' : 'bg-custom-red'} text-white p-4`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2 md:space-x-4">
          <img
            src={Logo}
            alt="Logo"
            className="h-10 w-10 md:h-16 md:w-16 object-cover"
          />
          <h1 className="text-lg md:text-xl font-bold">KPU KOTA CIMAHI</h1>
        </div>
        <nav className="hidden md:flex items-center space-x-4">
          {!isMainPage && (
            <Link
              to={homeLink}
              className="relative group"
              onClick={() => {
                if (onHomeClick) onHomeClick();
              }}
            >
              <div className="flex items-center justify-center p-3 bg-gradient-to-r from-black via-gray-800 to-black rounded-full transition-transform transform hover:scale-105 shadow-md">
                <HomeIcon className="h-6 w-6 text-white" />
              </div>
              <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-10 bg-black text-white text-xs rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Home
              </span>
            </Link>
          )}
          {(isDashboardPage || isSuratOptionsPage || isCreateSuratPage || isHistoryPage || isCreateSura2tPage || isHistory2Page || isCreatesuratvisumPage|| isHistoryvisumPage) && isAuthenticated && (
            <div className="relative">
              <button
                onClick={toggleProfileMenu} // Open profile menu on click
                className="relative group"
              >
                <div className="flex items-center justify-center p-3 bg-gradient-to-r from-black via-gray-800 to-black rounded-full transition-transform transform hover:scale-105 shadow-md">
                  <UserCircleIcon className="h-6 w-6 text-white" />
                </div>
                <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-10 bg-black text-white text-xs rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Profile
                </span>
              </button>
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-lg shadow-lg border border-gray-200 z-40">
                  <div className="flex items-center px-4 py-3 border-b border-gray-200 bg-white">
                    <UserCircleIcon className="h-8 w-8 text-gray-500 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">Logged in as:</p>
                      <p className="text-sm font-semibold text-gray-900">{userRole}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}  // Call handleLogout function here
                    className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-b-lg transition duration-150 ease-in-out bg-white"
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
      <div className={`fixed top-0 right-0 w-64 h-full bg-custom-red text-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} z-30 md:hidden`}>
        <div className="flex justify-end p-4">
          <button onClick={toggleMenu} className="text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col space-y-2 p-4">
          {!isMainPage && (
            <Link
              to={homeLink}
              className="relative group"
              onClick={() => {
                toggleMenu(); // Close menu on link click
                if (onHomeClick) onHomeClick(); // Trigger onHomeClick
              }}
            >
              <div className="flex items-center justify-center p-3 bg-gradient-to-r from-black via-gray-800 to-black rounded-full transition-transform transform hover:scale-105 shadow-md">
                <HomeIcon className="h-6 w-6 text-white" />
              </div>
              <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-10 bg-black text-white text-xs rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Home
              </span>
            </Link>
          )}
          {(isDashboardPage || isSuratOptionsPage || isCreateSuratPage || isHistoryPage) && isAuthenticated && (
            <div className="relative">
              <button
                onClick={toggleProfileMenu} // Open profile menu on click
                className="relative group w-full"
              >
                <div className="flex items-center justify-center p-3 bg-gradient-to-r from-black via-gray-800 to-black rounded-full transition-transform transform hover:scale-105 shadow-md">
                  <UserCircleIcon className="h-6 w-6 text-white" />
                </div>
                <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-10 bg-black text-white text-xs rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Profile
                </span>
              </button>
              {isProfileMenuOpen && (
                <div className="absolute bottom-0 top-20 left-0 w-full bg-white text-gray-900 rounded-lg shadow-lg border border-gray-200 z-40 mt-2">
                  <div className="flex items-center px-4 py-3 border-b border-gray-200 bg-white">
                    <UserCircleIcon className="h-8 w-8 text-gray-500 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">Logged in as:</p>
                      <p className="text-sm font-semibold text-gray-900">{userRole}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}  // Call handleLogout function here
                    className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-b-lg transition duration-150 ease-in-out bg-white"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;