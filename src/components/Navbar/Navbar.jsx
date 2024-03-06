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
    fetchUserData();
  }, []);
  
  const fetchUserData = () => {
    setLoading(true);
    axios
      .get("https://capable-faint-scallop.glitch.me/balance", {
        credentials: 'include',
      })
      .then((response) => {
        const balance = response.data;
        if (balance !== undefined) {
          setUserData(balance);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        alert("You are not Logged in...")
        window.location.href = "https://spinz-three.vercel.app/login";
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
