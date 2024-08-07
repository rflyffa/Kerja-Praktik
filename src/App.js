/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/navbar';
import Main from './components/pages/main';
import Footer from './components/footer';
import Login from './components/pages/login';
import Dashboard from './components/pages/dashboard';
import Form from './components/form';

function App() {
  const [showLogin, setShowLogin] = useState(false);

  const handleSignInClick = () => {
    setShowLogin(true);
  };

  const handleHomeClick = () => {
    setShowLogin(false);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header onSignIn={handleSignInClick} onHomeClick={handleHomeClick} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/form" element={<Form />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
