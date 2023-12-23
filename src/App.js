import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Logo from "./components/Logo/Logo";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import Reset from "./Pages/Reset/Reset";
import Deposit from "./Pages/Deposit/Deposit";
import Chatbot from "./Pages/chatbot/Chatbot";
import Wallet from "./Pages/wallet/Wallet";
import Forex from "./Pages/Forex/Forex";
// import Choice from "./components/choose";
import Games from "./Pages/Games/games";
import Withdraw from "./Pages/Withdrawal/Withdrawal";
import { AuthProvider } from "./components/AuthContext";

function App() {
  const [active, setActive] = useState("");

  const showSidebar = () => {
    setActive("active");
  };

  const closeSidebar = () => {
    setActive("");
  };

  return (
    <AuthProvider>
      <Router>
        <Logo />
        <Routes>
          <Route path="login" element={<Login />} />
        </Routes>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />

            <Route path="signup" element={<Signup />} />
            <Route
              path="dashboard"
              element={
                <Home
                  showSidebar={showSidebar}
                  closeSidebar={closeSidebar}
                  active={active}
                />
              }
            />
            <Route
              path="profile"
              element={
                <Profile
                  showSidebar={showSidebar}
                  closeSidebar={closeSidebar}
                  active={active}
                />
              }
            />
            <Route
              path="reset"
              element={
                <Reset
                  showSidebar={showSidebar}
                  closeSidebar={closeSidebar}
                  active={active}
                />
              }
            />
            <Route
              path="deposit"
              element={
                <Deposit
                  showSidebar={showSidebar}
                  closeSidebar={closeSidebar}
                  active={active}
                />
              }
            />
            <Route
              path="wallets"
              element={
                <Wallet
                  showSidebar={showSidebar}
                  closeSidebar={closeSidebar}
                  active={active}
                />
              }
            />

            <Route
              path="forex"
              element={
                <Forex
                  showSidebar={showSidebar}
                  closeSidebar={closeSidebar}
                  active={active}
                />
              }
            />

            <Route
              path="chat"
              element={
                <Chatbot
                  showSidebar={showSidebar}
                  closeSidebar={closeSidebar}
                  active={active}
                />
              }
            />

            {/* <Route
              path="choose"
              element={
                <Choice
                  showSidebar={showSidebar}
                  closeSidebar={closeSidebar}
                  active={active}
                />
              }
            /> */}

            <Route
              path="games"
              element={
                <Games
                  showSidebar={showSidebar}
                  closeSidebar={closeSidebar}
                  active={active}
                />
              }
            />
            <Route
              path="withdraw"
              element={
                <Withdraw
                  showSidebar={showSidebar}
                  closeSidebar={closeSidebar}
                  active={active}
                />
              }
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
