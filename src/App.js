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
import Register from './components/register'; // Import Register component
import LetterForm from './components/letter-form'; // Import LetterForm component
import PrintableLetter from './components/printlatter'; // Import PrintableLetter component

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
          <Route path="/register" element={<Register />} /> {/* Add route for Register */}
          <Route path="/create-letter" element={<LetterForm />} /> {/* Add route for LetterForm */}
          <Route path="/print-letter" element={<PrintableLetter />} /> {/* Add route for PrintableLetter */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
