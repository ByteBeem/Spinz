import "./Navbar.scss";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../components/AuthContext";
import { IoNotifications } from "react-icons/io5";
import { IoIosPaper } from "react-icons/io";

const Navbar = ({ showSidebar }) => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const { setToken } = useAuth();

  const balance = userData.balance;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
      fetchUserData(storedToken);
    }
  }, [setToken]);

 const fetchUserData = (token) => {
  setLoading(true);
  axios
    .get("https://changeable-pinnate-soursop.glitch.me/getUserData", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      setUserData(response.data);
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
      alert("Go login now!");
      window.location.href = "https://www.shopient.co.za/login";
    })
    .finally(() => {
      setLoading(false);
    });
};


  return (
    <header>
      {/* <div className="menu_btn" onClick={() => showSidebar()}>
        &#9776;
      </div> */}
      <ul className="games_filter">
        <li>
          <div className="balance">
            {loading ? "Loading..." : `R${balance}`}
          </div>
        </li>
      </ul>

      <ul className="right">
        <div className="notification">
          <IoNotifications className="icon" />
          <div className="count"></div>
        </div>
        <Link className="profile" to="/profile">
          <img src="" alt="" />
        </Link>
        <div className="notification">
          <IoIosPaper className="icon" />
          
        </div>
      </ul>
    </header>
  );
};

export default Navbar;
