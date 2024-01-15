import "./Navbar.scss";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../components/AuthContext";
import { IoNotifications } from "react-icons/io5";
import { IoIosPaper } from "react-icons/io";

const Navbar = ({ showSidebar }) => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const balance = userData.balance;
  const country = userData.country;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if(!storedToken){
      window.location.href = "https://www.shopient.co.za/login";
    }

    if (storedToken) {
      setToken(storedToken);
      fetchUserData(storedToken);
    }
  }, [setToken]);

 const fetchUserData = (token) => {
  setLoading(true);
  axios
    .get("https://spinz-server-100d0276d968.herokuapp.com/balance", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
     const balance = response.data; 

      if (balance !== undefined) {
        setUserData( balance ); 
      }
  
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
      
      navigate("/dashboard");
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
      {/* <div className="menu_btn" onClick={() => showSidebar()}>
        &#9776;
      </div> */}
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
