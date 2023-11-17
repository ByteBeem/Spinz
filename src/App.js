import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Logo from './components/Logo'; 
import Home from './components/WordSearchScreen'; 
import Profile from './components/Profile'; 
import Reset from './components/Reset'; 
import Deposit from './components/Deposit'; 
import Games from './components/games'; 
import Withdraw from './components/Withdrawal'; 
import { AuthProvider } from './components/AuthContext';

function App() {
  return (
    <AuthProvider>
    <Router>
      <Logo /> 
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/games" element={<Games />} />
        <Route path="/withdraw" element={<Withdraw />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
