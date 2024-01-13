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
          <div className="count">5</div>
        </div>
        <Link className="profile" to="/profile">
          <img src="" alt="" />
        </Link>
        
      </ul>
    </header>
  );
};

export default Navbar;
