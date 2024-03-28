import React, { useState, useEffect } from "react";
import axios from "axios";
import { SiAmazongames } from "react-icons/si";
import { Link } from "react-router-dom";
import Login from "../../Pages/Login/Login";
import "./Navbar.scss";

const Navbar = ({ showSidebar }) => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const apiKey = process.env.REACT_APP_SERVER;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token){
      fetchUserData(token);
    } else {
      setLoginModalOpen(true); // Display login modal
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
        // Handle error
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
    <>
      <header>
        <ul className="games_filter">
          <li>
            <div className="balance">
              <h6>Spinz4bets</h6>
              {loading ? "Loading..." : (
                userData.balance ? `${getCurrencySymbol()}${userData.balance}` : 
                <button  className="form_btn" onClick={() => setLoginModalOpen(true)}>Login</button>
              )}
            </div>
          </li>
        </ul>

        <Link className="link" to="/profile">
          <SiAmazongames className="icon" />
          <span>Games</span>
        </Link>
      </header>

    
      {loginModalOpen && <Login isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />}
    </>
  );
};

export default Navbar;
