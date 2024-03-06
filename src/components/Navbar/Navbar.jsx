import "./Navbar.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";



const Navbar = ({ showSidebar }) => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  

  const balance = userData.balance;
  const country = userData.country;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token){
      fetchUserData(token);
    
    }else {
      alert("You first need to Log in...");
      window.location.href = "https://spinz-three.vercel.app/login";
    }
   
  }, []);
  
  const fetchUserData = (token) => {
    setLoading(true);
    axios
      .get("https://capable-faint-scallop.glitch.me/balance", {
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
        console.error("Error fetching user data:", error);
        
      })
      .finally(() => {
        setLoading(false);
      });
  };
  
  const getCurrencySymbol = () => {
  const symbol = country === 'ZA' ? 'R' : '$';
  localStorage.setItem("country", country);
  return symbol;
};

  return (
    <header>
      
      <ul className="games_filter">
        <li>
          <div className="balance">
            {loading ? "Loading..." : `${getCurrencySymbol()}${balance.toString()}`}
          </div>
        </li>
      </ul>

      
    </header>
   
  );
};

export default Navbar;
