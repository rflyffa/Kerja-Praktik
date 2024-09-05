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
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/navbar';
import Main from './components/pages/main';
import Footer from './components/footer';
import Login from './components/pages/login';
import Dashboard from './components/pages/dashboard';
import Suratoptions from './components/pages/suratoptions';
import Createsuratketua from './components/pages/createsuratketua';
import Createsuratsekre from './components/pages/createsuratsekre';
import Historysuratketua from './components/pages/historysuratketua';
import Historysuratsekre from './components/pages/historysuratsekre';
import Createsuratvisum from './components/pages/createsuratvisum';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // Load authentication status and user role from localStorage
    const storedAuthStatus = localStorage.getItem('isAuthenticated') === 'true';
    const storedUserRole = localStorage.getItem('userRole') || '';

    setIsAuthenticated(storedAuthStatus);
    setUserRole(storedUserRole);
  }, []);

  const handleSignIn = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userRole', role);

    toast.success('Login berhasil!', {
        position: 'top-center',
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header
          onSignIn={handleSignIn}
          onLogout={handleLogout}
          isAuthenticated={isAuthenticated}
          userRole={userRole}
        />
        <ToastContainer />
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
              isAuthenticated ? <Suratoptions userRole={userRole} /> : <Navigate to="/login" />
           }
          />
          <Route
            path="/createsuratketua"
            element={
              isAuthenticated ? <Createsuratketua /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/createsuratsekre"
            element={
              isAuthenticated ? <Createsuratsekre /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/historysuratketua"
            element={
              isAuthenticated ? <Historysuratketua /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/historysuratsekre"
            element={
              isAuthenticated ? <Historysuratsekre /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/createsuratvisum"
            element={
              isAuthenticated ? <Createsuratvisum /> : <Navigate to="/login" />
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
