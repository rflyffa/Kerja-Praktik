import React, { useState } from 'react';
import Header from './components/navbar';
import Main from './components/main';
import Footer from './components/footer';
import Login from './components/login';

function App() {
  const [showLogin, setShowLogin] = useState(false);

  const handleSignInClick = () => {
    setShowLogin(true);
  };

  const handleHomeClick = () => {
    setShowLogin(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onSignIn={handleSignInClick} onHomeClick={handleHomeClick} />
      {showLogin ? <Login /> : <Main />}
      <Footer />
    </div>
  );
}

export default App;
