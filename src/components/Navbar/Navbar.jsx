
import React, { useState, useEffect } from "react";
import axios from "axios";
import { SiAmazongames } from "react-icons/si";
import { Link } from "react-router-dom";

import "./Navbar.scss";

const Navbar = ({ showSidebar }) => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  
  const apiKey = process.env.SERVER;
  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token){
      fetchUserData(token);
    } else {
      alert("You first need to Log in...");
      window.location.href = "https://www.spinz4bets.co.za/login";
    }
  }, []);
  
  const fetchUserData = (token) => {
    setLoading(true);
    axios
      .get(`${apiKey}/balance`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        const balance = response.data;
        if (balance !== undefined) {
          setUserData(balance);
        }
      })
      .catch((error) => {
        
      })
      .finally(() => {
        setLoading(false);
      });
  };
  
  const getCurrencySymbol = () => {
    const country = userData.country;
    const symbol = country === 'ZA' ? 'R' : '$';
    localStorage.setItem("country", country);
    return symbol;
  };

  return (
    <header>
      
      
      <ul className="games_filter">
        <li>
          <div className="balance">
          <h6>Spinz4bets</h6>
            {loading ? "Loading..." : `${getCurrencySymbol()}${userData.balance}`}
          </div>
        </li>
      </ul>

      <Link className="link" to="/profile">
        <SiAmazongames className="icon" />
        <span>Games</span>
      </Link>
    </header>
  );
};

export default Navbar;
