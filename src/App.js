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
import Createsurat from './components/pages/createsurat';
import History from './components/pages/history';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(''); // Add state for user role

  const handleSignIn = (role) => {
    setIsAuthenticated(true);
    setUserRole(role); // Set the user role after sign in
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
            path="/createsurat"
            element={
              isAuthenticated ? <Createsurat /> : <Navigate to="/login" />
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