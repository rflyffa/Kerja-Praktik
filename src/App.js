/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/navbar';
import Main from './components/main';
import Footer from './components/footer';
import Login from './components/login';
import LetterForm from './components/letter-form';
import PrintableLetter from './components/printlatter';
import Admin from './components/admin'; // Import AdminDashboard component
import Operator from './components/operator'; // Import OperatorDashboard component

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
          <Route path="/create-letter" element={<LetterForm />} />
          <Route path="/print-letter" element={<PrintableLetter />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/operator" element={<Operator />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
