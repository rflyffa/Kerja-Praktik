/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable linebreak-style */
/* eslint-disable object-curly-newline */
/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/navbar';
import Main from './components/pages/main';
import Footer from './components/footer';
import Login from './components/pages/login';
import Dashboard from './components/pages/dashboard';
import Suratoptions from './components/pages/suratoptions';
import Createsuratketua from './components/pages/createsuratketua';
import History from './components/pages/history';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(''); // Add state for user role

  const handleSignIn = (role) => {
    setIsAuthenticated(true);
    setUserRole(role); // Set the user role after sign in
    toast.success('Login berhasil!', {
        position: 'top-center', // Mengatur posisi toast ke bawah tengah
        autoClose: 1200, // Durasi toast muncul dalam milidetik (opsional)
        hideProgressBar: false, // Menampilkan atau menyembunyikan progress bar (opsional)
        closeOnClick: true, // Menutup toast ketika di klik (opsional)
        pauseOnHover: true, // Pause toast ketika di hover (opsional)
        draggable: true, // Membuat toast bisa di drag (opsional)
    });
};

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(''); // Clear the user role on logout
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header
          onSignIn={handleSignIn}
          onLogout={handleLogout}
          isAuthenticated={isAuthenticated}
          userRole={userRole} // Pass the user role to the Navbar
        />
        <ToastContainer /> {/* Add ToastContainer here */}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={handleSignIn} />
            }
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? <Dashboard userRole={userRole} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/surat-tugas-options"
            element={
              isAuthenticated ? <Suratoptions /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/createsuratketua"
            element={
              isAuthenticated ? <Createsuratketua /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/history"
            element={
              isAuthenticated ? <History /> : <Navigate to="/login" />
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;