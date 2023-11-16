import React, { useState, useEffect } from 'react';
import logo from '../assets/new.png'; 
import './styles/Logo.css'; 

function Logo() {
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const logoTimer = setTimeout(() => {
      setShowLogo(false);
    }, 3000); 

    return () => clearTimeout(logoTimer);
  }, []);

  return (
    <div className={`logo-container ${showLogo ? 'show' : 'hide'}`}>
      <img src={logo} className="logo" alt="Logo" />
    </div>
  );
}

export default Logo;
