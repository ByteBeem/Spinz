import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Logo from "./components/Logo/Logo";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import Reset from "./components/Reset";
import Deposit from "./Pages/Deposit/Deposit";
import Choice from "./components/choose";
import Games from "./components/games";
import Withdraw from "./Pages/Withdrawal/Withdrawal";
import { AuthProvider } from "./components/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Logo />
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />

            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="dashboard" element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="reset" element={<Reset />} />
            <Route path="deposit" element={<Deposit />} />
            <Route path="choose" element={<Choice />} />
            <Route path="games" element={<Games />} />
            <Route path="withdraw" element={<Withdraw />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
