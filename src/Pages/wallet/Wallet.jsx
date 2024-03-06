import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../components/AuthContext";
import { FiLoader } from "react-icons/fi";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import "./wallet.scss";
import "../../App.scss";

const Wallet = ({ showSidebar, active, closeSidebar }) => {
  const { setToken } = useAuth();
  const [userData, setUserData] = useState({ balance: 0 });
  const [loading, setLoading] = useState(false);
  const country = userData.country;
   const balance = userData.balance;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
      fetchUserData(storedToken);
    }else{
      alert("You need to Login...")
      window.location.href = "https://spinz-three.vercel.app/login";
    }
  }, [setToken]);

   


  const fetchUserData = (token) => {
    setLoading(true);
    axios
      .get("https://capable-faint-scallop.glitch.me/balance", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        
        const balance = response.data; 

      if (balance !== undefined) {
        setUserData( balance );
      }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const getCurrencySymbol = () => {
    
    return country === 'ZA' ? 'R' : 'R';
  };

  return (
    <div className="wallet">
      <Sidebar active={active} closeSidebar={closeSidebar} />

      <div className="wallet_container">
        <Navbar showSidebar={showSidebar} />

        <div className="account_info">
          {loading && (
            <div className="overlay">
              <FiLoader className="loading-spinner" />
            </div>
          )}

          <span>Account Balance:</span>
            <div className="balance">{`${getCurrencySymbol()}${balance.toString()}`}</div>

          <Link className="form_btn" to="/withdraw">
            Withdraw
          </Link>
          <Link className="form_btn" to="/deposit">
            Deposit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
